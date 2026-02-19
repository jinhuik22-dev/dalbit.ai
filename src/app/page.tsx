import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Dalbit | Cultural Intelligence Platform",
  description:
    "Dalbit helps teams run cross-border creative work with better context and fewer revisions.",
};

const PRODUCT_PILLARS = [
  {
    title: "Cultural AI Workspace",
    description:
      "Draft localized briefs, adapt tone by market, and catch cultural risks early.",
  },
  {
    title: "Global Talent Matching",
    description:
      "Find creators and partners by language, market, niche, and collaboration style.",
  },
  {
    title: "Cross-Border Workflow",
    description:
      "Keep intake, briefs, approvals, and handoff in one clean workflow.",
  },
] as const;

const SERVICE_OFFERS = [
  {
    title: "Starter Setup",
    detail: "Onboarding, positioning, and your first campaign setup.",
  },
  {
    title: "Growth Sprints",
    detail: "Monthly optimization for messaging, channels, and creators.",
  },
  {
    title: "Partner Team",
    detail: "Dedicated support for teams running high-volume global campaigns.",
  },
] as const;

const PRICING = [
  {
    name: "Starter",
    price: "$49",
    cadence: "/month",
    description: "For solo creators and small teams testing global demand.",
    features: ["AI localization prompts", "Basic matching filters", "Email support"],
    cta: "Choose Starter",
    href: "/start",
    featured: false,
  },
  {
    name: "Pro",
    price: "$149",
    cadence: "/month",
    description: "For brands and agencies running recurring global campaigns.",
    features: ["Advanced cultural checks", "Collaboration workflows", "Priority support"],
    cta: "Choose Pro",
    href: "/start",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    description: "For teams that need custom integrations and dedicated operations.",
    features: ["Dedicated success manager", "Custom integrations", "SLA + team onboarding"],
    cta: "Contact sales",
    href: "/investors",
    featured: false,
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70 bg-background">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-20 md:grid-cols-[1.2fr_1fr] md:pt-24">
          <ScrollReveal>
            <div>
              <Badge variant="outline" className="mb-5">
                For creators, brands, and agencies
              </Badge>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-[3.4rem] md:leading-[1.04]">
                Run global campaigns with context.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Dalbit helps teams launch across markets with fewer misfires and faster approvals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/start" size="lg">
                  Get started
                </Button>
                <Button href="/#pricing" variant="secondary" size="lg">
                  View pricing
                </Button>
              </div>
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
                <div>
                  <p className="text-2xl font-semibold text-foreground">25+</p>
                  <p className="text-muted">Markets mapped</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">3x</p>
                  <p className="text-muted">Faster revision cycles</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">24h</p>
                  <p className="text-muted">Average setup</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Workspace preview
              </p>
              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-muted">Campaign</p>
                  <p className="font-medium text-foreground">US beauty brand x KR creator launch</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-muted">Cultural risk check</p>
                  <p className="font-medium text-foreground">2 tone mismatches flagged before publishing</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-3">
                  <p className="text-muted">Workflow status</p>
                  <p className="font-medium text-foreground">Brief aligned, creator matched, assets in review</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted">Platform</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Core product for cross-border work
              </h2>
            </div>
            <Button href="/product" variant="ghost">
              See product
            </Button>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCT_PILLARS.map((item, idx) => (
            <ScrollReveal key={item.title} delay={idx * 90}>
              <article className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-warm-100/55">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
              <p className="text-sm font-medium text-muted">Services</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Services for execution
              </h2>
            </div>
            <Button href="/services" variant="ghost">
              See services
            </Button>
            </div>
          </ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {SERVICE_OFFERS.map((offer, idx) => (
              <ScrollReveal key={offer.title} delay={idx * 90}>
                <article className="h-full rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-lg font-semibold text-foreground">{offer.title}</h3>
                  <p className="mt-2 text-sm text-muted">{offer.detail}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-muted">Pricing</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Simple pricing
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING.map((plan, idx) => (
            <ScrollReveal key={plan.name} delay={idx * 90}>
              <article
                className={`flex h-full flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                  {plan.price}
                  <span className="ml-1 text-base font-normal text-muted">{plan.cadence}</span>
                </p>
                <p className="mt-3 text-sm text-muted">{plan.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button href={plan.href} className="mt-7 w-full" variant={plan.featured ? "primary" : "secondary"}>
                  {plan.cta}
                </Button>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Start with Dalbit
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Complete a short intake and get the right plan for your market goals.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/start" size="lg">
                Start now
              </Button>
              <Button href="/about" variant="ghost" size="lg">
                Read our story
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
