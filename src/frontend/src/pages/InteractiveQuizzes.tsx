import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  Brain,
  CheckCircle,
  Clock,
  Flame,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetLeaderboard, useSaveQuizScore } from "../hooks/useQueries";

type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

type SubjectQuiz = {
  subject: string;
  questions: QuizQuestion[];
};

const quizData: SubjectQuiz[] = [
  {
    subject: "Mathematics",
    questions: [
      {
        question: "What is the value of π (pi) to 2 decimal places?",
        options: ["3.14", "3.41", "3.12", "3.16"],
        correct: 0,
        explanation: "π ≈ 3.14159..., so to 2 decimal places it is 3.14.",
      },
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2"],
        correct: 1,
        explanation: "Using the power rule: d/dx(x²) = 2x.",
      },
      {
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
        explanation: "15% of 200 = 0.15 × 200 = 30.",
      },
      {
        question: "Solve: 2x + 5 = 15",
        options: ["x = 4", "x = 5", "x = 6", "x = 10"],
        correct: 1,
        explanation: "2x = 15 - 5 = 10, so x = 5.",
      },
      {
        question: "What is the area of a circle with radius 7?",
        options: ["44π", "49π", "14π", "7π"],
        correct: 1,
        explanation: "Area = πr² = π × 7² = 49π.",
      },
    ],
  },
  {
    subject: "Science",
    questions: [
      {
        question: "What is the chemical formula of water?",
        options: ["H₂O", "CO₂", "NaCl", "O₂"],
        correct: 0,
        explanation:
          "Water is composed of 2 hydrogen atoms and 1 oxygen atom: H₂O.",
      },
      {
        question: "What is the speed of light in vacuum?",
        options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10¹⁰ m/s", "3×10⁴ m/s"],
        correct: 0,
        explanation: "The speed of light in vacuum is approximately 3×10⁸ m/s.",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correct: 2,
        explanation:
          "Mars is called the Red Planet due to iron oxide (rust) on its surface.",
      },
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"],
        correct: 2,
        explanation: "Mitochondria produce ATP energy for the cell.",
      },
      {
        question: "What is Newton's second law of motion?",
        options: ["F = ma", "E = mc²", "v = u + at", "P = mv"],
        correct: 0,
        explanation:
          "Newton's second law: Force = mass × acceleration (F = ma).",
      },
    ],
  },
  {
    subject: "History",
    questions: [
      {
        question: "When did India gain independence?",
        options: ["1945", "1947", "1950", "1952"],
        correct: 1,
        explanation:
          "India gained independence from British rule on August 15, 1947.",
      },
      {
        question: "Who was the first Prime Minister of India?",
        options: [
          "Mahatma Gandhi",
          "Sardar Patel",
          "Jawaharlal Nehru",
          "B.R. Ambedkar",
        ],
        correct: 2,
        explanation:
          "Jawaharlal Nehru was India's first Prime Minister (1947–1964).",
      },
      {
        question: "The Battle of Plassey was fought in which year?",
        options: ["1757", "1857", "1947", "1707"],
        correct: 0,
        explanation:
          "The Battle of Plassey was fought in 1757 between the British East India Company and Nawab Siraj ud-Daulah.",
      },
      {
        question: "Who wrote the Indian National Anthem?",
        options: [
          "Bankim Chandra",
          "Rabindranath Tagore",
          "Sarojini Naidu",
          "Subhas Chandra Bose",
        ],
        correct: 1,
        explanation: "Jana Gana Mana was written by Rabindranath Tagore.",
      },
      {
        question: "The Quit India Movement was launched in which year?",
        options: ["1940", "1942", "1944", "1946"],
        correct: 1,
        explanation:
          "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942.",
      },
    ],
  },
  {
    subject: "Geography",
    questions: [
      {
        question: "What is the capital of India?",
        options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
        correct: 2,
        explanation: "New Delhi is the capital of India.",
      },
      {
        question: "Which is the longest river in India?",
        options: ["Yamuna", "Ganga", "Godavari", "Brahmaputra"],
        correct: 1,
        explanation: "The Ganga (Ganges) is the longest river in India.",
      },
      {
        question: "Mount Everest is located in which country?",
        options: ["India", "China", "Nepal", "Tibet"],
        correct: 2,
        explanation:
          "Mount Everest is located on the border of Nepal and Tibet (China), but the summit is in Nepal.",
      },
      {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3,
        explanation:
          "The Pacific Ocean is the largest and deepest ocean on Earth.",
      },
      {
        question: "How many states does India have?",
        options: ["25", "28", "29", "30"],
        correct: 1,
        explanation: "India has 28 states and 8 Union Territories.",
      },
    ],
  },
];

