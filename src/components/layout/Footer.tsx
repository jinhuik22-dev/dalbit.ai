import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-lg font-bold text-foreground">
              dalbit<span className="text-accent">.</span>ai
            </Link>
            <p className="mt-3 text-sm text-muted max-w-xs">
              AI-powered growth systems for modern brands and creators.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/trial", label: "Trial Tools" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>hello@dalbit.ai</li>
              <li>Book a call &rarr;</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Dalbit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
