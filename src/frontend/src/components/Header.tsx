import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Header() {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      router.navigate({ to: "/landing" });
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { to: "/landing", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/auth", label: "Login" },
  ];

  const appLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/academic", label: "Academic" },
    { to: "/quizzes", label: "Quizzes" },
    { to: "/ncert", label: "NCERT" },
    { to: "/placement", label: "Placement" },
    { to: "/about", label: "About" },
  ];

  const links = isAuthenticated ? appLinks : navLinks;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Name + Tagline */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/landing"}
            className="flex items-center gap-2.5 min-w-0"
            data-ocid="header.link"
          >
            <div
              className="flex-shrink-0 h-10 bg-white rounded-lg border border-border shadow-sm px-2 py-1 flex items-center"
              style={{ minWidth: "160px", maxWidth: "220px" }}
            >
              <img
                src="/assets/generated/vedansh-logo-wide.dim_480x160.png"
                alt="Vedansh Education & Technology"
                className="h-8 w-auto object-contain block"
                style={{ maxWidth: "200px" }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span
                className="hidden items-center gap-1.5 font-bold text-sm text-primary"
                style={{ display: "none" }}
              >
                <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 text-xs font-black">
                  V
                </span>
                VEDANSH
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                activeProps={{ className: "!text-primary bg-primary/10" }}
                data-ocid={`header.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                  data-ocid="header.profile.link"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAuth}
                  disabled={isLoggingIn}
                  className="hidden md:flex items-center gap-1"
                  data-ocid="header.logout.button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="hidden md:flex items-center gap-1 font-semibold"
                data-ocid="header.login.button"
              >
                <LogIn className="h-4 w-4" />
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="header.menu.toggle"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid={`header.mobile.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setMenuOpen(false)}
                data-ocid="header.mobile.profile.link"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            )}
            <div className="pt-2 border-t border-border">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    handleAuth();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  data-ocid="header.mobile.logout.button"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleAuth();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                  data-ocid="header.mobile.login.button"
                >
                  <User className="h-4 w-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
