import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/investors", label: "Investors" },
  { href: "/about", label: "About" },
] as const;

export function Footer() {
  return (
    <footer className="relative bg-warm-900 text-warm-300" role="contentinfo">
      {/* Soft gradient transition from page content */}
      <div
        className="absolute -top-px left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--color-warm-900) 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Column 1: Logo + Tagline */}
          <div>
            <Link
              href="/"
              className="font-serif text-xl font-bold text-white transition-colors hover:text-accent"
            >
              Dalbit
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-400">
              Cultural intelligence for the global creative economy.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-500">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-warm-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-warm-500">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@dalbit.ai"
                  className="text-sm text-warm-400 transition-colors hover:text-white"
                >
                  hello@dalbit.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 border-t border-warm-800 pt-8 text-center">
          <p className="text-xs text-warm-500">
            &copy; {new Date().getFullYear()} Dalbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
