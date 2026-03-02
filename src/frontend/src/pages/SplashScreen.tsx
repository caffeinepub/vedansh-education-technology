import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/landing" });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-primary">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('/assets/generated/splash-bg.dim_1080x1920.png')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
        <div className="animate-bounce-slow">
          <img
            src="/assets/generated/vedansh-logo.dim_256x256.png"
            alt="Vedansh Logo"
            className="h-24 w-24 rounded-2xl shadow-2xl"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Vedansh
          </h1>
          <p className="text-white/80 text-lg font-medium">
            Education & Technology
          </p>
          <p className="text-white/60 text-sm">
            Free learning for every Indian student
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-white/70 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
