import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Calculator,
  CheckCheck,
  Copy,
  FileText,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { useState } from "react";

type ToolResult = { input: string; output: string } | null;

function mockAIResponse(tool: string, input: string): string {
  switch (tool) {
    case "summarize":
      return `📝 Summary:\n\nThe provided text discusses key concepts related to the topic. Main points include:\n• Core concept 1: ${input.slice(0, 50)}...\n• The material covers fundamental principles\n• Key takeaways for exam preparation\n\nThis summary covers the essential points for quick revision.`;
    case "explain":
      return `💡 Explanation:\n\n"${input.slice(0, 60)}..." can be understood as follows:\n\n1. Basic Definition: This concept refers to a fundamental principle in the subject area.\n\n2. How it works: The mechanism involves several interconnected steps that build upon each other.\n\n3. Real-world example: Consider a scenario where this concept applies directly to everyday situations.\n\n4. Key formula/rule: Remember the core relationship between the variables involved.\n\nThis explanation is designed for Class 10-12 level understanding.`;
    case "quiz":
      return `🧠 Practice Questions:\n\n1. What is the primary definition of "${input.slice(0, 30)}..."?\n   a) Option A  b) Option B  c) Option C  d) Option D\n\n2. Which of the following best describes the concept?\n   a) Description 1  b) Description 2  c) Description 3  d) Description 4\n\n3. Apply the concept: In a given scenario, what would be the expected outcome?\n\n4. True or False: The concept always applies in standard conditions.\n\n5. Short answer: Explain in 2-3 sentences why this concept is important.`;
    case "math":
      return `🔢 Math Solution:\n\nProblem: ${input}\n\nStep-by-step solution:\n\nStep 1: Identify the given information and what we need to find.\n\nStep 2: Apply the relevant formula or theorem.\n   Formula: [Relevant mathematical formula]\n\nStep 3: Substitute the values.\n   = [Calculation step 1]\n   = [Calculation step 2]\n\nStep 4: Simplify and solve.\n   = Final Answer\n\n✅ Answer: [Result]\n\nNote: Always verify your answer by substituting back into the original equation.`;
    default:
      return "Processing your request...";
  }
}

export default function AIToolsHub() {
  const [summarizeInput, setSummarizeInput] = useState("");
  const [explainInput, setExplainInput] = useState("");
  const [quizInput, setQuizInput] = useState("");
  const [mathInput, setMathInput] = useState("");

  const [results, setResults] = useState<Record<string, ToolResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const handleTool = async (tool: string, input: string) => {
    if (!input.trim()) return;
    setLoading((l) => ({ ...l, [tool]: true }));
    setResults((r) => ({ ...r, [tool]: null }));

    // Simulate AI processing delay
    await new Promise((res) => setTimeout(res, 1500));

    const output = mockAIResponse(tool, input);
    setResults((r) => ({ ...r, [tool]: { input, output } }));
    setLoading((l) => ({ ...l, [tool]: false }));
  };

  const handleCopy = (tool: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied((c) => ({ ...c, [tool]: true }));
    setTimeout(() => setCopied((c) => ({ ...c, [tool]: false })), 2000);
  };

  const ResultBox = ({ tool }: { tool: string }) => {
    const result = results[tool];
    if (!result) return null;
    return (
      <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border relative">
        <button
          type="button"
          onClick={() => handleCopy(tool, result.output)}
          className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-accent transition-colors"
          title="Copy"
        >
          {copied[tool] ? (
            <CheckCheck className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        <pre className="text-sm text-foreground whitespace-pre-wrap font-sans pr-8">
          {result.output}
        </pre>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">AI Tools Hub</h1>
        <p className="text-muted-foreground mt-1">
          Smart tools to supercharge your learning
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
        {[
          { icon: FileText, label: "Summarizer", color: "text-blue-500" },
          { icon: Lightbulb, label: "Explainer", color: "text-yellow-500" },
          { icon: Brain, label: "Quiz Gen", color: "text-purple-500" },
          { icon: Calculator, label: "Math Solver", color: "text-green-500" },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 p-3 rounded-xl bg-card border border-border"
          >
            <Icon className={`h-6 w-6 ${color}`} />
            <span className="text-xs font-medium text-foreground/70">
              {label}
            </span>
          </div>
        ))}
      </div>

      <Tabs defaultValue="summarize">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="summarize">Summarize</TabsTrigger>
          <TabsTrigger value="explain">Explain</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Gen</TabsTrigger>
          <TabsTrigger value="math">Math</TabsTrigger>
        </TabsList>

        <TabsContent value="summarize" className="mt-4 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                Text Summarizer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Paste your text here to get a concise summary..."
                value={summarizeInput}
                onChange={(e) => setSummarizeInput(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <Button
                onClick={() => handleTool("summarize", summarizeInput)}
                disabled={loading.summarize || !summarizeInput.trim()}
                className="w-full"
              >
                {loading.summarize ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  "Summarize Text"
                )}
              </Button>
              <ResultBox tool="summarize" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explain" className="mt-4 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Concept Explainer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Enter a concept or topic to explain (e.g., 'Photosynthesis', 'Newton's Laws')"
                value={explainInput}
                onChange={(e) => setExplainInput(e.target.value)}
              />
              <Button
                onClick={() => handleTool("explain", explainInput)}
                disabled={loading.explain || !explainInput.trim()}
                className="w-full"
              >
                {loading.explain ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Explaining...
                  </>
                ) : (
                  "Explain Concept"
                )}
              </Button>
              <ResultBox tool="explain" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-4 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                Quiz Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Enter a topic to generate practice questions (e.g., 'Thermodynamics', 'World War II')"
                value={quizInput}
                onChange={(e) => setQuizInput(e.target.value)}
              />
              <Button
                onClick={() => handleTool("quiz", quizInput)}
                disabled={loading.quiz || !quizInput.trim()}
                className="w-full"
              >
                {loading.quiz ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Questions"
                )}
              </Button>
              <ResultBox tool="quiz" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="math" className="mt-4 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4 text-green-500" />
                Math Problem Solver
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Enter a math problem (e.g., 'Solve: 2x² + 5x - 3 = 0' or 'Find the area of a triangle with base 6 and height 8')"
                value={mathInput}
                onChange={(e) => setMathInput(e.target.value)}
                rows={3}
                className="resize-none"
              />
              <Button
                onClick={() => handleTool("math", mathInput)}
                disabled={loading.math || !mathInput.trim()}
                className="w-full"
              >
                {loading.math ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Solving...
                  </>
                ) : (
                  "Solve Problem"
                )}
              </Button>
              <ResultBox tool="math" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="mt-0.5 flex-shrink-0">
              Note
            </Badge>
            <p className="text-sm text-muted-foreground">
              These AI tools provide educational assistance based on standard
              curriculum. For best results, provide clear and specific inputs.
              Always verify important information with your textbooks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
