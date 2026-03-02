import { CheckCircle, Target, Eye, Award, Users, BookOpen, Zap, Heart, Star } from 'lucide-react';

const milestones = [
  { year: '2020', event: 'Vedansh Education & Technology founded by Mrityunjay Pandey' },
  { year: '2021', event: 'Launched free NCERT study material for Class 1-12' },
  { year: '2022', event: 'Added competitive exam preparation for 50+ exams' },
  { year: '2023', event: 'Introduced AI-powered learning tools and wellness hub' },
  { year: '2024', event: 'Reached 1 Crore+ students across India' },
  { year: '2025', event: 'NEP 2020 fully compliant platform with BTech placement prep' },
];

const values = [
  { icon: BookOpen, title: 'Free Forever', desc: '100% free education — no hidden charges, no premium tiers, no ads.', color: 'from-blue-500 to-blue-600' },
  { icon: Zap, title: 'AI-Powered', desc: 'Cutting-edge AI tools to personalize learning for every student.', color: 'from-purple-500 to-purple-600' },
  { icon: CheckCircle, title: 'Quality First', desc: 'Government-approved content aligned with NCERT and NEP 2020.', color: 'from-green-500 to-green-600' },
  { icon: Heart, title: 'Student Wellness', desc: 'Holistic education including mental health and productivity tools.', color: 'from-pink-500 to-pink-600' },
  { icon: Users, title: 'Community', desc: 'Building a community of learners who support each other.', color: 'from-orange-500 to-orange-600' },
  { icon: Star, title: 'Excellence', desc: 'Striving to be better than the best — for every Indian student.', color: 'from-yellow-500 to-yellow-600' },
];

const nepPoints = [
  'Multidisciplinary approach to education across all levels',
  'Focus on critical thinking, creativity, and problem-solving',
  'Mother tongue and regional language support',
  'Vocational education integrated from Class 6 onwards',
  'Holistic development including arts, sports, and wellness',
  'Technology integration for enhanced learning outcomes',
  'Flexible curriculum with multiple entry/exit points',
  'Assessment reforms focusing on competency-based learning',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)', backgroundSize: 'cover' }} />
        <div className="page-container relative z-10 text-center">
          {/* 100% Free Banner */}
          <div className="inline-flex items-center gap-2 bg-vedansh-orange text-white font-bold px-6 py-3 rounded-full text-sm mb-8 shadow-orange">
            <Zap className="w-4 h-4" />
            100% FREE EDUCATION FOREVER — No Charges, No Ads, No Premium
          </div>

          <div className="flex justify-center mb-6">
            <img
              src="/assets/generated/vedansh-logo.dim_256x256.png"
              alt="Vedansh Logo"
              className="w-24 h-24 rounded-3xl border-4 border-vedansh-orange/50 shadow-orange object-cover"
            />
          </div>
          <h1 className="font-baloo font-bold text-4xl sm:text-5xl text-white mb-3">
            Vedansh Education & Technology
          </h1>
          <p className="text-vedansh-orange font-semibold text-xl mb-4">Seekho, Badho, Chamko</p>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            India's #1 AI-Powered Free Education Platform — empowering every Indian student from Class 1 to BTech with world-class, 100% free education.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-vedansh-orange/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-vedansh-orange" />
              </div>
              <h2 className="font-baloo font-bold text-2xl text-foreground mb-3">Our Mission</h2>
              <p className="text-foreground/70 text-base leading-relaxed">
                "Free Quality Education for Every Indian" — We believe that financial barriers should never stop a student from achieving their dreams. Vedansh provides world-class education, completely free, forever.
              </p>
            </div>
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="font-baloo font-bold text-2xl text-foreground mb-3">Our Vision</h2>
              <p className="text-foreground/70 text-base leading-relaxed">
                "Empowering Bharat through Technology" — We envision a future where every child in India, regardless of their background, has access to the same quality of education as students in the world's best institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)', backgroundSize: 'cover' }} />
        <div className="page-container relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-baloo font-bold text-3xl text-white mb-2">Meet Our Founder</h2>
            <p className="text-white/60">The visionary behind India's free education revolution</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative shrink-0">
                  <img
                    src="/assets/generated/founder-avatar.dim_256x256.png"
                    alt="Mrityunjay Pandey"
                    className="w-36 h-36 rounded-3xl object-cover border-4 border-vedansh-orange/50 shadow-orange"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-vedansh-orange rounded-full p-2 shadow-orange">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                    <span className="bg-vedansh-orange/20 text-vedansh-orange border border-vedansh-orange/30 rounded-full px-3 py-1 text-xs font-semibold">Founder & CEO</span>
                    <span className="bg-vedansh-gold/20 text-vedansh-gold border border-vedansh-gold/30 rounded-full px-3 py-1 text-xs font-semibold">BTech CSE</span>
                  </div>
                  <h3 className="font-baloo font-bold text-3xl text-white mb-1">Mrityunjay Pandey</h3>
                  <p className="text-vedansh-orange font-medium mb-4">BTech CSE | Founder & CEO</p>
                  <p className="text-white/70 leading-relaxed">
                    A BTech CSE graduate with a passion for democratizing education in India. Mrityunjay founded Vedansh Education & Technology with a single mission: to ensure that every Indian student, regardless of their financial background, has access to world-class education — completely free, forever.
                  </p>
                  <blockquote className="mt-4 border-l-4 border-vedansh-orange pl-4 text-white/60 italic text-sm">
                    "I started Vedansh because I saw brilliant students give up their dreams due to lack of resources. That ends today."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-16 bg-background">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="font-baloo font-bold text-3xl text-foreground mb-2">Our Journey</h2>
            <p className="text-foreground/60">From a dream to India's #1 free education platform</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-vedansh-orange/20" />
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-12 h-12 rounded-full bg-vedansh-orange flex items-center justify-center text-white font-bold text-xs shrink-0 z-10 shadow-orange">
                      {m.year.slice(2)}
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4 flex-1">
                      <div className="text-vedansh-orange font-bold text-sm mb-1">{m.year}</div>
                      <p className="text-foreground/80 text-sm">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEP 2020 Compliance */}
      <section className="py-16 bg-emerald-500/5 border-y border-emerald-500/10">
        <div className="page-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <img src="/assets/generated/nep2020-badge.dim_200x80.png" alt="NEP 2020" className="h-16 object-contain" />
              </div>
              <h2 className="font-baloo font-bold text-3xl text-foreground mb-2">NEP 2020 Compliant</h2>
              <p className="text-foreground/60 max-w-xl mx-auto">
                Vedansh Education & Technology is fully aligned with India's National Education Policy 2020, ensuring our platform meets the highest standards of modern education.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {nepPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-foreground/80 text-sm">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="font-baloo font-bold text-3xl text-foreground mb-2">Our Core Values</h2>
            <p className="text-foreground/60">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:shadow-glass transition-all duration-200">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-vedansh-orange">
        <div className="page-container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: '1 Cr+', label: 'Students Impacted' },
              { value: '50+', label: 'Exams Covered' },
              { value: '100%', label: 'Free Forever' },
              { value: 'NEP 2020', label: 'Compliant' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-baloo font-bold text-3xl text-white">{stat.value}</div>
                <div className="text-white/80 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
