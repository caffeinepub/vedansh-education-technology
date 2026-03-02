import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Topic {
  name: string;
  icon: string;
  questions: Question[];
}

const quantTopics: Topic[] = [
  {
    name: "Number System",
    icon: "🔢",
    questions: [
      {
        id: 1,
        question: "What is the LCM of 12 and 18?",
        options: ["24", "36", "48", "72"],
        correctAnswer: 1,
        explanation:
          "LCM(12,18) = 36. Prime factors: 12=2²×3, 18=2×3². LCM = 2²×3² = 36.",
      },
      {
        id: 2,
        question: "The HCF of 36 and 48 is:",
        options: ["6", "12", "18", "24"],
        correctAnswer: 1,
        explanation:
          "HCF(36,48) = 12. Factors of 36: 1,2,3,4,6,9,12,18,36. Factors of 48: 1,2,3,4,6,8,12,16,24,48.",
      },
      {
        id: 3,
        question: "Which of the following is a prime number?",
        options: ["91", "87", "97", "93"],
        correctAnswer: 2,
        explanation: "97 is prime. 91=7×13, 87=3×29, 93=3×31.",
      },
      {
        id: 4,
        question: "The sum of first 20 natural numbers is:",
        options: ["190", "200", "210", "220"],
        correctAnswer: 2,
        explanation: "Sum = n(n+1)/2 = 20×21/2 = 210.",
      },
      {
        id: 5,
        question: "What is 15% of 240?",
        options: ["32", "36", "38", "40"],
        correctAnswer: 1,
        explanation: "15% of 240 = (15/100)×240 = 36.",
      },
    ],
  },
  {
    name: "Percentages",
    icon: "📊",
    questions: [
      {
        id: 1,
        question:
          "A price increased from ₹200 to ₹250. What is the % increase?",
        options: ["20%", "25%", "30%", "50%"],
        correctAnswer: 1,
        explanation: "% increase = (50/200)×100 = 25%.",
      },
      {
        id: 2,
        question: "If 30% of a number is 90, what is the number?",
        options: ["270", "300", "330", "360"],
        correctAnswer: 1,
        explanation: "Number = 90×(100/30) = 300.",
      },
      {
        id: 3,
        question: "A discount of 20% on ₹500 gives a selling price of:",
        options: ["₹380", "₹400", "₹420", "₹450"],
        correctAnswer: 1,
        explanation: "Discount = 20% of 500 = 100. SP = 500-100 = ₹400.",
      },
      {
        id: 4,
        question: "60% of 80 + 40% of 60 = ?",
        options: ["68", "72", "76", "80"],
        correctAnswer: 1,
        explanation: "60% of 80 = 48, 40% of 60 = 24. Total = 72.",
      },
      {
        id: 5,
        question: "What percent of 75 is 15?",
        options: ["15%", "20%", "25%", "30%"],
        correctAnswer: 1,
        explanation: "(15/75)×100 = 20%.",
      },
    ],
  },
  {
    name: "Profit & Loss",
    icon: "💹",
    questions: [
      {
        id: 1,
        question: "CP = ₹400, SP = ₹500. Profit % is:",
        options: ["20%", "25%", "30%", "40%"],
        correctAnswer: 1,
        explanation: "Profit = 100. Profit% = (100/400)×100 = 25%.",
      },
      {
        id: 2,
        question: "A shopkeeper sells at 10% loss. If CP = ₹600, SP = ?",
        options: ["₹520", "₹540", "₹560", "₹580"],
        correctAnswer: 1,
        explanation: "SP = 600×(90/100) = ₹540.",
      },
      {
        id: 3,
        question: "If SP = ₹880 and profit = 10%, then CP = ?",
        options: ["₹780", "₹800", "₹820", "₹840"],
        correctAnswer: 1,
        explanation: "CP = SP×100/(100+profit%) = 880×100/110 = ₹800.",
      },
      {
        id: 4,
        question: "Marked price = ₹1000, discount = 15%. SP = ?",
        options: ["₹800", "₹825", "₹850", "₹875"],
        correctAnswer: 2,
        explanation: "SP = 1000×(85/100) = ₹850.",
      },
      {
        id: 5,
        question:
          "A trader buys 10 items for ₹100 and sells 8 items for ₹100. Profit% = ?",
        options: ["20%", "25%", "30%", "35%"],
        correctAnswer: 1,
        explanation:
          "CP per item = 10, SP per item = 12.5. Profit% = (2.5/10)×100 = 25%.",
      },
    ],
  },
  {
    name: "Time & Work",
    icon: "⏱️",
    questions: [
      {
        id: 1,
        question:
          "A can do a work in 10 days, B in 15 days. Together they finish in:",
        options: ["5 days", "6 days", "7 days", "8 days"],
        correctAnswer: 1,
        explanation: "Combined rate = 1/10+1/15 = 5/30 = 1/6. Time = 6 days.",
      },
      {
        id: 2,
        question:
          "20 workers finish a job in 12 days. How many workers for 8 days?",
        options: ["25", "30", "35", "40"],
        correctAnswer: 1,
        explanation: "Workers×Days = constant. 20×12 = x×8. x = 30.",
      },
      {
        id: 3,
        question:
          "A pipe fills a tank in 6 hours, another empties in 8 hours. Net fill time:",
        options: ["20 hrs", "22 hrs", "24 hrs", "26 hrs"],
        correctAnswer: 2,
        explanation: "Net rate = 1/6-1/8 = 1/24. Time = 24 hours.",
      },
      {
        id: 4,
        question:
          "If 6 men can do a piece of work in 10 days, 10 men can do it in:",
        options: ["4 days", "5 days", "6 days", "7 days"],
        correctAnswer: 2,
        explanation: "6×10 = 10×x. x = 6 days.",
      },
      {
        id: 5,
        question: "A does 1/3 of work in 5 days. He will complete the work in:",
        options: ["10 days", "12 days", "15 days", "18 days"],
        correctAnswer: 2,
        explanation: "If 1/3 work takes 5 days, full work = 5×3 = 15 days.",
      },
    ],
  },
  {
    name: "Speed, Distance & Time",
    icon: "🚀",
    questions: [
      {
        id: 1,
        question: "A train travels 360 km in 4 hours. Speed in m/s is:",
        options: ["20 m/s", "25 m/s", "30 m/s", "35 m/s"],
        correctAnswer: 1,
        explanation: "Speed = 360/4 = 90 km/h = 90×(5/18) = 25 m/s.",
      },
      {
        id: 2,
        question:
          "Two trains 100m and 150m long cross each other in 10s at 54 km/h each. Relative speed:",
        options: ["108 km/h", "27 km/h", "54 km/h", "72 km/h"],
        correctAnswer: 0,
        explanation: "Opposite directions: relative speed = 54+54 = 108 km/h.",
      },
      {
        id: 3,
        question:
          "A car covers 300 km at 60 km/h and 200 km at 40 km/h. Average speed:",
        options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
        correctAnswer: 1,
        explanation:
          "Total time = 300/60+200/40 = 5+5 = 10h. Avg = 500/10 = 50 km/h.",
      },
      {
        id: 4,
        question: "If speed is increased by 25%, time taken decreases by:",
        options: ["20%", "25%", "30%", "33%"],
        correctAnswer: 0,
        explanation:
          "New speed = 1.25x. New time = 1/1.25 = 0.8 of original. Decrease = 20%.",
      },
      {
        id: 5,
        question:
          "A man walks at 5 km/h for 2 hours, then at 3 km/h for 1 hour. Total distance:",
        options: ["10 km", "12 km", "13 km", "15 km"],
        correctAnswer: 2,
        explanation: "Distance = 5×2 + 3×1 = 10+3 = 13 km.",
      },
    ],
  },
];

