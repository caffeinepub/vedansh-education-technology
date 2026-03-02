import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  CheckCircle,
  Circle,
  Heart,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Star,
  Sun,
  Target,
  Timer,
  Trash2,
  Wind,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PomodoroState = "idle" | "work" | "break";

type Goal = {
  id: string;
  text: string;
  completed: boolean;
};

const mentalHealthTips = [
  {
    icon: Wind,
    title: "Deep Breathing",
    desc: "Take 5 deep breaths: inhale for 4 counts, hold for 4, exhale for 6. Reduces stress instantly.",
  },
  {
    icon: Sun,
    title: "Morning Routine",
    desc: "Start your day with 10 minutes of sunlight exposure. Boosts mood and regulates sleep cycle.",
  },
  {
    icon: BookOpen,
    title: "Journaling",
    desc: "Write 3 things you're grateful for each day. Shifts focus from stress to positivity.",
  },
  {
    icon: Heart,
    title: "Self-Compassion",
    desc: "Treat yourself like you'd treat a good friend. Mistakes are part of learning.",
  },
];

const studyTips = [
  "Use the Pomodoro technique: 25 min study + 5 min break",
  "Review notes within 24 hours of learning for better retention",
  "Teach concepts to others — the best way to solidify understanding",
  "Use active recall instead of passive re-reading",
  "Get 7-8 hours of sleep — memory consolidation happens during sleep",
  "Exercise for 30 minutes daily to boost brain function",
  "Break large tasks into smaller, manageable chunks",
  "Stay hydrated — even mild dehydration affects concentration",
];

export default function WellnessHub() {
  // Pomodoro Timer
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>("idle");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Goals
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Complete Math homework", completed: false },
    { id: "2", text: "Read 20 pages of NCERT", completed: false },
    { id: "3", text: "Practice 10 coding problems", completed: false },
  ]);
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    if (pomodoroState === "idle") {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (pomodoroState === "work") {
            setSessions((s) => s + 1);
            setPomodoroState("break");
            return 5 * 60;
          }
          setPomodoroState("idle");
          return 25 * 60;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pomodoroState]);

  const startPomodoro = () => {
    setTimeLeft(25 * 60);
    setPomodoroState("work");
  };

  const pausePomodoro = () => {
    setPomodoroState("idle");
  };

  const resetPomodoro = () => {
    setPomodoroState("idle");
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals((g) => [
      ...g,
      { id: Date.now().toString(), text: newGoal.trim(), completed: false },
    ]);
    setNewGoal("");
  };

  const toggleGoal = (id: string) => {
    setGoals((g) =>
      g.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal,
      ),
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((g) => g.filter((goal) => goal.id !== id));
  };

  const completedGoals = goals.filter((g) => g.completed).length;
  const progressPct =
    goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0;

  const pomodoroProgress =
    pomodoroState === "work"
      ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
      : pomodoroState === "break"
        ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
        : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Wellness Hub</h1>
        <p className="text-muted-foreground mt-1">
          Balance your mind, body, and studies
        </p>
      </div>

      <Tabs defaultValue="pomodoro">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
        </TabsList>

        {/* Pomodoro Timer */}
        <TabsContent value="pomodoro" className="mt-4 space-y-4">
          <Card>
            <CardContent className="pt-6 pb-6 flex flex-col items-center gap-6">
              {/* Timer display */}
              <div className="relative">
                <div className="h-40 w-40 rounded-full border-8 border-primary/20 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-primary transition-all"
                    style={{
                      clipPath: `inset(0 ${100 - pomodoroProgress}% 0 0)`,
                    }}
                  />
                  <div className="text-center z-10">
                    <p className="text-3xl font-bold text-foreground font-mono">
                      {formatTime(timeLeft)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {pomodoroState === "idle"
                        ? "Ready"
                        : pomodoroState === "work"
                          ? "Focus Time"
                          : "Break Time"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {pomodoroState === "idle" ? (
                  <Button
                    onClick={startPomodoro}
                    className="flex items-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Focus
                  </Button>
                ) : (
                  <Button
                    onClick={pausePomodoro}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Pause className="h-4 w-4" />
                    Pause
                  </Button>
                )}
                <Button onClick={resetPomodoro} variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Sessions */}
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Sessions completed today:
                </span>
                <Badge variant="secondary">{sessions}</Badge>
              </div>

              {/* Status */}
              {pomodoroState === "work" && (
                <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20 w-full">
                  <p className="text-sm font-medium text-primary">
                    🎯 Focus mode active — stay off social media!
                  </p>
                </div>
              )}
              {pomodoroState === "break" && (
                <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20 w-full">
                  <p className="text-sm font-medium text-success">
                    ☕ Break time — stretch, hydrate, relax!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {studyTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Star className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tracker */}
        <TabsContent value="goals" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Daily Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {completedGoals}/{goals.length} completed
                  </span>
                </div>
                <Progress value={progressPct} />
              </div>

              {/* Add goal */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a new goal..."
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addGoal()}
                />
                <Button
                  onClick={addGoal}
                  size="icon"
                  disabled={!newGoal.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Goals list */}
              <div className="space-y-2">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className="flex-shrink-0"
                    >
                      {goal.completed ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-sm ${goal.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                    >
                      {goal.text}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteGoal(goal.id)}
                      className="flex-shrink-0 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {goals.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No goals yet. Add your first goal!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mental Health */}
        <TabsContent value="mental" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mentalHealthTips.map(({ icon: Icon, title, desc }) => (
              <Card key={title}>
                <CardContent className="pt-5 space-y-2">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Remember
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your mental health is just as important as your academic
                    performance. It's okay to take breaks, ask for help, and
                    prioritize your wellbeing. You are more than your grades.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Helpline Numbers (India)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "iCall (TISS)",
                  number: "9152987821",
                  desc: "Mental health support",
                },
                {
                  name: "Vandrevala Foundation",
                  number: "1860-2662-345",
                  desc: "24/7 helpline",
                },
                {
                  name: "NIMHANS",
                  number: "080-46110007",
                  desc: "National mental health helpline",
                },
                {
                  name: "Snehi",
                  number: "044-24640050",
                  desc: "Emotional support",
                },
              ].map(({ name, number, desc }) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <a
                    href={`tel:${number}`}
                    className="text-primary font-semibold text-sm hover:underline"
                  >
                    {number}
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
