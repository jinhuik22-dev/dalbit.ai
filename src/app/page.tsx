import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Between by Dalbit | Portfolio First",
  description:
    "Between by Dalbit is a portfolio-first platform for cross-cultural matching: intake, premium profile, match, and chat.",
};

const GALLERY_NOTES = [
  {
    label: "Visual Direction",
    title: "Portfolio pages before profiles",
    description: "Work samples lead. Social proof follows later, not first.",
  },
  {
    label: "Cultural Layer",
    title: "Built between markets",
    description: "Creators are presented with context for language and market fit.",
  },
  {
    label: "Trial Rule",
    title: "No vanity metrics",
    description: "Follower and like counts stay hidden in trial mode.",
  },
] as const;

const FLOW = [
  {
    step: "Intake",
    description:
      "Share project intent, references, and the cultural markets you want to bridge.",
    href: "/start",
    cta: "Begin Intake",
  },
  {
    step: "Premium Profile",
    description:
      "We shape a clear, editorial profile around portfolio quality, craft, and direction.",
    href: "/product",
    cta: "View Platform",
  },
  {
    step: "Match",
    description:
      "Matches are made by portfolio relevance and cross-cultural fit, not popularity rank.",
    href: "/services",
    cta: "See Studio",
  },
  {
    step: "Chat",
    description:
      "Start direct conversations in trial mode to align voice, references, and scope quickly.",
    href: "/trial",
    cta: "Open Trial",
  },
] as const;

const PLANS = [
  {
    name: "Trial Mode",
    description: "Portfolio-first exploration with vanity metrics hidden by default.",
    cta: "Start Trial",
    href: "/trial",
  },
  {
    name: "Curated Match",
    description: "Guided matching for teams that need higher signal in early conversations.",
    cta: "Start Intake",
    href: "/start",
  },
  {
    name: "Studio Support",
    description: "Operational support for teams running ongoing cross-cultural projects.",
    cta: "See Services",
    href: "/services",
  },
] as const;

export default function HomePage() {
  return (
    <div className="gradient-hero">
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-28">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Between by Dalbit</p>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-7xl">
              Portfolio First.
              <br />
              Built Between Cultures.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              Between is a gallery-like matching experience for creative work across cultures. Intake to premium profile to match to chat, with portfolio quality as the lead signal.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/start" size="lg">
                Start Intake
              </Button>
              <Button href="/trial" variant="ghost" size="lg">
                Open Trial Mode
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <ScrollReveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">Editorial Notes</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                A minimal gallery for serious creative matching
              </h2>
            </div>
            <Button href="/product" variant="ghost">
              Explore Platform
            </Button>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {GALLERY_NOTES.map((item, idx) => (
            <ScrollReveal key={item.title} delay={idx * 80}>
              <article className="h-full rounded-2xl border border-border bg-card p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{item.label}</p>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-background/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">MVP Flow</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Intake to chat, without popularity bias
                </h2>
              </div>
              <Button href="/services" variant="ghost">
                See Services
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid gap-4 md:grid-cols-2">
            {FLOW.map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 80}>
                <article className="h-full rounded-2xl border border-border bg-background p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">Step {String(idx + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{item.step}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  <Button href={item.href} variant="ghost" size="sm" className="mt-5">
                    {item.cta}
                  </Button>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
        <ScrollReveal>
          <div className="mb-10 text-left md:max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">Plans</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Choose how you enter Between
            </h2>
            <p className="mt-4 text-muted">
              Every plan keeps portfolio review at the center. Trial mode keeps vanity metrics out of view.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <ScrollReveal key={plan.name} delay={idx * 80}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-3 text-sm text-muted">{plan.description}</p>
                <Button href={plan.href} className="mt-7 w-full" variant={idx === 1 ? "primary" : "secondary"}>
                  {plan.cta}
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-transparent">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Start with Between
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Share your intake and we shape your profile around the work itself, not the audience size behind it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/start" size="lg">
                Begin Intake
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                Read Journal
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
