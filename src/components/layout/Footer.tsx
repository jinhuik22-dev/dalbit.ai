import Link from "next/link";

const NAV_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background text-muted" role="contentinfo">
      {/* Soft gradient transition from page content */}
      <div
        className="absolute -top-px left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--color-background) 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              Dalbit
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Cultural intelligence for cross-border creative teams.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@dalbit.ai"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  hello@dalbit.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Dalbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
