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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Dalbit.ai is a Cultural Intelligence &amp; Creative Collaboration Platform transforming how global creators, brands, and multilingual professionals connect, strategize, and grow. Built to bridge the gap between technology, language, and business, Dalbit.ai delivers an AI-powered, all-in-one ecosystem that helps artists, influencers, and small-to-mid-sized businesses align across cultures, expand into new markets, and build high-quality B2B partnerships. Dalbit&apos;s integrated platform combines intelligent onboarding diagnostics, multilingual content optimization, brand positioning strategy, curated partnership matchmaking, revenue modeling tools, and performance analytics into one seamless web-based experience. Instead of navigating fragmented agencies, disconnected social platforms, and generic AI tools, users operate within a unified system designed for cultural precision, strategic clarity, and monetization. By blending AI with human cultural insight, Dalbit.ai enables creators and brands to collaborate with intention, communicate across borders effectively, and scale sustainable global growth.
            </p>
            <Link href="/about" className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover">
              Learn about Dalbit
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h4>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              What does Dalbit fix? We reduce cross-cultural project friction with better briefs, stronger matching, and clearer collaboration workflows.
            </p>
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
