import { ShieldCheck } from "lucide-react";

interface GovtApprovedBadgeProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GovtApprovedBadge({
  size = "md",
  className = "",
}: GovtApprovedBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-success/10 text-success font-medium border border-success/30 ${sizeClasses[size]} ${className}`}
    >
      <ShieldCheck className={iconSizes[size]} />
      Govt. Approved
    </span>
  );
}
