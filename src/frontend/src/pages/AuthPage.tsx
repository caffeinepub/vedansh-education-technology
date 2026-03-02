import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AuthPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();

  const isLoggingIn = loginStatus === "logging-in";
  const isAuthenticated = !!identity;

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl shadow-md border border-border bg-white px-4 py-2 flex items-center justify-center">
              <img
                src="/assets/c7ffc892c_logo.png"
                alt="Vedansh Education & Technology"
                className="h-14 w-auto object-contain"
                style={{ maxWidth: "280px" }}
              />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to continue your learning journey
              </p>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 bg-success/10 border border-success/20 rounded-lg px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="text-sm text-success font-medium">
              Secured by Internet Identity
            </span>
          </div>

          {/* Login button */}
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Login with Internet Identity
              </>
            )}
          </Button>

          {/* Info */}
          <p className="text-xs text-center text-muted-foreground">
            By logging in, you agree to our terms of service. Your identity is
            secured and private.
          </p>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          New to Vedansh?{" "}
          <span className="text-primary font-medium">
            Login to create your free account automatically.
          </span>
        </p>
      </div>
    </div>
  );
}
