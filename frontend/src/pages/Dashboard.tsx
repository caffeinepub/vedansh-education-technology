import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import {
  BookOpen, Brain, Heart, Trophy, Flame, Bell, TrendingUp,
  Star, ChevronRight, Zap, Target, Award, Clock
} from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetStudent, useUpdateStreak } from '../hooks/useQueries';
import ProfileSetupModal from '../components/ProfileSetupModal';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const quickCards = [
  { title: 'Study', subtitle: 'NCERT & Notes', icon: BookOpen, to: '/academic', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10' },
  { title: 'Practice', subtitle: 'Quizzes & Tests', icon: Trophy, to: '/quizzes', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-500/10' },
  { title: 'Wellness', subtitle: 'Health & Focus', icon: Heart, to: '/wellness', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-500/10' },
  { title: 'AI Tools', subtitle: 'Math & English', icon: Brain, to: '/ai-tools', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/10' },
];

const subjectProgress = [
  { subject: 'Mathematics', progress: 72, color: 'bg-blue-500', icon: '📐' },
  { subject: 'Science', progress: 58, color: 'bg-green-500', icon: '🔬' },
  { subject: 'English', progress: 85, color: 'bg-purple-500', icon: '📚' },
  { subject: 'Social Studies', progress: 45, color: 'bg-orange-500', icon: '🌍' },
];

const upcomingQuizzes = [
  { subject: 'Mathematics', topic: 'Quadratic Equations', time: 'Today, 4:00 PM', difficulty: 'Medium' },
  { subject: 'Science', topic: 'Chemical Reactions', time: 'Tomorrow, 10:00 AM', difficulty: 'Hard' },
  { subject: 'English', topic: 'Grammar & Comprehension', time: 'Thu, 2:00 PM', difficulty: 'Easy' },
];

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const phone = userProfile?.phoneNumber || localStorage.getItem('vedansh_phone') || '';
  const { data: student, isLoading: studentLoading } = useGetStudent(phone || undefined);
  const updateStreak = useUpdateStreak();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (student && phone) {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('vedansh_last_visit');
      if (lastVisit !== today) {
        localStorage.setItem('vedansh_last_visit', today);
        const newStreak = Number(student.streakCount) + 1;
        updateStreak.mutate({ phoneNumber: phone, newStreak });
      }
    }
  }, [student, phone]);

  const displayName = userProfile?.name || student?.name || 'Student';
  const streakCount = student ? Number(student.streakCount) : 0;

  return (
    <div className="min-h-screen bg-background">
      <ProfileSetupModal open={showProfileSetup} />

      {/* Header Banner */}
      <div className="gradient-hero px-4 pt-6 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)', backgroundSize: 'cover' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              {profileLoading ? (
                <Skeleton className="h-6 w-40 bg-white/20 mb-1" />
              ) : (
                <h1 className="font-baloo font-bold text-2xl text-white">
                  Namaste, {displayName}! 👋
                </h1>
              )}
              <p className="text-white/60 text-sm">Ready to learn today?</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Streak */}
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2">
                <Flame className="w-5 h-5 text-vedansh-orange" />
                <span className="text-white font-bold text-sm">{streakCount}</span>
                <span className="text-white/60 text-xs">day streak</span>
              </div>
              {/* Notification */}
              <Link to="/dashboard" className="relative p-2 bg-white/10 rounded-xl border border-white/20">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-vedansh-orange rounded-full"></span>
              </Link>
            </div>
          </div>

          {/* NEP Badge */}
          <div className="flex items-center gap-2">
            <img src="/assets/generated/nep2020-badge.dim_200x80.png" alt="NEP 2020" className="h-7 object-contain" />
            <span className="text-white/50 text-xs">NEP 2020 Compliant</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8 pb-8 space-y-6">
        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-3">
          {quickCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.to} to={card.to}>
                <div className={`${card.bg} border border-border rounded-2xl p-4 hover:shadow-glass transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-card`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-semibold text-foreground text-sm">{card.title}</div>
                  <div className="text-foreground/50 text-xs mt-0.5">{card.subtitle}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Subject Progress */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-vedansh-orange" />
              Your Progress
            </h2>
            <span className="text-xs text-foreground/50">This Week</span>
          </div>
          <div className="space-y-4">
            {subjectProgress.map((item) => (
              <div key={item.subject}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-medium text-foreground">{item.subject}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground/70">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Quizzes */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-vedansh-orange" />
              Upcoming Quizzes
            </h2>
            <Link to="/quizzes" className="text-vedansh-orange text-xs font-medium flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingQuizzes.map((quiz, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-vedansh-orange/10 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-vedansh-orange" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">{quiz.topic}</div>
                  <div className="text-foreground/50 text-xs">{quiz.subject} • {quiz.time}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                  quiz.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' :
                  quiz.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-600' :
                  'bg-red-500/10 text-red-600'
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* More Features */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: 'Competitive Exams', icon: Trophy, to: '/competitive-exams', color: 'text-orange-500' },
            { title: 'Placement Prep', icon: Zap, to: '/placement-prep', color: 'text-blue-500' },
            { title: 'NCERT Library', icon: BookOpen, to: '/ncert-library', color: 'text-green-500' },
            { title: 'Govt Resources', icon: Award, to: '/government-resources', color: 'text-purple-500' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to}>
                <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:shadow-glass transition-all duration-200 active:scale-95">
                  <Icon className={`w-5 h-5 ${item.color} shrink-0`} />
                  <span className="text-foreground text-sm font-medium">{item.title}</span>
                  <ChevronRight className="w-4 h-4 text-foreground/30 ml-auto" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Achievement Badges */}
        {student && student.badges.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-vedansh-gold" />
              Your Badges
            </h2>
            <div className="flex flex-wrap gap-2">
              {student.badges.map((badge, i) => (
                <span key={i} className="bg-vedansh-gold/10 text-vedansh-gold border border-vedansh-gold/30 rounded-full px-3 py-1 text-xs font-semibold">
                  🏆 {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