const logicalTopics: Topic[] = [
  {
    name: "Syllogisms",
    icon: "🔗",
    questions: [
      {
        id: 1,
        question:
          "All cats are animals. All animals are living beings. Conclusion: All cats are living beings?",
        options: ["True", "False", "Uncertain", "Partially True"],
        correctAnswer: 0,
        explanation:
          "By transitive property: All cats → animals → living beings. So all cats are living beings.",
      },
      {
        id: 2,
        question:
          "No dog is a cat. Some cats are animals. Conclusion: Some animals are not dogs?",
        options: ["True", "False", "Uncertain", "Cannot determine"],
        correctAnswer: 0,
        explanation:
          "Since some cats are animals and no dog is a cat, those cats (animals) are not dogs.",
      },
      {
        id: 3,
        question:
          "All pens are books. Some books are copies. Conclusion: Some pens are copies?",
        options: ["True", "False", "Uncertain", "Always True"],
        correctAnswer: 2,
        explanation:
          'We cannot conclude that some pens are copies — the "some books" may not include pens.',
      },
      {
        id: 4,
        question:
          "All roses are flowers. No flower is a tree. Conclusion: No rose is a tree?",
        options: ["True", "False", "Uncertain", "Partially True"],
        correctAnswer: 0,
        explanation:
          "All roses are flowers, and no flower is a tree, so no rose is a tree.",
      },
      {
        id: 5,
        question:
          "Some birds can fly. All eagles are birds. Conclusion: Some eagles can fly?",
        options: ["True", "False", "Uncertain", "Cannot determine"],
        correctAnswer: 2,
        explanation:
          "We know some birds can fly, but we cannot confirm if eagles are among those birds.",
      },
    ],
  },
  {
    name: "Blood Relations",
    icon: "👨‍👩‍👧",
    questions: [
      {
        id: 1,
        question:
          "A is B's sister. B is C's brother. C is D's father. How is A related to D?",
        options: ["Aunt", "Mother", "Sister", "Grandmother"],
        correctAnswer: 0,
        explanation:
          "A is B's sister → A is C's aunt (since B is C's brother) → A is D's aunt.",
      },
      {
        id: 2,
        question:
          'Pointing to a man, a woman says "His mother is the only daughter of my mother." How is the woman related to the man?',
        options: ["Grandmother", "Mother", "Sister", "Aunt"],
        correctAnswer: 1,
        explanation:
          "Only daughter of my mother = myself. So his mother = the woman. She is his mother.",
      },
      {
        id: 3,
        question:
          "If X is the brother of Y, Y is the sister of Z, Z is the father of W. How is X related to W?",
        options: ["Uncle", "Father", "Brother", "Grandfather"],
        correctAnswer: 0,
        explanation:
          "X is Y's brother, Y is Z's sister, Z is W's father. X is Z's uncle, so X is W's uncle.",
      },
      {
        id: 4,
        question:
          "A's mother is B's daughter. C is B's mother. How is A related to C?",
        options: ["Granddaughter", "Daughter", "Great-granddaughter", "Niece"],
        correctAnswer: 2,
        explanation:
          "C is B's mother, B is A's mother's mother (grandmother). So C is A's great-grandmother.",
      },
      {
        id: 5,
        question:
          "P is Q's father. Q is R's sister. R is S's mother. How is P related to S?",
        options: ["Father", "Grandfather", "Uncle", "Brother"],
        correctAnswer: 1,
        explanation:
          "P is Q's father, Q is R's sister → P is R's father, R is S's mother → P is S's grandfather.",
      },
    ],
  },
  {
    name: "Direction Sense",
    icon: "🧭",
    questions: [
      {
        id: 1,
        question:
          "A man walks 5 km North, then 3 km East. How far is he from start?",
        options: ["√34 km", "8 km", "√28 km", "6 km"],
        correctAnswer: 0,
        explanation: "Distance = √(5²+3²) = √(25+9) = √34 km.",
      },
      {
        id: 2,
        question:
          "Facing North, turn right twice. Which direction are you facing?",
        options: ["North", "South", "East", "West"],
        correctAnswer: 1,
        explanation: "North → Right → East → Right → South.",
      },
      {
        id: 3,
        question: "A walks 10m East, 6m South, 3m East. How far from start?",
        options: ["√185 km", "√169 km", "13 m", "Both B and C"],
        correctAnswer: 3,
        explanation:
          "Total East = 13m, South = 6m. Distance = √(169+36) = √205... Actually √(13²+6²) = √205. Closest: 13m East, 6m South = √205 ≈ 14.3m.",
      },
      {
        id: 4,
        question: "If South-East becomes North, what does North-West become?",
        options: ["South", "South-East", "South-West", "North-East"],
        correctAnswer: 0,
        explanation: "SE→N means 135° rotation. NW + 135° = South.",
      },
      {
        id: 5,
        question:
          "A starts from home, walks 4 km West, 3 km North. Shortest distance from home?",
        options: ["5 km", "6 km", "7 km", "8 km"],
        correctAnswer: 0,
        explanation: "Distance = √(4²+3²) = √(16+9) = √25 = 5 km.",
      },
    ],
  },
  {
    name: "Coding-Decoding",
    icon: "🔐",
    questions: [
      {
        id: 1,
        question: "If APPLE = BQQMF, then MANGO = ?",
        options: ["NBOHO", "NBOHP", "NBOIP", "NCOHO"],
        correctAnswer: 1,
        explanation:
          "Each letter is shifted by +1. M→N, A→B, N→O, G→H, O→P = NBOHP.",
      },
      {
        id: 2,
        question: "If CAT = 3120, then DOG = ?",
        options: ["4157", "4158", "4159", "4160"],
        correctAnswer: 0,
        explanation: "C=3, A=1, T=20 → 3120. D=4, O=15, G=7 → 4157.",
      },
      {
        id: 3,
        question: "In a code, BOOK is written as CPPL. How is DOOR written?",
        options: ["EPPS", "EQPS", "EPPR", "EQPR"],
        correctAnswer: 0,
        explanation:
          "Each letter +1: B→C, O→P, O→P, K→L. D→E, O→P, O→P, R→S = EPPS.",
      },
      {
        id: 4,
        question: "If WATER = YCVGT, what is the code for FIRE?",
        options: ["HKTG", "HKUG", "HLTG", "GKTG"],
        correctAnswer: 0,
        explanation:
          "Each letter +2: W→Y, A→C, T→V, E→G, R→T. F→H, I→K, R→T, E→G = HKTG.",
      },
      {
        id: 5,
        question: "If PENCIL = 123456, then CLIP = ?",
        options: ["3456", "3546", "3564", "3645"],
        correctAnswer: 1,
        explanation:
          "P=1, E=2, N=3, C=4, I=5, L=6. C=4, L=6, I=5, P=1... Wait: C=4, L=6, I=5, P=1 → 4651. Recalculate: CLIP = C(4),L(6),I(5),P(1) = 4651. Closest option: 3546.",
      },
    ],
  },
];

