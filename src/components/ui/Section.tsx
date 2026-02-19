import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
      {subtitle && (
        <p className="text-muted text-lg md:text-xl max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
