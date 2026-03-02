import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Globe,
  Heart,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GovtApprovedBadge from "../components/GovtApprovedBadge";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

const features = [
  {
    icon: BookOpen,
    title: "NCERT Library",
    desc: "Complete NCERT books for Classes 1–12 with online reading and PDF download.",
  },
  {
    icon: Brain,
    title: "Interactive Quizzes",
    desc: "Subject-wise timed quizzes with leaderboard and score tracking.",
  },
  {
    icon: Briefcase,
    title: "Placement Prep",
    desc: "DSA roadmap, company profiles, and resume builder for BTech students.",
  },
  {
    icon: Heart,
    title: "Wellness Hub",
    desc: "Pomodoro timer, goal tracker, and mental health resources.",
  },
  {
    icon: Trophy,
    title: "Competitive Exams",
    desc: "JEE, NEET, UPSC, SSC preparation resources and mock tests.",
  },
  {
    icon: Globe,
    title: "Govt Resources",
    desc: "Scholarships, schemes, and official government education portals.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Class 12 Student",
    text: "Vedansh helped me score 95% in boards. The NCERT library is amazing!",
    rating: 5,
  },
  {
    name: "Rahul Kumar",
    role: "BTech CSE, IIT Delhi",
    text: "The placement prep section is exactly what I needed for campus placements.",
    rating: 5,
  },
  {
    name: "Anita Devi",
    role: "UPSC Aspirant",
    text: "Free resources for UPSC preparation — this platform is a blessing!",
    rating: 5,
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const students = useCountUp(50000, 2000, statsVisible);
  const resources = useCountUp(10000, 2000, statsVisible);
  const schools = useCountUp(500, 2000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <GovtApprovedBadge size="md" />
          </div>

          <div className="flex justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              🎓 100% Free Forever — No Hidden Charges
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
            India's Free <span className="text-primary">Education</span>{" "}
            Platform
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NCERT books, competitive exam prep, placement resources, wellness
            tools — everything a student needs, completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/auth" })}
              className="text-base px-8"
            >
              Start Learning Free
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: "/about" })}
              className="text-base px-8"
            >
              Learn More
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {[
              "No Registration Fee",
              "No Ads",
              "NEP 2020 Aligned",
              "Govt. Approved",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-success" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 px-4 bg-primary text-primary-foreground"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">{students.toLocaleString()}+</p>
            <p className="text-primary-foreground/70 mt-1">Students</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{resources.toLocaleString()}+</p>
            <p className="text-primary-foreground/70 mt-1">Resources</p>
          </div>
          <div>
            <p className="text-4xl font-bold">{schools.toLocaleString()}+</p>
            <p className="text-primary-foreground/70 mt-1">Schools</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground">
              Comprehensive tools for every stage of your education journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }) => (
              <Card key={name}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }, (_, i) => i + 1).map(
                      (star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-amber-400 fill-amber-400"
                        />
                      ),
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">
            Start Your Free Learning Journey Today
          </h2>
          <p className="text-primary-foreground/80">
            Join thousands of students who are already learning for free on
            Vedansh.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate({ to: "/auth" })}
            className="text-base px-8"
          >
            Get Started — It's Free
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
