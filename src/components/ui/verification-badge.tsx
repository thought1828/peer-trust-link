import { cn } from "@/lib/utils";
import { CheckCircle, Star, Shield } from "lucide-react";

interface VerificationBadgeProps {
  type: "student" | "mentor" | "verified" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VerificationBadge({ type, size = "md", className }: VerificationBadgeProps) {
  const sizes = {
    sm: "h-4 w-4 text-xs",
    md: "h-5 w-5 text-sm",
    lg: "h-6 w-6 text-base"
  };

  const variants = {
    student: {
      icon: CheckCircle,
      className: "bg-campus-blue text-white",
      label: "Verified Student"
    },
    mentor: {
      icon: Shield,
      className: "bg-campus-green text-white",
      label: "Verified Mentor"
    },
    verified: {
      icon: CheckCircle,
      className: "bg-primary text-primary-foreground",
      label: "Verified"
    },
    gold: {
      icon: Star,
      className: "bg-verification-gold text-white",
      label: "Gold Mentor"
    }
  };

  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium",
        sizes[size],
        variant.className,
        className
      )}
    >
      <Icon className={sizes[size].split(' ')[0] + ' ' + sizes[size].split(' ')[1]} />
      <span className="hidden sm:inline">{variant.label}</span>
    </div>
  );
}