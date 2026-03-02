import { Link } from "@tanstack/react-router";
import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  const appId = encodeURIComponent(
    window.location.hostname || "vedansh-education",
  );

  return (
    <footer className="bg-background border-t border-border py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg border border-border bg-white px-3 py-1 flex items-center justify-center">
                <img
                  src="/assets/generated/vedansh-logo-wide.dim_480x160.png"
                  alt="Vedansh Education & Technology"
                  className="h-8 w-auto object-contain"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Free education for every Indian student. Empowering futures
              through technology.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/landing"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/auth"
                  className="hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/ncert"
                  className="hover:text-primary transition-colors"
                >
                  NCERT Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/competitive"
                  className="hover:text-primary transition-colors"
                >
                  Competitive Exams
                </Link>
              </li>
              <li>
                <Link
                  to="/placement"
                  className="hover:text-primary transition-colors"
                >
                  Placement Prep
                </Link>
              </li>
              <li>
                <Link
                  to="/govt-resources"
                  className="hover:text-primary transition-colors"
                >
                  Govt Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/wellness"
                  className="hover:text-primary transition-colors"
                >
                  Wellness Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Vedansh Education & Technology. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="h-4 w-4 text-destructive fill-destructive" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
