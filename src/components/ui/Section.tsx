import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-6 ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div
      className={`mb-12 md:mb-16 ${alignment} ${
        align === "center" ? "max-w-2xl mx-auto" : ""
      } ${className}`}
    >
      <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-lg md:text-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