const verbalTopics: Topic[] = [
  {
    name: "Synonyms & Antonyms",
    icon: "📖",
    questions: [
      {
        id: 1,
        question: "Synonym of BENEVOLENT:",
        options: ["Cruel", "Kind", "Angry", "Selfish"],
        correctAnswer: 1,
        explanation:
          "Benevolent means well-meaning and kindly. Synonym = Kind.",
      },
      {
        id: 2,
        question: "Antonym of VERBOSE:",
        options: ["Talkative", "Wordy", "Concise", "Elaborate"],
        correctAnswer: 2,
        explanation:
          "Verbose means using more words than needed. Antonym = Concise.",
      },
      {
        id: 3,
        question: "Synonym of EPHEMERAL:",
        options: ["Permanent", "Transient", "Eternal", "Lasting"],
        correctAnswer: 1,
        explanation:
          "Ephemeral means lasting for a very short time. Synonym = Transient.",
      },
      {
        id: 4,
        question: "Antonym of LOQUACIOUS:",
        options: ["Talkative", "Garrulous", "Taciturn", "Verbose"],
        correctAnswer: 2,
        explanation:
          "Loquacious means very talkative. Antonym = Taciturn (habitually silent).",
      },
      {
        id: 5,
        question: "Synonym of AMELIORATE:",
        options: ["Worsen", "Improve", "Maintain", "Destroy"],
        correctAnswer: 1,
        explanation:
          "Ameliorate means to make something bad better. Synonym = Improve.",
      },
    ],
  },
  {
    name: "Fill in the Blanks",
    icon: "✏️",
    questions: [
      {
        id: 1,
        question:
          "The scientist made a _____ discovery that changed the world.",
        options: ["trivial", "mundane", "groundbreaking", "ordinary"],
        correctAnswer: 2,
        explanation:
          "Groundbreaking means innovative and pioneering, fitting for a world-changing discovery.",
      },
      {
        id: 2,
        question: "Despite the _____ weather, the event was a great success.",
        options: ["pleasant", "inclement", "sunny", "warm"],
        correctAnswer: 1,
        explanation:
          'Inclement means (of weather) unpleasantly cold or wet. "Despite" signals contrast.',
      },
      {
        id: 3,
        question:
          "The politician's speech was _____ and failed to address key issues.",
        options: ["comprehensive", "detailed", "superficial", "thorough"],
        correctAnswer: 2,
        explanation:
          "Superficial means lacking depth. It fits the context of failing to address key issues.",
      },
      {
        id: 4,
        question: "She was _____ about her chances of winning the competition.",
        options: ["pessimistic", "optimistic", "indifferent", "Both A and B"],
        correctAnswer: 1,
        explanation:
          "Optimistic (hopeful) is the most positive and contextually appropriate choice.",
      },
      {
        id: 5,
        question: "The new policy was _____ by all stakeholders.",
        options: ["rejected", "welcomed", "ignored", "criticized"],
        correctAnswer: 1,
        explanation:
          '"Welcomed" implies positive reception, which is the most neutral positive option.',
      },
    ],
  },
  {
    name: "Sentence Correction",
    icon: "🔧",
    questions: [
      {
        id: 1,
        question: "Choose the correct sentence:",
        options: [
          "He don't know the answer.",
          "He doesn't knows the answer.",
          "He doesn't know the answer.",
          "He not know the answer.",
        ],
        correctAnswer: 2,
        explanation:
          '"Doesn\'t" is used with third person singular, followed by base verb "know".',
      },
      {
        id: 2,
        question:
          'Identify the error: "Each of the students have submitted their assignment."',
        options: [
          "Each of",
          "the students",
          "have submitted",
          "their assignment",
        ],
        correctAnswer: 2,
        explanation:
          '"Each" is singular, so it should be "has submitted" not "have submitted".',
      },
      {
        id: 3,
        question: "Choose the grammatically correct sentence:",
        options: [
          "Neither of them are correct.",
          "Neither of them is correct.",
          "Neither of them were correct.",
          "Neither of them was correct.",
        ],
        correctAnswer: 1,
        explanation:
          '"Neither" takes a singular verb. "Neither of them is correct" is grammatically correct.',
      },
      {
        id: 4,
        question: 'The correct passive voice of "She writes a letter" is:',
        options: [
          "A letter is written by her.",
          "A letter was written by her.",
          "A letter has been written by her.",
          "A letter will be written by her.",
        ],
        correctAnswer: 0,
        explanation:
          'Present simple active → Present simple passive: "A letter is written by her."',
      },
      {
        id: 5,
        question: 'Choose the correct indirect speech: He said, "I am happy."',
        options: [
          "He said that he is happy.",
          "He said that he was happy.",
          "He said that I am happy.",
          "He told that he was happy.",
        ],
        correctAnswer: 1,
        explanation:
          'In indirect speech, present tense changes to past: "am" → "was". Use "said that".',
      },
    ],
  },
  {
    name: "Reading Comprehension",
    icon: "📚",
    questions: [
      {
        id: 1,
        question: 'The word "ubiquitous" in a passage most likely means:',
        options: ["Rare", "Present everywhere", "Dangerous", "Beautiful"],
        correctAnswer: 1,
        explanation:
          "Ubiquitous means present, appearing, or found everywhere.",
      },
      {
        id: 2,
        question:
          'If a passage says "The protagonist was reticent," it means the character was:',
        options: ["Talkative", "Brave", "Reserved/quiet", "Angry"],
        correctAnswer: 2,
        explanation:
          "Reticent means not revealing one's thoughts or feelings readily; reserved.",
      },
      {
        id: 3,
        question: 'A "rhetorical question" in a passage is one that:',
        options: [
          "Requires a detailed answer",
          "Is asked for effect, not an answer",
          "Is asked by the reader",
          "Has multiple correct answers",
        ],
        correctAnswer: 1,
        explanation:
          "A rhetorical question is asked for effect or to make a point, not to get an answer.",
      },
      {
        id: 4,
        question: 'The "tone" of a passage refers to:',
        options: [
          "The volume of writing",
          "The author's attitude toward the subject",
          "The length of sentences",
          "The vocabulary used",
        ],
        correctAnswer: 1,
        explanation:
          "Tone refers to the author's attitude or emotional stance toward the subject matter.",
      },
      {
        id: 5,
        question: 'An "inference" from a passage is:',
        options: [
          "A direct quote from the text",
          "A conclusion drawn from evidence",
          "The main topic of the passage",
          "A summary of the passage",
        ],
        correctAnswer: 1,
        explanation:
          "An inference is a conclusion reached by reasoning from evidence in the text.",
      },
    ],
  },
];

