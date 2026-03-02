import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'vedansh-education');

  return (
    <footer className="bg-vedansh-navy text-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/vedansh-logo.dim_256x256.png"
                alt="Vedansh Logo"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <div className="font-baloo font-bold text-lg text-white">Vedansh Education & Technology</div>
                <div className="text-vedansh-orange text-sm font-medium">Seekho, Badho, Chamko</div>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-4 max-w-sm">
              India's #1 AI-Powered Free Education Platform. 100% Free Quality Education Forever for every Indian student.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/nep2020-badge.dim_200x80.png"
                alt="NEP 2020 Compliant"
                className="h-8 object-contain"
              />
              <span className="text-xs text-white/50">NEP 2020 Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { Icon: SiFacebook, href: '#' },
                { Icon: SiX, href: '#' },
                { Icon: SiLinkedin, href: '#' },
                { Icon: SiInstagram, href: '#' },
                { Icon: SiYoutube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-vedansh-orange/30 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/home' },
                { label: 'NCERT Library', to: '/ncert-library' },
                { label: 'Competitive Exams', to: '/competitive-exams' },
                { label: 'Govt Resources', to: '/government-resources' },
                { label: 'About Us', to: '/about' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/60 hover:text-vedansh-orange text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Founder */}
          <div>
            <h4 className="font-semibold text-white mb-4">About Founder</h4>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/generated/founder-avatar.dim_256x256.png"
                alt="Mrityunjay Pandey"
                className="w-12 h-12 rounded-full object-cover border-2 border-vedansh-orange"
              />
              <div>
                <div className="text-white font-medium text-sm">Mrityunjay Pandey</div>
                <div className="text-vedansh-orange text-xs">BTech CSE | Founder & CEO</div>
              </div>
            </div>
            <p className="text-white/50 text-xs">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/50 text-xs text-center sm:text-left">
            © {year} Vedansh Education & Technology | Founded by Mrityunjay Pandey | BTech CSE | 100% Free Education Forever
          </div>
          <div className="flex items-center gap-1 text-white/50 text-xs">
            Built with <Heart className="w-3 h-3 text-vedansh-orange fill-vedansh-orange mx-0.5" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vedansh-orange hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
