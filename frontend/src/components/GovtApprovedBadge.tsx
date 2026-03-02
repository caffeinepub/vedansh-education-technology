import { CheckCircle } from 'lucide-react';

interface GovtApprovedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function GovtApprovedBadge({ size = 'sm' }: GovtApprovedBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  };
  const iconSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <span className={`inline-flex items-center ${sizeClasses[size]} bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full font-semibold`}>
      <CheckCircle className={iconSizes[size]} />
      Govt. Approved
    </span>
  );
}
