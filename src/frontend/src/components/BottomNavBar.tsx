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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-nav-bg border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-nav-inactive hover:text-nav-active transition-colors min-w-0 flex-1"
            activeProps={{ className: "text-nav-active" }}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <div
                  className={`p-1 rounded-lg transition-colors ${isActive ? "bg-nav-active/15" : ""}`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                </div>
                <span className="text-xs font-medium truncate">{label}</span>
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
