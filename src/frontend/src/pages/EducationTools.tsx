import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Code, Cpu, Play, RotateCcw, Wrench } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GovtApprovedBadge from "../components/GovtApprovedBadge";

const codeTemplates: Record<string, string> = {
  Python: `# Python Program
def hello_world():
    print("Hello, World!")
    return "Vedansh Education"

# Call the function
result = hello_world()
print(f"Result: {result}")`,
  Java: `// Java Program
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Vedansh Education & Technology");
    }
}`,
  "C++": `// C++ Program
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    cout << "Vedansh Education & Technology" << endl;
    return 0;
}`,
  JavaScript: `// JavaScript Program
function helloWorld() {
    console.log("Hello, World!");
    return "Vedansh Education";
}

const result = helloWorld();
console.log(\`Result: \${result}\`);`,
};

const mockOutputs: Record<string, string> = {
  Python:
    "Hello, World!\nResult: Vedansh Education\n\n[Program executed successfully in 0.02s]",
  Java: "Hello, World!\nVedansh Education & Technology\n\n[Program compiled and executed in 0.15s]",
  "C++":
    "Hello, World!\nVedansh Education & Technology\n\n[Program compiled and executed in 0.08s]",
  JavaScript:
    "Hello, World!\nResult: Vedansh Education\n\n[Program executed in 0.01s]",
};

const algorithmSteps = [
  {
    step: 1,
    desc: "Initialize array with elements",
    code: "arr = [64, 34, 25, 12, 22, 11, 90]",
  },
  {
    step: 2,
    desc: "Compare adjacent elements",
    code: "if arr[j] > arr[j+1]: swap",
  },
  {
    step: 3,
    desc: "Swap if out of order",
    code: "arr[j], arr[j+1] = arr[j+1], arr[j]",
  },
  { step: 4, desc: "Repeat for all passes", code: "for i in range(n-1)" },
  {
    step: 5,
    desc: "Array is now sorted!",
    code: "Result: [11, 12, 22, 25, 34, 64, 90]",
  },
];

const circuitComponents = [
  { name: "Resistor", symbol: "⊣⊢", color: "text-orange-500" },
  { name: "Capacitor", symbol: "⊣|⊢", color: "text-blue-500" },
  { name: "Inductor", symbol: "∿∿∿", color: "text-green-500" },
  { name: "Diode", symbol: "▷|", color: "text-red-500" },
  { name: "Transistor", symbol: "BJT", color: "text-purple-500" },
  { name: "Op-Amp", symbol: "▷", color: "text-teal-500" },
];

const cadParts = [
  { name: "Shaft", material: "Steel", dims: "50mm × 10mm" },
  { name: "Bearing", material: "Chrome Steel", dims: "ID: 10mm, OD: 30mm" },
  { name: "Gear", material: "Cast Iron", dims: "Module: 2, Teeth: 20" },
  { name: "Bolt M10", material: "Stainless Steel", dims: "M10 × 50mm" },
];

