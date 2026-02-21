import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "dalbit.ai | Culture. Language. Strategy.",
  description:
    "We help multilingual creators and artists collaborate confidently across global markets.",
};

const SOLUTIONS = [
  {
    title: "Cross-cultural project matching",
    description: "Find collaborators based on portfolio fit, language, and market context.",
  },
  {
    title: "Localized collaboration setup",
    description: "Start projects with clear briefs designed for multilingual creative teams.",
  },
  {
    title: "Portfolio-first selection",
    description: "Evaluate work quality first, without vanity metrics in the decision flow.",
  },
] as const;

const AUDIENCES = [
  {
    title: "Creators",
    description: "Connect with global teams that value your craft and cultural perspective.",
  },
  {
    title: "Artists",
    description: "Collaborate across markets with better language alignment from day one.",
  },
  {
    title: "Studios",
    description: "Build multilingual teams quickly for cross-border creative execution.",
  },
  {
    title: "Brands",
    description: "Launch campaigns with collaborators who understand local nuance.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_58%,#f6e6be_100%)]">
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center md:py-28">
          <h1 className="mx-auto max-w-4xl font-serif text-5xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
            Culture. Language. Strategy.
          </h1>
          <p className="mx-auto mt-8 max-w-[600px] text-lg leading-relaxed text-muted md:text-xl">
            We help multilingual creators and artists collaborate confidently across global markets.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Button href="/start" size="lg">
              Get Started
            </Button>
            <Link
              href="/trial"
              className="text-lg font-semibold text-accent transition-all duration-300 ease-in-out hover:scale-[1.03] hover:text-accent-hover md:text-xl"
            >
              Start BETWEEN Trial
            </Link>
          </div>
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-24">
        <div className="mb-10 md:mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">Solutions</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Built for cross-cultural collaboration
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {SOLUTIONS.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-in-out hover:border-accent/70 hover:bg-card/90">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="who-we-serve" className="border-y border-border bg-transparent scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mb-10 md:mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">Who We Serve</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              One platform for modern creative teams
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-in-out hover:border-accent/70 hover:bg-card/90">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">BETWEEN</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Try BETWEEN with your next collaboration
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Run a focused trial flow to match, align, and start conversations faster.
          </p>
          <div className="mt-6">
            <Button href="/trial" variant="secondary">
              Start BETWEEN Trial
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-transparent">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Ready to start your next cross-cultural project?
            </h2>
            <Button href="/start">Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
