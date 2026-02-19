import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-warm-900 hover:bg-accent-hover active:bg-accent-dark shadow-warm hover:shadow-warm-md hover:-translate-y-0.5",
  secondary:
    "bg-surface text-foreground border border-border hover:border-warm-400 hover:bg-warm-200 active:bg-warm-300 hover:-translate-y-0.5",
  ghost:
    "text-muted hover:text-foreground hover:bg-surface active:bg-warm-200",
  outline:
    "border border-accent text-accent hover:bg-accent hover:text-warm-900 active:bg-accent-dark hover:-translate-y-0.5",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-base gap-2",
  lg: "px-8 py-3.5 text-lg gap-2.5",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isDisabled =
    loading ||
    ("disabled" in props ? (props as ButtonAsButton).disabled : false);

  const classes = [
    "inline-flex items-center justify-center rounded-lg font-medium",
    "transition-all duration-200 ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    if (isDisabled) {
      return (
        <span className={classes} aria-disabled="true">
          {loading && <Spinner />}
          {children}
        </span>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {loading && <Spinner />}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