export default function EducationTools() {
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState(codeTemplates.Python);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [algoStep, setAlgoStep] = useState(0);
  const [algoRunning, setAlgoRunning] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(codeTemplates[lang] || "");
    setOutput("");
  };

  const handleRunCode = async () => {
    setRunning(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 1200));
    setOutput(mockOutputs[language] || "Program executed successfully.");
    setRunning(false);
    toast.success("Code executed successfully!");
  };

  const runAlgorithm = async () => {
    setAlgoRunning(true);
    setAlgoStep(0);
    for (let i = 0; i <= algorithmSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setAlgoStep(i);
    }
    setAlgoRunning(false);
    toast.success("Bubble Sort visualization complete!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">
                Education Tools
              </h1>
              <p className="text-white/60 text-sm">
                BTech Branch-wise Interactive Tools
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8">
        <Tabs defaultValue="cse">
          <TabsList className="w-full grid grid-cols-4 mb-5">
            <TabsTrigger value="cse">💻 CSE</TabsTrigger>
            <TabsTrigger value="ece">⚡ ECE</TabsTrigger>
            <TabsTrigger value="me">⚙️ ME</TabsTrigger>
            <TabsTrigger value="others">🔧 Others</TabsTrigger>
          </TabsList>

          {/* CSE Tab */}
          <TabsContent value="cse" className="space-y-4">
            {/* Code Editor */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-vedansh-navy border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4 text-vedansh-orange" />
                  <span className="text-white font-semibold text-sm">
                    Code Editor
                  </span>
                  <GovtApprovedBadge size="sm" />
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-32 h-7 text-xs bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(codeTemplates).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 space-y-3">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-xs bg-muted/50 border-border resize-none min-h-[180px]"
                  spellCheck={false}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={running}
                    className="flex items-center gap-2 bg-vedansh-success hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors disabled:opacity-60"
                  >
                    {running ? (
                      <RotateCcw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {running ? "Running..." : "Run Code"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCode(codeTemplates[language] || "");
                      setOutput("");
                    }}
                    className="flex items-center gap-2 border border-border text-foreground font-semibold px-4 py-2 rounded-xl text-sm hover:bg-muted transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                </div>
                {output && (
                  <div className="bg-vedansh-navy rounded-xl p-4">
                    <div className="text-vedansh-orange text-xs font-semibold mb-2">
                      Output:
                    </div>
                    <pre className="text-white/80 text-xs font-mono whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Algorithm Visualizer */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-lg">🌳</span> Algorithm Visualizer
                </h3>
                <GovtApprovedBadge size="sm" />
              </div>
              <div className="bg-muted/50 rounded-xl p-3 mb-4">
                <div className="text-xs text-foreground/60 mb-2 font-medium">
                  Bubble Sort Visualization
                </div>
                <div className="flex gap-1 items-end h-16">
                  {[64, 34, 25, 12, 22, 11, 90].map((val, i) => (
                    <div
                      key={val}
                      className="flex-1 rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${(val / 90) * 100}%`,
                        backgroundColor: algoStep > i ? "#00C851" : "#FF6B00",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2 mb-4">
                {algorithmSteps.map((step, i) => (
                  <div
                    key={step.step}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                      algoStep > i
                        ? "bg-vedansh-success/10 border border-vedansh-success/20"
                        : algoStep === i
                          ? "bg-vedansh-orange/10 border border-vedansh-orange/20"
                          : "bg-muted/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        algoStep > i
                          ? "bg-vedansh-success text-white"
                          : algoStep === i
                            ? "bg-vedansh-orange text-white"
                            : "bg-muted text-foreground/40"
                      }`}
                    >
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground">
                        {step.desc}
                      </div>
                      <code className="text-xs text-foreground/50 font-mono">
                        {step.code}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={runAlgorithm}
                disabled={algoRunning}
                className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {algoRunning ? (
                  <RotateCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {algoRunning ? "Visualizing..." : "Visualize Bubble Sort"}
              </button>
            </div>
          </TabsContent>

          {/* ECE Tab */}
          <TabsContent value="ece" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-lg">⚡</span> Circuit Simulator
                </h3>
                <GovtApprovedBadge size="sm" />
              </div>

              {/* Component Palette */}
              <div className="mb-4">
                <div className="text-xs text-foreground/60 font-medium mb-2">
                  Component Palette
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {circuitComponents.map((comp) => (
                    <button
                      type="button"
                      key={comp.name}
                      onClick={() =>
                        toast.info(`${comp.name} added to circuit`)
                      }
                      className="p-3 bg-muted/50 border border-border rounded-xl hover:border-vedansh-orange/50 hover:bg-vedansh-orange/5 transition-all text-center"
                    >
                      <div
                        className={`font-mono text-lg font-bold ${comp.color} mb-1`}
                      >
                        {comp.symbol}
                      </div>
                      <div className="text-foreground/70 text-xs">
                        {comp.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Canvas Area */}
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-xl h-40 flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="text-center text-foreground/40">
                  <Cpu className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Circuit Canvas</p>
                  <p className="text-xs">Click components above to add them</p>
                </div>
                {/* Mock circuit lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 300 160"
                  aria-hidden="true"
                >
                  <line
                    x1="20"
                    y1="80"
                    x2="280"
                    y2="80"
                    stroke="#FF6B00"
                    strokeWidth="2"
                  />
                  <line
                    x1="150"
                    y1="20"
                    x2="150"
                    y2="140"
                    stroke="#FF6B00"
                    strokeWidth="2"
                  />
                  <circle cx="150" cy="80" r="8" fill="#FF6B00" />
                </svg>
              </div>

              <button
                type="button"
                onClick={() =>
                  toast.info("Circuit simulation running... (UI Demo)")
                }
                className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Simulate Circuit
              </button>
            </div>

            {/* ECE Topics */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3">
                ECE Study Topics
              </h3>
              <div className="space-y-2">
                {[
                  "Digital Electronics",
                  "Analog Circuits",
                  "Signals & Systems",
                  "Microprocessors",
                  "Communication Systems",
                  "VLSI Design",
                ].map((topic) => (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => toast.info(`Opening ${topic}...`)}
                    className="w-full flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <span className="text-foreground text-sm font-medium">
                      {topic}
                    </span>
                    <ChevronRight className="w-4 h-4 text-foreground/30" />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ME Tab */}
          <TabsContent value="me" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="text-lg">⚙️</span> CAD Viewer
                </h3>
                <GovtApprovedBadge size="sm" />
              </div>

              {/* 3D Viewport Mockup */}
              <div className="bg-gray-900 rounded-xl h-48 flex items-center justify-center mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Mock 3D object */}
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-vedansh-orange/60 rounded-lg transform rotate-12 animate-float" />
                    <div className="absolute inset-2 border-2 border-vedansh-gold/40 rounded transform -rotate-6" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wrench className="w-8 h-8 text-vedansh-orange/60" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 text-white/40 text-xs">
                  3D CAD Viewport (Demo)
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {["X", "Y", "Z"].map((axis) => (
                    <span
                      key={axis}
                      className="text-xs bg-white/10 text-white/60 px-1.5 py-0.5 rounded"
                    >
                      {axis}
                    </span>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["Rotate", "Pan", "Zoom"].map((ctrl) => (
                  <button
                    type="button"
                    key={ctrl}
                    onClick={() => toast.info(`${ctrl} mode activated`)}
                    className="py-2 bg-muted/50 border border-border rounded-xl text-foreground/70 text-xs font-medium hover:bg-muted transition-colors"
                  >
                    {ctrl}
                  </button>
                ))}
              </div>

              {/* Parts List */}
              <div>
                <div className="text-xs text-foreground/60 font-medium mb-2">
                  Parts List
                </div>
                <div className="space-y-2">
                  {cadParts.map((part, i) => (
                    <div
                      key={part.name}
                      className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg"
                    >
                      <div className="w-6 h-6 rounded bg-vedansh-orange/20 flex items-center justify-center text-xs font-bold text-vedansh-orange shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-foreground text-xs font-medium">
                          {part.name}
                        </div>
                        <div className="text-foreground/50 text-xs">
                          {part.material} • {part.dims}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Others Tab */}
          <TabsContent value="others" className="space-y-4">
            {[
              {
                branch: "Civil Engineering (CE)",
                icon: "🏗️",
                tools: [
                  "AutoCAD Basics",
                  "Structural Analysis",
                  "Surveying Tools",
                  "Concrete Mix Design",
                ],
              },
              {
                branch: "Electrical Engineering (EE)",
                icon: "🔌",
                tools: [
                  "Power Systems",
                  "Electrical Machines",
                  "Control Systems",
                  "Power Electronics",
                ],
              },
              {
                branch: "IT Engineering",
                icon: "🌐",
                tools: [
                  "Web Development",
                  "Database Design",
                  "Network Security",
                  "Cloud Computing",
                ],
              },
              {
                branch: "Chemical Engineering",
                icon: "🧪",
                tools: [
                  "Process Simulation",
                  "Heat Transfer",
                  "Mass Transfer",
                  "Reaction Engineering",
                ],
              },
            ].map((branch) => (
              <div
                key={branch.branch}
                className="bg-card border border-border rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="text-xl">{branch.icon}</span>{" "}
                    {branch.branch}
                  </h3>
                  <GovtApprovedBadge size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {branch.tools.map((tool) => (
                    <button
                      type="button"
                      key={tool}
                      onClick={() => toast.info(`Opening ${tool}...`)}
                      className="p-3 bg-muted/50 border border-border rounded-xl text-left hover:border-vedansh-orange/50 hover:bg-vedansh-orange/5 transition-all"
                    >
                      <div className="text-foreground text-xs font-medium">
                        {tool}
                      </div>
                      <div className="text-foreground/40 text-xs mt-0.5">
                        Interactive Tool
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
