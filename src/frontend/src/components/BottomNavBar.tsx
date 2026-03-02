import { Link } from "@tanstack/react-router";
import { BookOpen, Brain, Heart, Home, User } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/academic", label: "Academic", icon: BookOpen },
  { to: "/quizzes", label: "Quizzes", icon: Brain },
  { to: "/wellness", label: "Wellness", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNavBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "var(--nav-bg)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl min-w-0 flex-1 transition-all duration-200"
            style={{ color: "var(--nav-inactive)" }}
            activeProps={{
              style: { color: "var(--nav-active)" },
            }}
            data-ocid={`nav.${label.toLowerCase()}.link`}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <div
                  className="p-1.5 rounded-xl transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: "oklch(0.65 0.22 40 / 0.18)",
                        }
                      : {}
                  }
                >
                  <Icon
                    className="h-5 w-5 flex-shrink-0 transition-all duration-200"
                    style={
                      isActive
                        ? {
                            color: "var(--nav-active)",
                            filter:
                              "drop-shadow(0 0 6px oklch(0.65 0.22 40 / 0.5))",
                          }
                        : { color: "var(--nav-inactive)" }
                    }
                    aria-hidden="true"
                  />
                </div>
                <span
                  className="text-xs font-medium truncate transition-all duration-200"
                  style={
                    isActive
                      ? { color: "var(--nav-active)", fontWeight: 600 }
                      : { color: "var(--nav-inactive)" }
                  }
                >
                  {label}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
      {/* Safe area spacer for iOS */}
      <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
    </nav>
  );
}
