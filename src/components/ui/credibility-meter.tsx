import { cn } from "@/lib/utils";

interface CredibilityMeterProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function CredibilityMeter({ score, size = "md", showLabel = true, className }: CredibilityMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-campus-green";
    if (score >= 60) return "bg-verification-gold";
    if (score >= 40) return "bg-warning-orange";
    return "bg-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const sizes = {
    sm: "h-2 text-xs",
    md: "h-3 text-sm",
    lg: "h-4 text-base"
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className={cn("font-medium text-foreground", sizes[size].split(' ')[1])}>
          Credibility Score
        </span>
        {showLabel && (
          <span className={cn("font-bold", sizes[size].split(' ')[1])}>
            {score}% · {getScoreLabel(score)}
          </span>
        )}
      </div>
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", sizes[size].split(' ')[0])}>
        <div
          className={cn(
            "h-full transition-all duration-700 ease-out rounded-full",
            getScoreColor(score)
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}