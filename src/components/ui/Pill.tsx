"use client";

interface PillProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Pill({
  label,
  selected = false,
  onClick,
  className = "",
}: PillProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onClick}
      className={[
        "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium",
        "border transition-all duration-200 ease-in-out cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        selected
          ? "bg-foreground text-white border-foreground"
          : "bg-surface text-foreground border-border hover:border-warm-400 hover:bg-warm-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}
