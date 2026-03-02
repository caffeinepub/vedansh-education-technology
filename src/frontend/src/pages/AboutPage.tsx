import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Heart, Shield, Users, Zap } from "lucide-react";
import GovtApprovedBadge from "../components/GovtApprovedBadge";

const coreValues = [
  {
    icon: BookOpen,
    title: "Free Education",
    desc: "Every resource on Vedansh is 100% free, forever. No hidden charges, no premium tiers.",
  },
  {
    icon: Shield,
    title: "NEP 2020 Aligned",
    desc: "Our curriculum and tools are designed in accordance with the National Education Policy 2020.",
  },
  {
    icon: Heart,
    title: "Student Wellbeing",
    desc: "We care about holistic development — academics, mental health, and career readiness.",
  },
  {
    icon: Users,
    title: "Inclusive Access",
    desc: "Built for every Indian student, from rural villages to urban cities.",
  },
  {
    icon: Award,
    title: "Quality Content",
    desc: "Curated NCERT resources, expert-verified study materials, and up-to-date exam prep.",
  },
  {
    icon: Zap,
    title: "Technology Driven",
    desc: "Powered by Internet Computer blockchain for secure, decentralized, and censorship-resistant education.",
  },
];

const timeline = [
  {
    year: "2022",
    event: "Vedansh founded with a vision to democratize education in India.",
  },
  {
    year: "2023",
    event: "Launched NCERT Library with 500+ books for Classes 1–12.",
  },
  {
    year: "2024",
    event: "Added Placement Prep, Competitive Exams, and AI Tools Hub.",
  },
  {
    year: "2025",
    event: "Reached 50,000+ students across 500+ schools in India.",
  },
  {
    year: "2026",
    event: "Migrated to Internet Computer for decentralized, secure education.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center mb-2">
            <div className="rounded-2xl border border-border shadow-md bg-white px-5 py-3 flex items-center justify-center">
              <img
                src="/assets/c7ffc892c_logo.png"
                alt="Vedansh Education & Technology"
                className="h-16 w-auto object-contain"
                style={{ maxWidth: "300px" }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <GovtApprovedBadge size="lg" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">About Vedansh</h1>
          <p className="text-lg text-muted-foreground">
            Education & Technology — Empowering every Indian student with free,
            quality education.
          </p>
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              🇮🇳 Made in India, For India
            </Badge>
          </div>
        </div>
      </section>

      {/* 100% Free Banner */}
      <section className="bg-success/10 border-y border-success/20 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-bold text-success">✅ 100% Free Forever</p>
          <p className="text-muted-foreground mt-1">
            No registration fee. No subscription. No ads. Just pure learning.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <h2 className="text-xl font-bold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide every Indian student — regardless of their economic
                background, location, or language — with access to world-class
                educational resources, completely free of charge.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 space-y-3">
              <h2 className="text-xl font-bold text-foreground">Our Vision</h2>
              <p className="text-muted-foreground">
                A future where no Indian student is left behind due to lack of
                resources. We envision an educated, empowered India where
                technology bridges the gap between opportunity and potential.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Meet the Founder
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="h-28 w-28 rounded-full border-4 border-primary/20 shadow-lg overflow-hidden bg-muted">
              <img
                src="/assets/generated/founder-mrityunjay.dim_400x400.png"
                alt="Mrityunjay Pandey"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Mrityunjay Pandey
              </h3>
              <p className="text-primary font-medium">
                BTech CSE | Founder & CEO
              </p>
              <p className="text-muted-foreground mt-2 max-w-xl">
                A passionate technologist and educator who believes that quality
                education should be a right, not a privilege. Mrityunjay built
                Vedansh to give back to the students of India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            Our Journey
          </h2>
          <div className="space-y-6">
            {timeline.map(({ year, event }) => (
              <div key={year} className="flex gap-4">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="font-bold text-primary">{year}</span>
                </div>
                <div className="flex-shrink-0 w-px bg-border relative">
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary" />
                </div>
                <p className="text-muted-foreground pb-4">{event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEP 2020 */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <img
            src="/assets/generated/nep2020-badge.dim_200x80.png"
            alt="NEP 2020 Compliant"
            className="h-16 mx-auto"
          />
          <h2 className="text-2xl font-bold text-foreground">
            NEP 2020 Compliant
          </h2>
          <p className="text-muted-foreground">
            Vedansh is fully aligned with India's National Education Policy
            2020, promoting holistic development, critical thinking, and
            skill-based learning.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(({ icon: Icon, title, desc }) => (
              <Card key={title}>
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

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50,000+", label: "Students" },
              { value: "10,000+", label: "Resources" },
              { value: "500+", label: "Schools" },
              { value: "100%", label: "Free" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold">{value}</p>
                <p className="text-primary-foreground/70 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
