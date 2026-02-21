import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-muted" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              About
            </h4>
            <Link href="/about" className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover">
              Learn about Dalbit
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <Link href="/services" className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover">
              Explore services
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              BETWEEN
            </h4>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              BETWEEN is our beta experience. It starts with intake, builds a premium profile, matches culturally aligned collaborators, then opens trial conversations.
            </p>
            <Link href="/trial" className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover">
              Start BETWEEN Trial
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8 text-center">
          <a
            href="mailto:hello@dalbit.ai"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            hello@dalbit.ai
          </a>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} BETWEEN by dalbit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
