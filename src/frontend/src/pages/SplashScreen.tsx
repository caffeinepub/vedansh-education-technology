import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"logo" | "text" | "slogan" | "done">(
    "logo",
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 400);
    const t2 = setTimeout(() => setPhase("slogan"), 900);
    const t3 = setTimeout(() => setPhase("done"), 1500);
    const t4 = setTimeout(() => navigate({ to: "/landing" }), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.14 0.06 244) 0%, oklch(0.21 0.08 250) 40%, oklch(0.28 0.1 255) 70%, oklch(0.19 0.065 244) 100%)",
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.22 40) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-5%] left-[-8%] w-64 h-64 rounded-full opacity-8"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.15 200) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[30%] left-[5%] w-40 h-40 rounded-full opacity-5"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.18 85) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-8 max-w-sm w-full">
        {/* Logo */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: phase === "logo" ? 0 : 1,
            transform:
              phase === "logo"
                ? "scale(0.7) translateY(20px)"
                : "scale(1) translateY(0)",
          }}
        >
          <div className="relative inline-block">
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-60"
              style={{ background: "oklch(0.62 0.22 40 / 0.5)" }}
            />
            <div
              className="relative rounded-2xl shadow-2xl px-4 py-3 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.97)" }}
            >
              <img
                src="/assets/generated/vedansh-logo-wide.dim_480x160.png"
                alt="Vedansh Logo"
                className="h-20 w-auto object-contain"
                style={{ maxWidth: "300px" }}
              />
            </div>
          </div>
        </div>

        {/* App Name */}
        <div
          className="space-y-1 transition-all duration-500"
          style={{
            opacity: phase === "logo" || phase === "text" ? 0 : 1,
            transform:
              phase === "logo" || phase === "text"
                ? "translateY(12px)"
                : "translateY(0)",
            transitionDelay: "100ms",
          }}
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Vedansh
          </h1>
          <p
            className="text-base font-medium tracking-widest uppercase"
            style={{ color: "oklch(0.82 0.18 85)" }}
          >
            Education & Technology
          </p>
        </div>

        {/* Slogans */}
        <div
          className="space-y-3 transition-all duration-600"
          style={{
            opacity:
              phase === "logo" || phase === "text" || phase === "slogan"
                ? 0
                : 1,
            transform:
              phase === "logo" || phase === "text" || phase === "slogan"
                ? "translateY(10px)"
                : "translateY(0)",
            transitionDelay: "200ms",
          }}
        >
          <p
            className="text-xl font-bold"
            style={{ color: "oklch(0.62 0.22 40)" }}
          >
            नहीं आता है सिखों
          </p>
          <p
            className="text-sm font-medium italic leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            "शिक्षा वह शेरनी का दूध है
            <br />
            जो पियेगा वही दहाड़ेगा"
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-2 mt-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                height: "6px",
                width: phase === "done" && i <= 3 ? "20px" : "6px",
                background:
                  i === 0 ? "oklch(0.62 0.22 40)" : "rgba(255,255,255,0.35)",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        className="absolute bottom-8 text-center transition-all duration-700"
        style={{
          opacity: phase === "done" ? 0.6 : 0,
          transitionDelay: "300ms",
        }}
      >
        <p
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          India's Free Education Platform
        </p>
      </div>
    </div>
  );
}
