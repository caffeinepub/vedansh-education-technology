import { useState, useEffect, useRef } from 'react';
import { Trophy, Clock, RotateCcw, CheckCircle, XCircle, Medal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetCallerUserProfile, useGetLeaderboard, useSaveQuizScore } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizData: Record<string, Question[]> = {
  Mathematics: [
    { q: 'What is the value of √144?', options: ['10', '11', '12', '13'], correct: 2, explanation: '12 × 12 = 144, so √144 = 12' },
    { q: 'Solve: 2x + 5 = 15. Find x.', options: ['3', '4', '5', '6'], correct: 2, explanation: '2x = 15 - 5 = 10, x = 5' },
    { q: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correct: 1, explanation: '15/100 × 200 = 30' },
    { q: 'Area of a circle with radius 7 cm (π = 22/7)?', options: ['144 cm²', '154 cm²', '164 cm²', '174 cm²'], correct: 1, explanation: 'A = πr² = 22/7 × 7 × 7 = 154 cm²' },
    { q: 'What is the LCM of 12 and 18?', options: ['24', '36', '48', '72'], correct: 1, explanation: 'LCM(12, 18) = 36' },
  ],
  Science: [
    { q: 'What is the chemical formula of water?', options: ['H₂O₂', 'H₂O', 'HO₂', 'H₃O'], correct: 1, explanation: 'Water is H₂O — 2 hydrogen atoms and 1 oxygen atom.' },
    { q: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correct: 2, explanation: 'Mercury is the closest planet to the Sun.' },
    { q: 'What is the unit of electric current?', options: ['Volt', 'Watt', 'Ampere', 'Ohm'], correct: 2, explanation: 'Electric current is measured in Amperes (A).' },
    { q: 'Photosynthesis occurs in which part of the plant?', options: ['Root', 'Stem', 'Leaf', 'Flower'], correct: 2, explanation: 'Photosynthesis occurs in leaves, specifically in chloroplasts.' },
    { q: "What is Newton's first law of motion?", options: ['F=ma', 'Law of Inertia', 'Action-Reaction', 'Gravity Law'], correct: 1, explanation: "Newton's first law is the Law of Inertia." },
  ],
  English: [
    { q: 'Choose the correct spelling:', options: ['Accomodate', 'Accommodate', 'Acommodate', 'Acomodate'], correct: 1, explanation: 'The correct spelling is "Accommodate" with double c and double m.' },
    { q: 'What is the synonym of "Eloquent"?', options: ['Silent', 'Fluent', 'Rude', 'Shy'], correct: 1, explanation: 'Eloquent means fluent and persuasive in speaking.' },
    { q: 'Identify the noun: "The dog runs fast."', options: ['runs', 'fast', 'dog', 'The'], correct: 2, explanation: '"Dog" is the noun — it names a thing.' },
    { q: 'Which tense: "She has completed her homework."', options: ['Simple Past', 'Present Perfect', 'Past Perfect', 'Future'], correct: 1, explanation: '"Has completed" is Present Perfect tense.' },
    { q: 'Antonym of "Benevolent"?', options: ['Kind', 'Generous', 'Malevolent', 'Helpful'], correct: 2, explanation: 'Malevolent means wishing evil — opposite of benevolent.' },
  ],
  'General Knowledge': [
    { q: 'Who is the founder of Vedansh Education & Technology?', options: ['Rahul Sharma', 'Mrityunjay Pandey', 'Amit Kumar', 'Priya Singh'], correct: 1, explanation: 'Mrityunjay Pandey, BTech CSE, is the Founder & CEO of Vedansh Education & Technology.' },
    { q: 'What does NEP stand for?', options: ['National Education Plan', 'National Education Policy', 'New Education Program', 'National Exam Policy'], correct: 1, explanation: 'NEP stands for National Education Policy, introduced in 2020.' },
    { q: 'Capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correct: 2, explanation: 'New Delhi is the capital of India.' },
    { q: 'Who wrote "Discovery of India"?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Subhas Chandra Bose', 'B.R. Ambedkar'], correct: 1, explanation: 'Jawaharlal Nehru wrote "Discovery of India".' },
    { q: 'Which is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, explanation: 'The Pacific Ocean is the largest ocean on Earth.' },
  ],
  'Computer Science': [
    { q: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Core Processing Unit'], correct: 0, explanation: 'CPU stands for Central Processing Unit.' },
    { q: 'Which language is used for web styling?', options: ['HTML', 'JavaScript', 'CSS', 'Python'], correct: 2, explanation: 'CSS (Cascading Style Sheets) is used for styling web pages.' },
    { q: 'What is the binary of decimal 10?', options: ['1000', '1010', '1100', '1001'], correct: 1, explanation: '10 in binary is 1010 (8+2=10).' },
    { q: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Array', 'Tree'], correct: 1, explanation: 'Stack uses Last In First Out (LIFO) principle.' },
    { q: 'What does RAM stand for?', options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Memory', 'Random Array Memory'], correct: 0, explanation: 'RAM stands for Random Access Memory.' },
  ],
  'Social Studies': [
    { q: 'Which river is known as the "Ganga of South India"?', options: ['Krishna', 'Godavari', 'Kaveri', 'Mahanadi'], correct: 2, explanation: 'Kaveri is known as the "Ganga of South India".' },
    { q: 'When did India get independence?', options: ['1945', '1947', '1950', '1952'], correct: 1, explanation: 'India got independence on 15 August 1947.' },
    { q: 'Who wrote the Indian Constitution?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B.R. Ambedkar', 'Sardar Patel'], correct: 2, explanation: 'Dr. B.R. Ambedkar was the chief architect of the Indian Constitution.' },
    { q: 'Which is the smallest state of India by area?', options: ['Goa', 'Sikkim', 'Tripura', 'Manipur'], correct: 0, explanation: 'Goa is the smallest state of India by area.' },
    { q: 'The Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correct: 2, explanation: 'The Tropic of Cancer passes through 8 Indian states.' },
  ],
};

const subjects = Object.keys(quizData);
type QuizState = 'select' | 'playing' | 'finished' | 'review';

export default function InteractiveQuizzes() {
  const [subject, setSubject] = useState('Mathematics');
  const [quizState, setQuizState] = useState<QuizState>('select');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { data: userProfile } = useGetCallerUserProfile();
  const { data: leaderboard, isLoading: lbLoading } = useGetLeaderboard();
  const saveScore = useSaveQuizScore();

  const questions = quizData[subject] || [];

  // Timer effect
  useEffect(() => {
    if (quizState !== 'playing') return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(30);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [quizState, currentQ]);

  // Auto-advance when time runs out
  useEffect(() => {
    if (quizState === 'playing' && timeLeft === 0 && selected === null) {
      advanceQuestion(null);
    }
  }, [timeLeft]);

  const advanceQuestion = (ans: number | null) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const newAnswers = [...answers, ans];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ + 1 >= questions.length) {
      const score = newAnswers.filter((a, i) => a === questions[i].correct).length;
      const pct = Math.round((score / questions.length) * 100);
      setQuizState('finished');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      const phone = userProfile?.phoneNumber || localStorage.getItem('vedansh_phone') || '';
      if (phone) {
        saveScore.mutate({ phoneNumber: phone, subject, score: pct });
      }
      toast.success(`Quiz complete! Score: ${score}/${questions.length} (${pct}%)`);
    } else {
      setCurrentQ(prev => prev + 1);
    }
  };

  const handleSelect = (idx: number) => {
    if (selected !== null || quizState !== 'playing') return;
    setSelected(idx);
    setTimeout(() => advanceQuestion(idx), 700);
  };

  const resetQuiz = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setQuizState('select');
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(30);
  };

  const startQuiz = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setQuizState('playing');
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const timerColor = timeLeft > 15 ? 'text-vedansh-success' : timeLeft > 7 ? 'text-vedansh-gold' : 'text-red-500';

  return (
    <div className="min-h-screen bg-background">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                backgroundColor: ['#FF6B00', '#FFD700', '#00C851', '#0A1628', '#FF4444', '#4444FF'][Math.floor(Math.random() * 6)],
                animation: `fall ${1 + Math.random() * 2}s linear ${Math.random() * 2}s forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">Interactive Quizzes</h1>
              <p className="text-white/60 text-sm">Test your knowledge • Win badges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8">
        <Tabs defaultValue="quiz">
          <TabsList className="w-full grid grid-cols-2 mb-5">
            <TabsTrigger value="quiz">🎯 Take Quiz</TabsTrigger>
            <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
          </TabsList>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-4">
            {/* Select State */}
            {quizState === 'select' && (
              <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div className="text-center">
                  <div className="text-5xl mb-3">🎯</div>
                  <h3 className="font-baloo font-bold text-xl text-foreground mb-1">Choose Your Quiz</h3>
                  <p className="text-foreground/60 text-sm">5 questions • 30 seconds each</p>
                </div>
                <div>
                  <label className="text-sm text-foreground/70 font-medium block mb-2">Select Subject</label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Questions', value: '5' },
                    { label: 'Time/Q', value: '30s' },
                    { label: 'Points', value: '20 each' },
                  ].map(item => (
                    <div key={item.label} className="bg-muted/50 rounded-xl p-3">
                      <div className="font-bold text-foreground text-lg">{item.value}</div>
                      <div className="text-foreground/50 text-xs">{item.label}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors"
                >
                  Start Quiz! 🚀
                </button>
              </div>
            )}

            {/* Playing State */}
            {quizState === 'playing' && questions[currentQ] && (
              <div className="space-y-4">
                {/* Progress & Timer */}
                <div className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-foreground/60 text-sm font-medium">
                      Question {currentQ + 1} of {questions.length}
                    </span>
                    <div className={`flex items-center gap-1.5 font-bold text-lg ${timerColor}`}>
                      <Clock className="w-4 h-4" />
                      {timeLeft}s
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-vedansh-orange h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="text-xs text-vedansh-orange font-semibold mb-2 uppercase tracking-wide">{subject}</div>
                  <h3 className="font-semibold text-foreground text-lg leading-snug mb-5">
                    {questions[currentQ].q}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentQ].options.map((opt, i) => {
                      let cls = 'border-border bg-muted/30 hover:bg-muted/60 hover:border-vedansh-orange/50 cursor-pointer';
                      if (selected !== null) {
                        if (i === questions[currentQ].correct) cls = 'border-vedansh-success bg-vedansh-success/10 cursor-default';
                        else if (i === selected && selected !== questions[currentQ].correct) cls = 'border-red-500 bg-red-500/10 cursor-default';
                        else cls = 'border-border bg-muted/20 opacity-50 cursor-default';
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelect(i)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${cls}`}
                        >
                          <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-foreground text-sm font-medium">{opt}</span>
                          {selected !== null && i === questions[currentQ].correct && (
                            <CheckCircle className="w-5 h-5 text-vedansh-success ml-auto shrink-0" />
                          )}
                          {selected !== null && i === selected && selected !== questions[currentQ].correct && (
                            <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Finished State */}
            {quizState === 'finished' && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                  <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : '📚'}</div>
                  <h3 className="font-baloo font-bold text-2xl text-foreground mb-1">
                    {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : 'Keep Practicing!'}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-5">{subject} Quiz Complete</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="font-baloo font-bold text-2xl text-vedansh-orange">{score}/{questions.length}</div>
                      <div className="text-foreground/50 text-xs">Correct</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="font-baloo font-bold text-2xl text-vedansh-gold">{pct}%</div>
                      <div className="text-foreground/50 text-xs">Score</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="font-baloo font-bold text-2xl text-vedansh-success">{score * 20}</div>
                      <div className="text-foreground/50 text-xs">Points</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setQuizState('review')}
                      className="flex-1 border border-border text-foreground font-semibold py-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      Review Answers
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="flex-1 bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Review State */}
            {quizState === 'review' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Answer Review</h3>
                  <button
                    onClick={resetQuiz}
                    className="text-vedansh-orange text-sm font-medium flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> New Quiz
                  </button>
                </div>
                {questions.map((q, i) => {
                  const userAns = answers[i];
                  const isCorrect = userAns === q.correct;
                  return (
                    <div key={i} className={`bg-card border rounded-2xl p-4 ${isCorrect ? 'border-vedansh-success/30' : 'border-red-500/30'}`}>
                      <div className="flex items-start gap-2 mb-3">
                        {isCorrect
                          ? <CheckCircle className="w-5 h-5 text-vedansh-success shrink-0 mt-0.5" />
                          : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        }
                        <p className="text-foreground text-sm font-medium">{q.q}</p>
                      </div>
                      <div className="space-y-1.5 mb-3">
                        {q.options.map((opt, j) => (
                          <div
                            key={j}
                            className={`text-xs px-3 py-1.5 rounded-lg ${
                              j === q.correct ? 'bg-vedansh-success/10 text-vedansh-success font-semibold' :
                              j === userAns && !isCorrect ? 'bg-red-500/10 text-red-500 line-through' :
                              'text-foreground/50'
                            }`}
                          >
                            {String.fromCharCode(65 + j)}. {opt}
                            {j === q.correct && ' ✓'}
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-500/10 rounded-lg px-3 py-2">
                        <p className="text-blue-600 dark:text-blue-400 text-xs"><span className="font-semibold">Explanation:</span> {q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-vedansh-gold" /> Top Students
              </h3>
              {lbLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-14 w-full rounded-xl" />
                  ))}
                </div>
              ) : leaderboard && leaderboard.length > 0 ? (
                <div className="space-y-3">
                  {leaderboard.slice(0, 10).map((student, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${i < 3 ? 'bg-vedansh-gold/10 border border-vedansh-gold/20' : 'bg-muted/50'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                        i === 0 ? 'bg-vedansh-gold text-vedansh-navy' :
                        i === 1 ? 'bg-gray-300 text-gray-700' :
                        i === 2 ? 'bg-orange-400 text-white' :
                        'bg-muted text-foreground/60'
                      }`}>
                        {i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-foreground text-sm truncate">{student.name}</div>
                        <div className="text-foreground/50 text-xs">{student.quizScores.length} quizzes taken</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-vedansh-orange text-sm">{Number(student.streakCount)} 🔥</div>
                        <div className="text-foreground/50 text-xs">streak</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-foreground/50">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No leaderboard data yet.</p>
                  <p className="text-xs mt-1">Complete quizzes to appear here!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
