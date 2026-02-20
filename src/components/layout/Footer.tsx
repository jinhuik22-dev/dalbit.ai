import Link from "next/link";

const NAV_LINKS = [
  { href: "/product", label: "Platform" },
  { href: "/services", label: "Studio" },
  { href: "/#pricing", label: "Plans" },
  { href: "/about", label: "Journal" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-muted" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              BETWEEN
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Portfolio first. Built BETWEEN cultures.
            </p>
          </div>

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

        <div className="mt-14 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} BETWEEN by dalbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