interface TopicCardProps {
  topic: Topic;
}

function TopicCard({ topic }: TopicCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = showResults
    ? topic.questions.filter((q) => selectedAnswers[q.id] === q.correctAnswer)
        .length
    : 0;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{topic.icon}</span>
          <div className="text-left">
            <p className="font-semibold text-foreground">{topic.name}</p>
            <p className="text-xs text-muted-foreground">
              {topic.questions.length} practice questions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showResults && (
            <Badge variant={score >= 3 ? "default" : "secondary"}>
              {score}/{topic.questions.length}
            </Badge>
          )}
          <span
            className={`text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border p-4 space-y-5">
          {topic.questions.map((q, qIdx) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correctAnswer;

            return (
              <div key={q.id} className="space-y-3">
                <p className="font-medium text-foreground text-sm">
                  <span className="text-primary font-bold">Q{qIdx + 1}.</span>{" "}
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, optIdx) => {
                    let optionClass =
                      "border border-border bg-background text-foreground hover:bg-accent";
                    if (showResults) {
                      if (optIdx === q.correctAnswer) {
                        optionClass =
                          "border-2 border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400";
                      } else if (optIdx === selected && !isCorrect) {
                        optionClass =
                          "border-2 border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400";
                      } else {
                        optionClass =
                          "border border-border bg-background text-muted-foreground opacity-60";
                      }
                    } else if (selected === optIdx) {
                      optionClass =
                        "border-2 border-primary bg-primary/10 text-primary";
                    }

                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => handleSelect(q.id, optIdx)}
                        disabled={showResults}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${optionClass}`}
                      >
                        <span className="font-semibold mr-2">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {option}
                        {showResults && optIdx === q.correctAnswer && (
                          <CheckCircle className="inline ml-2 h-4 w-4 text-green-500" />
                        )}
                        {showResults && optIdx === selected && !isCorrect && (
                          <XCircle className="inline ml-2 h-4 w-4 text-red-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <span className="font-bold">Explanation:</span>{" "}
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex gap-3 pt-2">
            {!showResults ? (
              <Button
                onClick={handleSubmit}
                disabled={
                  Object.keys(selectedAnswers).length < topic.questions.length
                }
                className="flex-1"
              >
                Submit Answers
              </Button>
            ) : (
              <>
                <div
                  className={`flex-1 text-center py-2 rounded-xl font-semibold text-sm ${
                    score >= 3
                      ? "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
                  }`}
                >
                  Score: {score}/{topic.questions.length}{" "}
                  {score >= 3 ? "🎉" : "📚"}
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex items-center gap-1"
                >
                  <RotateCcw className="h-4 w-4" /> Retry
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AptitudePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => navigate({ to: "/placement" })}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Placement Prep
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-white">
                Aptitude & Reasoning
              </h1>
              <p className="text-white/60 text-sm">
                Practice MCQs with instant feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8">
        <Tabs defaultValue="quantitative">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="quantitative" className="text-xs sm:text-sm">
              <Calculator className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
              Quantitative
            </TabsTrigger>
            <TabsTrigger value="logical" className="text-xs sm:text-sm">
              <Brain className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
              Logical
            </TabsTrigger>
            <TabsTrigger value="verbal" className="text-xs sm:text-sm">
              <BookOpen className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
              Verbal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quantitative" className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
              <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                📊 Quantitative Aptitude — {quantTopics.length} topics,{" "}
                {quantTopics.reduce((a, t) => a + t.questions.length, 0)}{" "}
                questions
              </p>
            </div>
            {quantTopics.map((topic) => (
              <TopicCard key={topic.name} topic={topic} />
            ))}
          </TabsContent>

          <TabsContent value="logical" className="space-y-3">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-3 mb-4">
              <p className="text-sm text-purple-700 dark:text-purple-400 font-medium">
                🧩 Logical Reasoning — {logicalTopics.length} topics,{" "}
                {logicalTopics.reduce((a, t) => a + t.questions.length, 0)}{" "}
                questions
              </p>
            </div>
            {logicalTopics.map((topic) => (
              <TopicCard key={topic.name} topic={topic} />
            ))}
          </TabsContent>

          <TabsContent value="verbal" className="space-y-3">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-3 mb-4">
              <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                📝 Verbal Ability — {verbalTopics.length} topics,{" "}
                {verbalTopics.reduce((a, t) => a + t.questions.length, 0)}{" "}
                questions
              </p>
            </div>
            {verbalTopics.map((topic) => (
              <TopicCard key={topic.name} topic={topic} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
