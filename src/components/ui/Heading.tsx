import { ReactNode, HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className = "", ...props }: HeadingProps) {
  return (
    <h1
      className={`font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className = "", ...props }: HeadingProps) {
  return (
    <h2
      className={`font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className = "", ...props }: HeadingProps) {
  return (
    <h3
      className={`font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className = "", ...props }: HeadingProps) {
  return (
    <h4
      className={`font-serif text-xl md:text-2xl font-medium text-foreground tracking-tight leading-snug ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}
