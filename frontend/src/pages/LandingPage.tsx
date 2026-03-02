import { useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import {
  BookOpen, Brain, Trophy, Heart, Briefcase, Users,
  Star, ArrowRight, CheckCircle, Zap, Shield, Award,
  GraduationCap, Target, TrendingUp, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
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
  { icon: BookOpen, title: 'NCERT Study Material', desc: 'Complete Class 1-12 NCERT books, notes & solutions', color: 'from-blue-500 to-blue-600', badge: 'Govt. Approved' },
  { icon: Brain, title: 'AI-Powered Learning', desc: 'AI Maths Tutor & English Coach for personalized learning', color: 'from-purple-500 to-purple-600', badge: 'AI Powered' },
  { icon: Trophy, title: '50+ Competitive Exams', desc: 'JEE, NEET, UPSC, SSC, Banking, Railway & more', color: 'from-orange-500 to-orange-600', badge: 'Free' },
  { icon: Heart, title: 'Student Wellness Hub', desc: 'Mental health, Pomodoro timer & motivational content', color: 'from-pink-500 to-pink-600', badge: 'New' },
  { icon: Briefcase, title: 'BTech Placement Prep', desc: 'DSA, aptitude, interview prep & resume builder', color: 'from-green-500 to-green-600', badge: 'Trending' },
  { icon: Users, title: 'Study Groups', desc: 'Join subject-wise communities & discussion forums', color: 'from-teal-500 to-teal-600', badge: 'Community' },
  { icon: Globe, title: 'Government Resources', desc: 'Govt jobs, scholarships & schemes for students', color: 'from-indigo-500 to-indigo-600', badge: 'Official' },
  { icon: Target, title: 'Interactive Quizzes', desc: 'Timed quizzes, leaderboards & achievement badges', color: 'from-red-500 to-red-600', badge: 'Fun' },
];

const testimonials = [
  { name: 'Rahul Kumar', class: 'Class 12 Student', text: 'Vedansh ne meri JEE preparation mein bahut help ki. AI Maths Tutor amazing hai!', rating: 5 },
  { name: 'Priya Sharma', class: 'BTech CSE, 3rd Year', text: 'Placement prep section se mujhe TCS mein placement mili. Thank you Vedansh!', rating: 5 },
  { name: 'Amit Singh', class: 'UPSC Aspirant', text: 'Government resources section bahut helpful hai. Sab kuch ek jagah milta hai.', rating: 5 },
];

export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const examsCount = useCountUp(50, 2000, statsVisible);
  const studentsCount = useCountUp(100, 2000, statsVisible);
  const classesCount = useCountUp(16, 2000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="gradient-hero relative overflow-hidden min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-vedansh-orange/10 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-vedansh-gold/5 blur-3xl" />
        </div>

        <div className="page-container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                <span className="inline-flex items-center gap-1.5 bg-vedansh-orange/20 text-vedansh-orange border border-vedansh-orange/30 rounded-full px-3 py-1 text-xs font-semibold">
                  <Zap className="w-3 h-3" /> India's #1 AI Education Platform
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-1 text-xs font-semibold">
                  <CheckCircle className="w-3 h-3" /> NEP 2020 Compliant
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-baloo font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-4">
                Seekho,{' '}
                <span className="text-gradient-orange">Badho,</span>{' '}
                <span className="text-vedansh-gold">Chamko</span>
              </h1>
              <p className="text-white/70 text-xl mb-2 font-medium">Learn • Grow • Shine</p>
              <p className="text-white/60 text-base mb-8 max-w-lg mx-auto lg:mx-0">
                100% Free Quality Education Forever | Powered by AI. From Class 1 to BTech — everything you need to succeed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/auth">
                  <Button className="bg-vedansh-orange hover:bg-orange-600 text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-orange hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
                    Start Learning Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-2xl w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                {['100% Free Forever', 'No Ads', 'Government Approved', 'AI Powered'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
                    <CheckCircle className="w-4 h-4 text-vedansh-success" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-4 border-vedansh-orange/30 shadow-orange animate-float">
                  <img
                    src="/assets/generated/vedansh-logo.dim_256x256.png"
                    alt="Vedansh Education"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating cards */}
                <div className="absolute -top-4 -left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-glass">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-vedansh-orange/20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-vedansh-orange" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">1 Cr+</div>
                      <div className="text-white/60 text-xs">Students</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-glass">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-vedansh-gold/20 rounded-lg flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-vedansh-gold" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">50+ Exams</div>
                      <div className="text-white/60 text-xs">Covered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-vedansh-orange py-12">
        <div className="page-container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="font-baloo font-bold text-4xl sm:text-5xl text-white">{examsCount}+</div>
              <div className="text-white/80 text-sm sm:text-base font-medium mt-1">Competitive Exams</div>
            </div>
            <div>
              <div className="font-baloo font-bold text-4xl sm:text-5xl text-white">
                Class 1-{classesCount > 12 ? 'BTech' : classesCount}
              </div>
              <div className="text-white/80 text-sm sm:text-base font-medium mt-1">All Classes</div>
            </div>
            <div>
              <div className="font-baloo font-bold text-4xl sm:text-5xl text-white">{studentsCount}L+</div>
              <div className="text-white/80 text-sm sm:text-base font-medium mt-1">Happy Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEP 2020 Banner */}
      <section className="bg-emerald-600/10 border-y border-emerald-500/20 py-4">
        <div className="page-container">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <img src="/assets/generated/nep2020-badge.dim_200x80.png" alt="NEP 2020" className="h-10 object-contain" />
            <div className="text-center sm:text-left">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">NEP 2020 Compliant Platform</span>
              <span className="text-foreground/60 text-sm ml-2">— Aligned with National Education Policy 2020 standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="font-baloo font-bold text-4xl text-vedansh-navy dark:text-white mb-3">
              Everything You Need to <span className="text-gradient-orange">Succeed</span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              From Class 1 to BTech, from competitive exams to placement prep — all in one free platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group bg-card border border-border rounded-2xl p-6 hover:shadow-glass transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{feature.title}</h3>
                    <span className="text-xs bg-vedansh-orange/10 text-vedansh-orange rounded-full px-2 py-0.5 ml-2 shrink-0">{feature.badge}</span>
                  </div>
                  <p className="text-foreground/60 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)', backgroundSize: 'cover' }} />
        <div className="page-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-baloo font-bold text-4xl text-white mb-3">Meet Our <span className="text-vedansh-orange">Founder</span></h2>
              <p className="text-white/60">The visionary behind India's free education revolution</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative shrink-0">
                  <img
                    src="/assets/generated/founder-avatar.dim_256x256.png"
                    alt="Mrityunjay Pandey"
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-vedansh-orange/50 shadow-orange"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-vedansh-orange rounded-full p-2 shadow-orange">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                    <span className="bg-vedansh-orange/20 text-vedansh-orange border border-vedansh-orange/30 rounded-full px-3 py-1 text-xs font-semibold">Founder & CEO</span>
                    <span className="bg-vedansh-gold/20 text-vedansh-gold border border-vedansh-gold/30 rounded-full px-3 py-1 text-xs font-semibold">BTech CSE</span>
                  </div>
                  <h3 className="font-baloo font-bold text-3xl text-white mb-1">Mrityunjay Pandey</h3>
                  <p className="text-vedansh-orange font-medium mb-4">BTech CSE | Founder & CEO, Vedansh Education & Technology</p>
                  <p className="text-white/70 text-base leading-relaxed max-w-xl">
                    "I believe every Indian student deserves world-class education, regardless of their financial background. 
                    Vedansh is my mission to make that dream a reality — 100% free, forever."
                  </p>
                  <div className="flex flex-wrap gap-4 mt-6 justify-center sm:justify-start">
                    {[
                      { icon: TrendingUp, label: '1 Cr+ Students Impacted' },
                      { icon: Shield, label: 'NEP 2020 Aligned' },
                      { icon: Star, label: '100% Free Forever' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                        <Icon className="w-4 h-4 text-vedansh-orange" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="page-container">
          <div className="text-center mb-12">
            <h2 className="font-baloo font-bold text-4xl text-vedansh-navy dark:text-white mb-3">
              What Students <span className="text-gradient-orange">Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-glass transition-all duration-300">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-vedansh-gold fill-vedansh-gold" />
                  ))}
                </div>
                <p className="text-foreground/70 text-sm mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-vedansh-orange/20 flex items-center justify-center">
                    <span className="text-vedansh-orange font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-foreground/50 text-xs">{t.class}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-vedansh-orange">
        <div className="page-container text-center">
          <h2 className="font-baloo font-bold text-4xl text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join 1 Crore+ students already learning on Vedansh. It's 100% free, forever.
          </p>
          <Link to="/auth">
            <Button className="bg-white text-vedansh-orange hover:bg-white/90 font-bold px-10 py-4 text-lg rounded-2xl shadow-lg transition-all duration-200">
              Start Learning Now — It's Free! 🚀
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
