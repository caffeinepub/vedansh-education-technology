import { Link, useRouterState } from '@tanstack/react-router';
import { Home, BookOpen, Cpu, Heart, User } from 'lucide-react';

const tabs = [
  { label: 'Home', icon: Home, to: '/dashboard' },
  { label: 'Study', icon: BookOpen, to: '/academic' },
  { label: 'AI Tools', icon: Cpu, to: '/ai-tools' },
  { label: 'Wellness', icon: Heart, to: '/wellness' },
  { label: 'Profile', icon: User, to: '/dashboard' },
];

export default function BottomNavBar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-vedansh-navy border-t border-white/10 shadow-navy">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.to || (tab.to !== '/dashboard' && currentPath.startsWith(tab.to));
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? 'text-vedansh-orange'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all duration-200 ${isActive ? 'bg-vedansh-orange/20' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
