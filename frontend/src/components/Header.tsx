import { Link, useRouter } from '@tanstack/react-router';
import { Bell, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        if (error instanceof Error && error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { label: 'Home', to: '/home' },
    { label: 'NCERT Library', to: '/ncert-library' },
    { label: 'Competitive Exams', to: '/competitive-exams' },
    { label: 'Govt Resources', to: '/government-resources' },
    { label: 'About', to: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-vedansh-navy/95 backdrop-blur-md border-b border-white/10 shadow-navy">
      <div className="page-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group">
            <img
              src="/assets/generated/vedansh-logo.dim_256x256.png"
              alt="Vedansh Logo"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <div className="hidden sm:block">
              <div className="text-white font-baloo font-bold text-sm leading-tight">Vedansh</div>
              <div className="text-vedansh-orange text-xs font-medium leading-tight">Education & Technology</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white/80 hover:text-vedansh-orange px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            {isAuthenticated && (
              <Link to="/dashboard" className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-vedansh-orange rounded-full"></span>
              </Link>
            )}

            {/* Auth Button */}
            <Button
              onClick={handleAuth}
              disabled={loginStatus === 'logging-in'}
              size="sm"
              className={isAuthenticated
                ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                : 'bg-vedansh-orange hover:bg-orange-600 text-white'
              }
            >
              {loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login'}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-3 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block text-white/80 hover:text-vedansh-orange px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
