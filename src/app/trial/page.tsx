import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "BETWEEN Trial",
  description:
    "A curated collaboration experience for multilingual creators and artists.",
};

const FIXES = [
  {
    title: "Misalignment",
    body: "BETWEEN replaces random outreach with structured cultural profiles. Matches are based on language compatibility, creative themes, market focus, and cultural context.",
    close: "You’re not just visible. You’re aligned.",
  },
  {
    title: "Lost Meaning",
    body: "Translation converts words. BETWEEN preserves intent and creative voice across languages.",
    close: "Creative expression is contextual.",
  },
  {
    title: "Collaboration Chaos",
    body: "Social platforms reward noise. BETWEEN filters for intention—no cold DM spray, no algorithm chasing.",
    close: "Curated collaboration, not content noise.",
  },
  {
    title: "Unclear Global Growth",
    body: "BETWEEN brings structure to expansion—market direction, positioning guidance, and professional communication across cultures.",
    close: "",
  },
] as const;

const STEPS = [
  "Tell us about your work",
  "We align you with a path",
  "You get access to BETWEEN trial tools",
] as const;

export default function TrialPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            BETWEEN Trial
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
            A curated collaboration experience for multilingual creators and artists.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          What BETWEEN Fixes
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          Global creative collaboration sounds exciting. In reality, it’s messy. BETWEEN removes the friction that kills cross-border partnerships.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {FIXES.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card p-6 md:p-7">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{item.body}</p>
              {item.close ? <p className="mt-3 text-sm font-semibold text-accent md:text-base">{item.close}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            How the Trial Works
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, idx) => (
              <article key={step} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-3xl font-semibold text-accent">{idx + 1}</p>
                <p className="mt-3 text-base font-medium text-foreground">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-10">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Start your BETWEEN Trial
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <Button href="/start" size="lg">
              Get Started
            </Button>
            <Link
              href="/trial"
              className="text-base font-medium text-accent transition-all duration-300 ease-in-out hover:text-accent-hover"
            >
              Explore BETWEEN
            </Link>
          </div>
          <div className="mt-8">
            <Button href="/start" variant="secondary">
              Begin Trial Intake
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
