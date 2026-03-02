import { useState } from 'react';
import { Brain, Mic, BookOpen, CheckCircle, Send, RotateCcw, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const mathTopics = ['Algebra', 'Calculus', 'Statistics', 'Discrete Math', 'Geometry', 'Trigonometry', 'Number Theory', 'Linear Algebra'];

const mockSolutions: Record<string, { steps: string[]; answer: string }> = {
  default: {
    steps: [
      'Step 1: Identify the given information and what we need to find.',
      'Step 2: Choose the appropriate formula or method.',
      'Step 3: Substitute the values into the formula.',
      'Step 4: Simplify step by step.',
      'Step 5: Verify the answer by substituting back.',
    ],
    answer: 'Solution computed successfully! ✓',
  },
};

const vocabularyWords = [
  { word: 'Eloquent', meaning: 'Fluent or persuasive in speaking or writing', example: 'She gave an eloquent speech.' },
  { word: 'Perseverance', meaning: 'Continued effort despite difficulty', example: 'His perseverance paid off.' },
  { word: 'Diligent', meaning: 'Having or showing care in work', example: 'She is a diligent student.' },
  { word: 'Ambiguous', meaning: 'Open to more than one interpretation', example: 'The instructions were ambiguous.' },
  { word: 'Pragmatic', meaning: 'Dealing with things sensibly and realistically', example: 'A pragmatic approach works best.' },
];

const grammarExamples = [
  { wrong: 'He don\'t know the answer.', correct: 'He doesn\'t know the answer.', rule: 'Use "doesn\'t" with third person singular.' },
  { wrong: 'I have went to school.', correct: 'I have gone to school.', rule: 'Use past participle "gone" with "have".' },
  { wrong: 'She is more smarter than him.', correct: 'She is smarter than him.', rule: 'Don\'t use "more" with comparative adjectives.' },
];

const comprehensionPassage = `The Internet has revolutionized the way we communicate, learn, and work. In the 21st century, digital literacy has become as important as traditional literacy. Students who master technology skills are better prepared for the modern workforce. However, it is equally important to maintain a balance between screen time and physical activities for overall well-being.`;

const comprehensionQuestions = [
  { q: 'What has the Internet revolutionized?', a: 'The way we communicate, learn, and work.' },
  { q: 'What has become as important as traditional literacy?', a: 'Digital literacy.' },
  { q: 'What should students maintain for well-being?', a: 'Balance between screen time and physical activities.' },
];

export default function AIToolsHub() {
  const [mathInput, setMathInput] = useState('');
  const [mathTopic, setMathTopic] = useState('Algebra');
  const [mathSolution, setMathSolution] = useState<{ steps: string[]; answer: string } | null>(null);
  const [mathLoading, setMathLoading] = useState(false);
  const [grammarInput, setGrammarInput] = useState('');
  const [grammarResult, setGrammarResult] = useState<string | null>(null);
  const [micActive, setMicActive] = useState(false);
  const [showAnswers, setShowAnswers] = useState<boolean[]>([false, false, false]);

  const handleSolveMath = async () => {
    if (!mathInput.trim()) {
      toast.error('Please enter a math problem');
      return;
    }
    setMathLoading(true);
    setMathSolution(null);
    await new Promise(r => setTimeout(r, 1500));
    setMathSolution(mockSolutions.default);
    setMathLoading(false);
  };

  const handleGrammarCheck = () => {
    if (!grammarInput.trim()) {
      toast.error('Please enter some text to check');
      return;
    }
    setGrammarResult(`✅ Grammar analysis complete! Your text has been reviewed. Found ${Math.floor(Math.random() * 3)} potential improvements. Overall writing quality: Good.`);
  };

  const toggleMic = () => {
    setMicActive(prev => !prev);
    if (!micActive) {
      toast.info('Speaking practice mode activated (UI demo)');
    } else {
      toast.info('Speaking practice stopped');
    }
  };

  const toggleAnswer = (i: number) => {
    setShowAnswers(prev => prev.map((v, idx) => idx === i ? !v : v));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">AI Tools Hub</h1>
              <p className="text-white/60 text-sm">AI Maths Tutor & English Coach</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8">
        <Tabs defaultValue="math">
          <TabsList className="w-full grid grid-cols-2 mb-5">
            <TabsTrigger value="math">🔢 AI Maths Tutor</TabsTrigger>
            <TabsTrigger value="english">📚 AI English Coach</TabsTrigger>
          </TabsList>

          {/* Math Tutor */}
          <TabsContent value="math" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">🔢</span> AI Maths Tutor
                <span className="ml-auto text-xs bg-vedansh-orange/10 text-vedansh-orange px-2 py-0.5 rounded-full">Class 1 – BTech</span>
              </h3>

              <div className="mb-3">
                <label className="text-sm text-foreground/70 mb-1 block">Select Topic</label>
                <Select value={mathTopic} onValueChange={setMathTopic}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mathTopics.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-3">
                <label className="text-sm text-foreground/70 mb-1 block">Enter your math problem</label>
                <Textarea
                  value={mathInput}
                  onChange={e => setMathInput(e.target.value)}
                  placeholder={`e.g. Solve: 2x² + 5x - 3 = 0 (${mathTopic})`}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Mock Math Keyboard */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['x²', '√', 'π', '∫', '∑', 'sin', 'cos', 'tan', 'log', '÷', '×', '±'].map(sym => (
                  <button
                    key={sym}
                    onClick={() => setMathInput(prev => prev + sym)}
                    className="px-2.5 py-1.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-mono rounded-lg border border-border transition-colors"
                  >
                    {sym}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSolveMath}
                  disabled={mathLoading}
                  className="flex-1 bg-vedansh-orange hover:bg-orange-600 text-white"
                >
                  {mathLoading ? (
                    <span className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 animate-spin" /> Solving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" /> Solve Step-by-Step
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setMathInput(''); setMathSolution(null); }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Solution Panel */}
            {mathSolution && (
              <div className="bg-card border border-vedansh-orange/30 rounded-2xl p-5">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-vedansh-success" />
                  Step-by-Step Solution
                </h4>
                <div className="space-y-3">
                  {mathSolution.steps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-vedansh-orange/20 text-vedansh-orange text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-foreground/80 text-sm">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-vedansh-success/10 border border-vedansh-success/30 rounded-xl">
                  <p className="text-vedansh-success font-semibold text-sm">{mathSolution.answer}</p>
                </div>
              </div>
            )}
          </TabsContent>

          {/* English Coach */}
          <TabsContent value="english" className="space-y-4">
            {/* Reading Comprehension */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-vedansh-orange" /> Reading Comprehension
              </h3>
              <div className="bg-muted/50 rounded-xl p-4 mb-4">
                <p className="text-foreground/80 text-sm leading-relaxed">{comprehensionPassage}</p>
              </div>
              <div className="space-y-3">
                {comprehensionQuestions.map((item, i) => (
                  <div key={i} className="border border-border rounded-xl p-3">
                    <p className="text-foreground text-sm font-medium mb-2">Q{i + 1}: {item.q}</p>
                    <button
                      onClick={() => toggleAnswer(i)}
                      className="text-xs text-vedansh-orange font-medium flex items-center gap-1"
                    >
                      {showAnswers[i] ? 'Hide Answer' : 'Show Answer'}
                      <ChevronDown className={`w-3 h-3 transition-transform ${showAnswers[i] ? 'rotate-180' : ''}`} />
                    </button>
                    {showAnswers[i] && (
                      <p className="text-vedansh-success text-sm mt-2 font-medium">✓ {item.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Speaking Practice */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Mic className="w-4 h-4 text-vedansh-orange" /> Speaking Practice
              </h3>
              <p className="text-foreground/60 text-sm mb-4">Practice speaking English with AI feedback. Press the mic button to start.</p>
              <div className="text-center">
                <button
                  onClick={toggleMic}
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                    micActive
                      ? 'bg-red-500 shadow-lg scale-110 animate-pulse'
                      : 'bg-vedansh-orange/20 border-2 border-vedansh-orange hover:bg-vedansh-orange/30'
                  }`}
                >
                  <Mic className={`w-8 h-8 ${micActive ? 'text-white' : 'text-vedansh-orange'}`} />
                </button>
                <p className="text-foreground/50 text-xs mt-3">
                  {micActive ? '🔴 Recording... (UI Demo)' : 'Tap to start speaking'}
                </p>
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-xl">
                <p className="text-foreground/60 text-xs italic">Today's topic: "Describe your daily routine in English"</p>
              </div>
            </div>

            {/* Vocabulary Builder */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-lg">📖</span> Vocabulary Builder
              </h3>
              <div className="space-y-3">
                {vocabularyWords.map((item, i) => (
                  <div key={i} className="border border-border rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-vedansh-orange text-sm">{item.word}</span>
                      <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Word of the Day</span>
                    </div>
                    <p className="text-foreground/70 text-xs mb-1">{item.meaning}</p>
                    <p className="text-foreground/50 text-xs italic">"{item.example}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar Checker */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-vedansh-orange" /> Grammar Checker
              </h3>
              <div className="space-y-3 mb-4">
                {grammarExamples.map((ex, i) => (
                  <div key={i} className="bg-muted/50 rounded-xl p-3">
                    <p className="text-red-500 text-xs line-through mb-1">✗ {ex.wrong}</p>
                    <p className="text-vedansh-success text-xs font-medium mb-1">✓ {ex.correct}</p>
                    <p className="text-foreground/50 text-xs italic">{ex.rule}</p>
                  </div>
                ))}
              </div>
              <Textarea
                value={grammarInput}
                onChange={e => setGrammarInput(e.target.value)}
                placeholder="Type your sentence or paragraph here to check grammar..."
                rows={3}
                className="mb-3 resize-none"
              />
              <Button
                onClick={handleGrammarCheck}
                className="w-full bg-vedansh-orange hover:bg-orange-600 text-white"
              >
                Check Grammar
              </Button>
              {grammarResult && (
                <div className="mt-3 p-3 bg-vedansh-success/10 border border-vedansh-success/30 rounded-xl">
                  <p className="text-vedansh-success text-sm">{grammarResult}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
