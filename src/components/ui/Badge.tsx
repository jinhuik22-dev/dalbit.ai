import { ReactNode } from "react";

type Variant = "default" | "accent" | "outline" | "success" | "muted";

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-warm-200 text-warm-700 border border-warm-300",
  accent: "bg-accent/10 text-accent border border-accent/20",
  outline: "bg-transparent text-foreground border border-border",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  muted: "bg-warm-100 text-muted border border-warm-200",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-snug ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
