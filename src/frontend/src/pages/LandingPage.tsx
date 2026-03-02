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
  Star,
  Trophy,
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
    accent: "oklch(0.55 0.18 230)",
  },
  {
    icon: Brain,
    title: "Interactive Quizzes",
    desc: "Subject-wise timed quizzes with leaderboard and score tracking.",
    accent: "oklch(0.55 0.18 280)",
  },
  {
    icon: Briefcase,
    title: "Placement Prep",
    desc: "DSA roadmap, company profiles, and resume builder for BTech students.",
    accent: "oklch(0.55 0.18 85)",
  },
  {
    icon: Heart,
    title: "Wellness Hub",
    desc: "Pomodoro timer, goal tracker, and mental health resources.",
    accent: "oklch(0.55 0.22 15)",
  },
  {
    icon: Trophy,
    title: "Competitive Exams",
    desc: "JEE, NEET, UPSC, SSC preparation resources and mock tests.",
    accent: "oklch(0.62 0.22 40)",
  },
  {
    icon: Globe,
    title: "Govt Resources",
    desc: "Scholarships, schemes, and official government education portals.",
    accent: "oklch(0.55 0.18 145)",
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
      {/* Hero Section — Navy gradient with logo and slogans */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{
          background:
            "linear-gradient(140deg, oklch(0.16 0.055 244) 0%, oklch(0.22 0.075 250) 50%, oklch(0.19 0.065 244) 100%)",
        }}
      >
        {/* Decorative background blobs */}
        <div
          className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.22 40 / 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.18 200 / 0.1) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                style={{ background: "oklch(0.62 0.22 40 / 0.6)" }}
              />
              <img
                src="/assets/generated/vedansh-logo.dim_256x256.png"
                alt="Vedansh Education & Technology"
                className="relative h-20 w-20 rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <GovtApprovedBadge size="md" />
            <Badge
              className="text-sm px-4 py-1 font-medium border"
              style={{
                background: "oklch(0.62 0.22 40 / 0.15)",
                color: "oklch(0.82 0.18 85)",
                borderColor: "oklch(0.62 0.22 40 / 0.3)",
              }}
            >
              🎓 100% Free Forever — No Hidden Charges
            </Badge>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: '"Baloo 2", cursive, system-ui' }}
            >
              India's Free{" "}
              <span style={{ color: "oklch(0.62 0.22 40)" }}>Education</span>
              <br className="hidden sm:block" /> Platform
            </h1>
          </div>

          {/* Official Slogans */}
          <div className="space-y-3">
            <p
              className="text-2xl sm:text-3xl font-bold tracking-wide"
              style={{ color: "oklch(0.62 0.22 40)" }}
            >
              नहीं आता है सिखों
            </p>
            <p
              className="text-base sm:text-lg italic font-medium max-w-lg mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              "शिक्षा वह शेरनी का दूध है जो पियेगा वही दहाड़ेगा"
            </p>
          </div>

          <p
            className="text-base text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            NCERT books, competitive exam prep, placement resources, wellness
            tools — everything a student needs, completely free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => navigate({ to: "/auth" })}
              className="text-base px-8 font-semibold shadow-lg"
              style={{
                background: "oklch(0.62 0.22 40)",
                color: "white",
                boxShadow: "0 4px 20px oklch(0.62 0.22 40 / 0.45)",
              }}
              data-ocid="landing.primary_button"
            >
              Start Learning Free
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: "/about" })}
              className="text-base px-8 font-semibold"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderColor: "rgba(255,255,255,0.25)",
                color: "white",
              }}
              data-ocid="landing.secondary_button"
            >
              Learn More
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap justify-center gap-4 text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {[
              "No Registration Fee",
              "No Ads",
              "NEP 2020 Aligned",
              "Govt. Approved",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle
                  className="h-4 w-4"
                  style={{ color: "oklch(0.65 0.18 145)" }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-14 px-4"
        style={{ background: "oklch(0.58 0.2 35)" }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white">
              {students.toLocaleString()}+
            </p>
            <p className="text-white/70 mt-1 text-sm font-medium">Students</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">
              {resources.toLocaleString()}+
            </p>
            <p className="text-white/70 mt-1 text-sm font-medium">Resources</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">
              {schools.toLocaleString()}+
            </p>
            <p className="text-white/70 mt-1 text-sm font-medium">Schools</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: '"Baloo 2", cursive, system-ui' }}
            >
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground">
              Comprehensive tools for every stage of your education journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, accent }) => (
              <Card
                key={title}
                className="hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-border"
              >
                <CardContent className="pt-6 space-y-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}22` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accent }} />
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
            <h2
              className="text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: '"Baloo 2", cursive, system-ui' }}
            >
              What Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, rating }) => (
              <Card key={name} className="border border-border">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rating }, (_, i) => i + 1).map(
                      (star) => (
                        <Star
                          key={star}
                          className="h-4 w-4"
                          style={{
                            color: "oklch(0.82 0.18 85)",
                            fill: "oklch(0.82 0.18 85)",
                          }}
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
      <section
        className="py-16 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.055 244) 0%, oklch(0.22 0.075 250) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.62 0.22 40 / 0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <h2
            className="text-3xl font-bold text-white"
            style={{ fontFamily: '"Baloo 2", cursive, system-ui' }}
          >
            Start Your Free Learning Journey Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)" }}>
            Join thousands of students who are already learning for free on
            Vedansh.
          </p>
          <Button
            size="lg"
            onClick={() => navigate({ to: "/auth" })}
            className="text-base px-8 font-semibold"
            style={{
              background: "oklch(0.62 0.22 40)",
              color: "white",
              boxShadow: "0 4px 20px oklch(0.62 0.22 40 / 0.45)",
            }}
            data-ocid="landing.cta_button"
          >
            Get Started — It's Free
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </section>
    </div>
  );
}
