import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "dalbit.ai | Create across borders",
  description:
    "Cultural intelligence for creators, brands, and agencies working globally.",
};

const ROLE_OPTIONS = ["Creator", "Brand", "Agency", "Investor", "Other"] as const;

const FEATURES = [
  {
    title: "Intelligence",
    heading: "Understand culture,\nnot just language.",
    body: "Context-aware insights that catch what translation misses.",
  },
  {
    title: "Profiles",
    heading: "Find the right people.\nFaster.",
    body: "Verified creatives with cultural context built in.",
  },
  {
    title: "Workflow",
    heading: "Work together.\nAcross anything.",
    body: "Briefs, matching, and messaging built for global teams.",
  },
] as const;

const STEPS = [
  {
    number: "1",
    title: "Tell us about you",
    body: "A quick conversation that maps your identity, culture, and goals.",
  },
  {
    number: "2",
    title: "Get matched",
    body: "See collaborators who fit — culturally, not just by keyword.",
  },
  {
    number: "3",
    title: "Start creating",
    body: "Every touchpoint accounts for language, timezone, and context.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-[minmax(0,1fr)_360px] md:items-start md:py-24 lg:gap-16">
          <div className="md:pr-4">
            <h1 className="max-w-4xl font-serif text-4xl font-semibold tracking-tight text-foreground md:text-[2.65rem] md:leading-[1.1] lg:text-5xl">
              <span className="block lg:whitespace-nowrap">Culture. Language. Expression.</span>
              <br />
              <span className="text-accent">Connect with linguistic precision and cultural alignment</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
              Dalbit helps multilingual artists, creators to collaborate and grow across globally
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button href="/start" size="lg">
                Get Started
              </Button>
              <Link
                href="/#solutions"
                className="text-lg font-medium text-muted transition-all duration-300 ease-in-out hover:text-foreground"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="w-full rounded-2xl border border-border bg-card p-6 md:ml-auto md:max-w-[360px] md:p-7">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <span className="text-sm font-bold text-white">D</span>
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3">
                <p className="text-sm leading-relaxed text-foreground">
                  Welcome to Dalbit. What best describes your role?
                </p>
              </div>
            </div>
            <div className="mt-5 ml-11 flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((role) => (
                <Link
                  key={role}
                  href={`/start?role=${encodeURIComponent(role)}`}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 ease-in-out hover:border-accent hover:text-accent"
                >
                  {role}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-serve" className="border-b border-border bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">Who are we?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Dalbit.ai is a cultural intelligence and creative collaboration platform.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              We help creators, brands, and agencies align across language and culture so global partnerships can grow with clarity.
            </p>
            <Link href="/about" className="mt-6 inline-block text-sm font-semibold text-accent hover:text-accent-hover">
              Learn about Dalbit
            </Link>
          </div>
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-medium text-accent">{feature.title}</p>
              <h2 className="mt-3 whitespace-pre-line text-2xl font-semibold tracking-tight text-foreground">
                {feature.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Three steps. Two minutes.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.number} className="rounded-2xl border border-border bg-card p-6">
                <p className="text-3xl font-semibold text-accent">{step.number}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="rounded-2xl border border-border bg-card p-8 text-center md:p-10">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Ready to go global?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
            Join creators and brands already building across borders.
          </p>
          <div className="mt-8">
            <Button href="/start" size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
