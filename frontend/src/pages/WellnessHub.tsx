import { useState, useEffect, useRef } from 'react';
import { Heart, Clock, Star, Users, Play, Pause, RotateCcw, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const motivationalQuotes = [
  { quote: 'Sapne wo nahi jo hum sote waqt dekhte hain, sapne wo hain jo hume sone nahi dete.', author: 'Dr. APJ Abdul Kalam' },
  { quote: 'Shiksha sabse shaktishali hathiyar hai jise aap duniya ko badalne ke liye use kar sakte hain.', author: 'Nelson Mandela' },
  { quote: 'Safalta tab milti hai jab aapke sapne aapke daro se bade ho jaate hain.', author: 'Unknown' },
  { quote: 'Mehnat karo itni khamoshi se ki tumhari safalta shor machaye.', author: 'Unknown' },
  { quote: 'Kal ki taiyari aaj karo, aaj ki taiyari abhi karo.', author: 'Unknown' },
  { quote: 'Padhai mein jo time lagata hai, woh kabhi waste nahi hota.', author: 'Vedansh' },
];

const achievementBadges = [
  { name: 'First Login', icon: '🌟', desc: 'Welcome to Vedansh!', earned: true },
  { name: '7-Day Streak', icon: '🔥', desc: 'Study 7 days in a row', earned: true },
  { name: 'Quiz Master', icon: '🏆', desc: 'Score 100% in a quiz', earned: false },
  { name: 'Speed Learner', icon: '⚡', desc: 'Complete 5 topics in a day', earned: false },
  { name: 'Bookworm', icon: '📚', desc: 'Read 10 NCERT chapters', earned: false },
  { name: 'Math Wizard', icon: '🔢', desc: 'Solve 50 math problems', earned: false },
  { name: 'Top Ranker', icon: '👑', desc: 'Reach top 10 leaderboard', earned: false },
  { name: 'Consistent', icon: '💪', desc: '30-day study streak', earned: false },
];

const studyGroups = [
  { name: 'JEE Aspirants 2025', members: 1240, subject: 'Physics, Chemistry, Math', active: true },
  { name: 'NEET Prep Group', members: 980, subject: 'Biology, Chemistry', active: true },
  { name: 'Class 10 Board Prep', members: 2100, subject: 'All Subjects', active: false },
  { name: 'UPSC Discussion', members: 560, subject: 'GS, Current Affairs', active: true },
  { name: 'BTech CSE Help', members: 780, subject: 'DSA, DBMS, OS', active: false },
];

const healthTips = [
  { icon: '👁️', title: 'Eye Care', tip: 'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.' },
  { icon: '🧘', title: 'Mental Health', tip: 'Take 5-minute meditation breaks between study sessions to reduce stress and improve focus.' },
  { icon: '🪑', title: 'Posture', tip: 'Sit straight with your back supported. Keep your screen at eye level to avoid neck strain.' },
  { icon: '💧', title: 'Hydration', tip: 'Drink at least 8 glasses of water daily. Dehydration reduces concentration by 20%.' },
  { icon: '🏃', title: 'Exercise', tip: 'Take a 10-minute walk every hour. Physical activity boosts brain function and memory.' },
];

interface Goal {
  id: number;
  text: string;
  done: boolean;
}

export default function WellnessHub() {
  // Pomodoro Timer
  const STUDY_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  const [timeLeft, setTimeLeft] = useState(STUDY_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Daily Goals
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, text: 'Complete 2 chapters of Math', done: false },
    { id: 2, text: 'Practice 10 English vocabulary words', done: false },
    { id: 3, text: 'Solve 5 previous year questions', done: false },
  ]);
  const [newGoal, setNewGoal] = useState('');

  // Quote
  const [quoteIndex] = useState(() => Math.floor(Math.random() * motivationalQuotes.length));
  const currentQuote = motivationalQuotes[quoteIndex];

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsActive(false);
            if (!isBreak) {
              setIsBreak(true);
              setTimeLeft(BREAK_TIME);
              setCycles(c => c + 1);
              toast.success('🎉 Study session complete! Take a 5-minute break.');
            } else {
              setIsBreak(false);
              setTimeLeft(STUDY_TIME);
              toast.info('Break over! Time to study again. 📚');
            }
            return isBreak ? STUDY_TIME : BREAK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, isBreak]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(STUDY_TIME);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    setGoals(prev => [...prev, { id: Date.now(), text: newGoal.trim(), done: false }]);
    setNewGoal('');
  };

  const toggleGoal = (id: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  const removeGoal = (id: number) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const progress = ((isBreak ? BREAK_TIME : STUDY_TIME) - timeLeft) / (isBreak ? BREAK_TIME : STUDY_TIME) * 100;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">Wellness & Success Hub</h1>
              <p className="text-white/60 text-sm">Health • Focus • Motivation • Community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8">
        <Tabs defaultValue="timer">
          <TabsList className="w-full grid grid-cols-4 mb-5">
            <TabsTrigger value="timer">⏱️ Timer</TabsTrigger>
            <TabsTrigger value="health">❤️ Health</TabsTrigger>
            <TabsTrigger value="motivation">⭐ Motivate</TabsTrigger>
            <TabsTrigger value="groups">👥 Groups</TabsTrigger>
          </TabsList>

          {/* Pomodoro Timer */}
          <TabsContent value="timer" className="space-y-4">
            {/* Timer Card */}
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-vedansh-orange" />
                <h3 className="font-semibold text-foreground">Pomodoro Timer</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isBreak ? 'bg-green-500/10 text-green-600' : 'bg-vedansh-orange/10 text-vedansh-orange'}`}>
                  {isBreak ? '☕ Break Time' : '📚 Study Time'}
                </span>
              </div>

              {/* Circular Timer */}
              <div className="relative w-36 h-36 mx-auto mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                  <circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke={isBreak ? '#00C851' : '#FF6B00'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (progress / 100) * circumference}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-baloo font-bold text-3xl text-foreground">{formatTime(timeLeft)}</span>
                  <span className="text-foreground/50 text-xs">{cycles} cycles done</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setIsActive(prev => !prev)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                    isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-vedansh-orange hover:bg-orange-600'
                  }`}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold border border-border text-foreground hover:bg-muted transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="font-bold text-foreground">25 min</div>
                  <div className="text-foreground/50 text-xs">Study Session</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="font-bold text-foreground">5 min</div>
                  <div className="text-foreground/50 text-xs">Break Time</div>
                </div>
              </div>
            </div>

            {/* Daily Goals */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-vedansh-orange" /> Daily Goals
              </h3>
              <div className="space-y-2 mb-4">
                {goals.map(goal => (
                  <div key={goal.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <button onClick={() => toggleGoal(goal.id)}>
                      {goal.done
                        ? <CheckCircle className="w-5 h-5 text-vedansh-success" />
                        : <Circle className="w-5 h-5 text-foreground/30" />
                      }
                    </button>
                    <span className={`flex-1 text-sm ${goal.done ? 'line-through text-foreground/40' : 'text-foreground'}`}>
                      {goal.text}
                    </span>
                    <button onClick={() => removeGoal(goal.id)} className="text-foreground/30 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newGoal}
                  onChange={e => setNewGoal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addGoal()}
                  placeholder="Add a new goal..."
                  className="flex-1 bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-vedansh-orange"
                />
                <button
                  onClick={addGoal}
                  className="p-2 bg-vedansh-orange text-white rounded-xl hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" /> Health & Wellness Tips
              </h3>
              <div className="space-y-3">
                {healthTips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-muted/50 rounded-xl">
                    <span className="text-2xl shrink-0">{tip.icon}</span>
                    <div>
                      <div className="font-medium text-foreground text-sm mb-1">{tip.title}</div>
                      <p className="text-foreground/60 text-xs leading-relaxed">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meditation Timer */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                🧘 Quick Meditation
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map(mins => (
                  <button
                    key={mins}
                    onClick={() => toast.info(`Starting ${mins}-minute meditation session...`)}
                    className="py-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl text-sm font-semibold hover:bg-purple-500/20 transition-colors"
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Motivation Tab */}
          <TabsContent value="motivation" className="space-y-4">
            {/* Daily Quote */}
            <div className="bg-gradient-to-br from-vedansh-navy to-navy-800 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-vedansh-gold" />
                <span className="font-semibold text-sm">Daily Motivation</span>
              </div>
              <blockquote className="text-lg font-medium leading-relaxed mb-3 italic">
                "{currentQuote.quote}"
              </blockquote>
              <p className="text-white/60 text-sm">— {currentQuote.author}</p>
            </div>

            {/* Achievement Badges */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                🏆 Achievement Badges
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievementBadges.map((badge, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border transition-all ${
                      badge.earned
                        ? 'bg-vedansh-gold/10 border-vedansh-gold/30'
                        : 'bg-muted/50 border-border opacity-60'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className={`font-semibold text-sm ${badge.earned ? 'text-vedansh-gold' : 'text-foreground/50'}`}>
                      {badge.name}
                    </div>
                    <div className="text-foreground/50 text-xs mt-0.5">{badge.desc}</div>
                    {badge.earned && (
                      <span className="mt-1 inline-block text-xs text-vedansh-success font-medium">✓ Earned</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-vedansh-orange" /> Study Groups
              </h3>
              <div className="space-y-3">
                {studyGroups.map((group, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-vedansh-orange/10 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-vedansh-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm truncate">{group.name}</div>
                      <div className="text-foreground/50 text-xs">{group.members.toLocaleString()} members • {group.subject}</div>
                    </div>
                    <button
                      onClick={() => toast.success(`Joined "${group.name}"!`)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                        group.active
                          ? 'bg-vedansh-orange text-white hover:bg-orange-600'
                          : 'bg-muted text-foreground/60 hover:bg-muted/80'
                      }`}
                    >
                      {group.active ? 'Join' : 'View'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Group */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4 text-vedansh-orange" /> Create Study Group
              </h3>
              <div className="space-y-3">
                <input
                  placeholder="Group name (e.g. JEE 2026 Batch)"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-vedansh-orange"
                />
                <input
                  placeholder="Subject focus (e.g. Physics, Math)"
                  className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-vedansh-orange"
                />
                <button
                  onClick={() => toast.success('Study group created successfully!')}
                  className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Create Group
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