type QuizState = "select" | "playing" | "completed" | "review";

export default function InteractiveQuizzes() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const saveScoreMutation = useSaveQuizScore();
  const { data: leaderboard } = useGetLeaderboard();

  const [quizState, setQuizState] = useState<QuizState>("select");
  const [selectedSubject, setSelectedSubject] = useState<SubjectQuiz | null>(
    null,
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTimeUp = useCallback(() => {
    if (selectedSubject) {
      const newAnswers = [...answers, null];
      setAnswers(newAnswers);
      if (currentQuestion + 1 < selectedSubject.questions.length) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        finishQuiz(newAnswers);
      }
    }
  }, [selectedSubject, answers, currentQuestion]);

  useEffect(() => {
    if (quizState !== "playing") return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [quizState, timeLeft, handleTimeUp]);

  const finishQuiz = (finalAnswers: (number | null)[]) => {
    if (!selectedSubject) return;
    let correct = 0;
    finalAnswers.forEach((ans, idx) => {
      if (ans === selectedSubject.questions[idx].correct) correct++;
    });
    const pct = Math.round((correct / selectedSubject.questions.length) * 100);
    setScore(pct);
    setQuizState("completed");
    if (pct >= 70) setShowConfetti(true);

    if (identity) {
      saveScoreMutation.mutate({
        subject: selectedSubject.subject,
        score: BigInt(pct),
      });
    }
  };

  const startQuiz = (subject: SubjectQuiz) => {
    setSelectedSubject(subject);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(30);
    setScore(0);
    setShowConfetti(false);
    setQuizState("playing");
  };

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    setTimeout(() => {
      if (!selectedSubject) return;
      const newAnswers = [...answers, idx];
      setAnswers(newAnswers);
      if (currentQuestion + 1 < selectedSubject.questions.length) {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        finishQuiz(newAnswers);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setQuizState("select");
    setSelectedSubject(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(30);
    setScore(0);
    setShowConfetti(false);
  };

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Brain className="h-12 w-12 text-primary mx-auto" />
          <h2 className="text-2xl font-bold">Login Required</h2>
          <p className="text-muted-foreground">
            Please login to take quizzes and save your scores.
          </p>
          <Button onClick={() => navigate({ to: "/auth" })}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-start justify-center pt-10">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      <Tabs defaultValue="quiz">
        <TabsList className="w-full">
          <TabsTrigger value="quiz" className="flex-1">
            Quiz
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex-1">
            Leaderboard
          </TabsTrigger>
        </TabsList>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="mt-4 space-y-4">
          {quizState === "select" && (
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Interactive Quizzes
                </h1>
                <p className="text-muted-foreground mt-1">
                  Choose a subject to start a timed quiz
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {quizData.map((quiz) => (
                  <Card
                    key={quiz.subject}
                    className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary/50"
                    onClick={() => startQuiz(quiz)}
                  >
                    <CardContent className="pt-6 pb-4 text-center space-y-2">
                      <Brain className="h-8 w-8 text-primary mx-auto" />
                      <h3 className="font-semibold text-foreground">
                        {quiz.subject}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {quiz.questions.length} questions • 30s each
                      </p>
                      <Button size="sm" className="w-full mt-2">
                        Start Quiz
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {quizState === "playing" && selectedSubject && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{selectedSubject.subject}</Badge>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={`font-bold text-lg ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}
                  >
                    {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Progress */}
              <Progress
                value={
                  (currentQuestion / selectedSubject.questions.length) * 100
                }
              />
              <p className="text-sm text-muted-foreground text-center">
                Question {currentQuestion + 1} of{" "}
                {selectedSubject.questions.length}
              </p>

              {/* Question */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg font-medium text-foreground mb-6">
                    {selectedSubject.questions[currentQuestion].question}
                  </p>
                  <div className="space-y-3">
                    {selectedSubject.questions[currentQuestion].options.map(
                      (option, idx) => {
                        let extraClass = "";
                        if (selectedAnswer !== null) {
                          if (
                            idx ===
                            selectedSubject.questions[currentQuestion].correct
                          ) {
                            extraClass =
                              "border-success bg-success/10 text-success";
                          } else if (
                            idx === selectedAnswer &&
                            idx !==
                              selectedSubject.questions[currentQuestion].correct
                          ) {
                            extraClass =
                              "border-destructive bg-destructive/10 text-destructive";
                          }
                        }
                        return (
                          <button
                            type="button"
                            key={option}
                            onClick={() => handleAnswer(idx)}
                            disabled={selectedAnswer !== null}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all font-medium text-sm
                            ${selectedAnswer === null ? "hover:border-primary hover:bg-primary/5 border-border" : "border-border"}
                            ${extraClass}
                            disabled:cursor-not-allowed`}
                          >
                            <span className="font-bold mr-2">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            {option}
                          </button>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {quizState === "completed" && selectedSubject && (
            <div className="space-y-4 text-center">
              <Card>
                <CardContent className="pt-8 pb-6 space-y-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Trophy className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Quiz Complete!
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedSubject.subject}
                  </p>
                  <div className="text-5xl font-bold text-primary">
                    {score}%
                  </div>
                  <p className="text-muted-foreground">
                    {score >= 90
                      ? "🌟 Excellent!"
                      : score >= 70
                        ? "👍 Good job!"
                        : score >= 50
                          ? "📚 Keep practicing!"
                          : "💪 Don't give up!"}
                  </p>
                  <div className="flex gap-3 justify-center mt-4">
                    <Button onClick={resetQuiz} variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Try Another
                    </Button>
                    <Button onClick={() => setQuizState("review")}>
                      Review Answers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {quizState === "review" && selectedSubject && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  Answer Review
                </h2>
                <Button variant="outline" size="sm" onClick={resetQuiz}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  New Quiz
                </Button>
              </div>
              {selectedSubject.questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.correct;
                return (
                  <Card
                    key={q.question}
                    className={
                      isCorrect ? "border-success/30" : "border-destructive/30"
                    }
                  >
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        )}
                        <p className="font-medium text-foreground">
                          {q.question}
                        </p>
                      </div>
                      <div className="pl-7 space-y-1 text-sm">
                        <p className="text-success">
                          ✓ Correct: {q.options[q.correct]}
                        </p>
                        {!isCorrect && userAnswer !== null && (
                          <p className="text-destructive">
                            ✗ Your answer: {q.options[userAnswer]}
                          </p>
                        )}
                        {userAnswer === null && (
                          <p className="text-muted-foreground">
                            ⏱ Time expired
                          </p>
                        )}
                        <p className="text-muted-foreground italic mt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!leaderboard || leaderboard.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No entries yet. Be the first!
                </p>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, idx) => (
                    <div
                      key={entry.name}
                      className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          idx === 0
                            ? "bg-amber-100 text-amber-700"
                            : idx === 1
                              ? "bg-gray-100 text-gray-700"
                              : idx === 2
                                ? "bg-orange-100 text-orange-700"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span className="flex-1 font-medium text-foreground">
                        {entry.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-amber-500" />
                        <span className="font-semibold text-amber-600">
                          {Number(entry.streakCount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
