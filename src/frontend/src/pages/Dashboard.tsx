import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Principal } from "@dfinity/principal";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Briefcase,
  ChevronRight,
  Flame,
  FlaskConical,
  Globe,
  GraduationCap,
  Heart,
  Info,
  Library,
  Star,
  Target,
  Trophy,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import ProfileSetupModal from "../components/ProfileSetupModal";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useGetLeaderboard,
  useGetStudent,
  useUpdateStreak,
} from "../hooks/useQueries";

const sectionCards = [
  {
    to: "/academic",
    label: "Academic Section",
    description: "NCERT books, study material, videos & notes for all classes.",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    to: "/quizzes",
    label: "Practice Quizzes",
    description: "Test your knowledge with timed interactive quizzes.",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    to: "/ncert",
    label: "NCERT Library",
    description: "Browse and download NCERT books for Classes 1–12.",
    icon: Library,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    to: "/wellness",
    label: "Wellness Hub",
    description: "Meditation, stress relief, and mental health resources.",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    to: "/placement",
    label: "BTech Placement Prep",
    description: "DSA, aptitude, interview prep & resume builder.",
    icon: Briefcase,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    to: "/competitive",
    label: "Competitive Exams",
    description: "JEE, NEET, UPSC, SSC and other exam resources.",
    icon: Trophy,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    to: "/ai-tools",
    label: "AI Tools Hub",
    description: "AI-powered study tools, summarizers & doubt solvers.",
    icon: FlaskConical,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    to: "/govt-resources",
    label: "Government Resources",
    description: "Scholarships, schemes & official government portals.",
    icon: Globe,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    to: "/education-tools",
    label: "Education Tools",
    description: "Code editor, circuit simulator & branch-specific tools.",
    icon: Wrench,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    to: "/about",
    label: "About Vedansh",
    description: "Our mission, founder story & NEP 2020 compliance.",
    icon: Info,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
];

export default function Dashboard() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const [profileSetupDone, setProfileSetupDone] = useState(false);

  const principal = identity
    ? Principal.fromText(identity.getPrincipal().toString())
    : null;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const { data: student, isLoading: studentLoading } = useGetStudent(principal);
  const { data: leaderboard } = useGetLeaderboard();
  const updateStreakMutation = useUpdateStreak();

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated &&
    !profileLoading &&
    profileFetched &&
    userProfile === null &&
    !profileSetupDone;

  const userName = userProfile?.name ?? "Student";
  const streakCount = student ? Number(student.streakCount) : 0;
  const quizScores = student?.quizScores ?? [];
  const badges = student?.badges ?? [];

  const handleStreakUpdate = async () => {
    try {
      await updateStreakMutation.mutateAsync(BigInt(streakCount + 1));
    } catch {
      // ignore
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Please Login</h2>
          <p className="text-muted-foreground">
            You need to be logged in to access the dashboard.
          </p>
          <Button onClick={() => navigate({ to: "/auth" })}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Setup Modal */}
      <ProfileSetupModal
        open={showProfileSetup}
        onComplete={() => setProfileSetupDone(true)}
      />

      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          {profileLoading ? (
            <Skeleton className="h-8 w-48 mb-2" />
          ) : (
            <h1 className="text-2xl font-bold text-foreground">
              Welcome, {userName}! 👋
            </h1>
          )}
          <p className="text-muted-foreground text-sm">
            Ready to learn something new today?
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2">
          <Flame className="h-5 w-5 text-amber-500" />
          <span className="font-bold text-amber-600 dark:text-amber-400">
            {streakCount}
          </span>
          <span className="text-xs text-amber-600/70 dark:text-amber-400/70">
            day streak
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            {studentLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
            ) : (
              <p className="text-2xl font-bold text-primary">
                {quizScores.length}
              </p>
            )}
            <p className="text-xs text-muted-foreground">Quizzes Done</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            {studentLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
            ) : (
              <p className="text-2xl font-bold text-primary">{badges.length}</p>
            )}
            <p className="text-xs text-muted-foreground">Badges</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 pb-3">
            {studentLoading ? (
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
            ) : (
              <p className="text-2xl font-bold text-primary">{streakCount}</p>
            )}
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* All Sections Grid */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          All Sections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {sectionCards.map(
            ({ to, label, description, icon: Icon, color, bg }) => (
              <Link
                key={to}
                to={to}
                className="group bg-card border border-border rounded-2xl p-4 hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col gap-3 cursor-pointer"
              >
                <div
                  className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm leading-tight">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug line-clamp-2">
                    {description}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-auto">
                  <span className="text-xs text-primary font-medium">
                    Explore
                  </span>
                  <ChevronRight className="h-3 w-3 text-primary" />
                </div>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* Daily Check-in */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Check-in</p>
              <p className="text-sm text-muted-foreground">
                Mark today as a study day
              </p>
            </div>
            <Button
              onClick={handleStreakUpdate}
              disabled={updateStreakMutation.isPending}
              size="sm"
              className="flex items-center gap-1"
            >
              {updateStreakMutation.isPending ? (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Flame className="h-4 w-4" />
              )}
              Check In
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Quiz Scores */}
      {quizScores.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              Recent Quiz Scores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quizScores
              .slice(-5)
              .reverse()
              .map((score) => (
                <div
                  key={score.subject}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm font-medium text-foreground">
                    {score.subject}
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={Number(score.score)}
                      className="w-20 h-2"
                    />
                    <Badge
                      variant={
                        Number(score.score) >= 70 ? "default" : "secondary"
                      }
                    >
                      {Number(score.score)}%
                    </Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}

      {/* Leaderboard */}
      {leaderboard && leaderboard.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {leaderboard.slice(0, 5).map((entry, idx) => (
              <div
                key={entry.name}
                className="flex items-center gap-3 py-2 border-b border-border last:border-0"
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
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
                <span className="flex-1 text-sm font-medium text-foreground">
                  {entry.name}
                </span>
                <div className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-600">
                    {Number(entry.streakCount)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Badges */}
      {badges.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              My Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="text-sm py-1 px-3"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
