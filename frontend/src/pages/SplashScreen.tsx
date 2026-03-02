import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Flame, Zap } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'logo' | 'text' | 'tagline' | 'done'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 400);
    const t2 = setTimeout(() => setPhase('tagline'), 900);
    const t3 = setTimeout(() => setPhase('done'), 1500);
    const t4 = setTimeout(() => navigate({ to: '/home' }), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3c 40%, #1a2d4f 70%, #0A1628 100%)',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/splash-bg.dim_1080x1920.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-vedansh-orange/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-vedansh-gold/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-8">
        {/* Logo */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: phase !== 'logo' ? 1 : 0,
            transform: phase !== 'logo' ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-vedansh-orange/50 shadow-orange">
              <img
                src="/assets/generated/vedansh-logo.dim_256x256.png"
                alt="Vedansh Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-vedansh-orange rounded-full flex items-center justify-center shadow-orange animate-float">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-7 h-7 bg-vedansh-gold rounded-full flex items-center justify-center shadow-gold animate-float" style={{ animationDelay: '0.5s' }}>
              <Zap className="w-3.5 h-3.5 text-vedansh-navy" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: phase === 'text' || phase === 'tagline' || phase === 'done' ? 1 : 0,
            transform: phase === 'text' || phase === 'tagline' || phase === 'done' ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h1 className="font-baloo font-bold text-3xl text-white leading-tight">
            Vedansh
          </h1>
          <p className="text-vedansh-orange font-semibold text-lg">Education & Technology</p>
        </div>

        {/* Tagline */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: phase === 'tagline' || phase === 'done' ? 1 : 0,
            transform: phase === 'tagline' || phase === 'done' ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="text-vedansh-gold font-baloo font-bold text-2xl mb-1">
            Seekho, Badho, Chamko
          </div>
          <div className="text-white/60 text-sm">Learn • Grow • Shine</div>
        </div>

        {/* Sub-tagline */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: phase === 'done' ? 1 : 0,
            transform: phase === 'done' ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-vedansh-success rounded-full animate-pulse"></span>
            <span className="text-white/80 text-xs font-medium">100% Free Quality Education Forever</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-vedansh-orange/60 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
