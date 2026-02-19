import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI marketing consulting packages for SMBs. From audits to full growth systems and creator partnerships — clear deliverables, measurable results.",
};

const packages = [
  {
    tier: "Starter",
    name: "AI Marketing Audit",
    price: "Starting at $1,500",
    description:
      "A focused deep-dive into your current marketing — with an actionable report and prompt pack to move forward.",
    deliverables: [
      "Website + funnel review",
      "Messaging clarity assessment",
      "Ideal Customer Profile (ICP) definition",
      "Channel-market fit analysis",
      "Action plan with priorities",
      "Custom AI prompt pack for your business",
    ],
    timeline: "1–2 weeks",
    cta: "Book a Discovery Call",
    highlighted: false,
  },
  {
    tier: "Core",
    name: "Growth System Setup",
    price: "Starting at $3,500",
    description:
      "A complete growth system: strategy, implementation support, and the tracking infrastructure to know what's working.",
    deliverables: [
      "Everything in the Audit package",
      "KPI + tracking setup (GA4, dashboards)",
      "Content + channel strategy (4-week plan)",
      "Landing page improvements / wireframes",
      "Ad readiness assessment + campaign structure",
      "Simple reporting dashboard",
      "2 strategy calls + async support",
    ],
    timeline: "3–4 weeks",
    cta: "Book a Discovery Call",
    highlighted: true,
  },
  {
    tier: "Premium",
    name: "Creator Partnership Engine",
    price: "Starting at $5,000",
    description:
      "For SMBs that want creator collaborations as a growth channel — with cultural alignment and matchmaking guidance built in.",
    deliverables: [
      "Everything in the Growth System",
      "Creator matching criteria + shortlist",
      "Outreach templates (multilingual)",
      "Collaboration brief templates",
      "Cultural alignment checks",
      "Partnership tracking framework",
      "4 strategy calls + priority async support",
    ],
    timeline: "4–6 weeks",
    cta: "Request a Quote",
    highlighted: false,
  },
];

const notForList = [
  {
    icon: "⚡",
    text: "Businesses expecting overnight results. Real growth takes time and iteration.",
  },
  {
    icon: "🚫",
    text: "Anyone unwilling to invest time in implementation. We build systems — you have to run them.",
  },
  {
    icon: "🎭",
    text: "Companies interested in unethical marketing: fake reviews, misleading claims, or spam tactics.",
  },
  {
    icon: "💸",
    text: "Businesses with zero budget for marketing. We'll be honest if you're not ready to invest yet.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <Badge variant="accent" className="mb-6">Services</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 max-w-4xl glow-text">
            AI-powered marketing consulting{" "}
            <span className="text-accent">for SMBs ready to grow.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
            Clear deliverables. Measurable outcomes. No fluff. Choose the package
            that fits your stage, or let&apos;s design something custom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#packages" size="lg">
              View Packages
            </Button>
            <Button href="/trial" variant="secondary" size="lg">
              Try Free Tools First
            </Button>
          </div>
        </div>
      </section>

      {/* Packages */}
      <Section id="packages">
        <SectionHeader
          title="Service packages"
          subtitle="Each package builds on the previous one. Start where it makes sense for you."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              hover={false}
              className={`flex flex-col ${
                pkg.highlighted
                  ? "border-accent/40 glow-border relative"
                  : ""
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-6">
                  <Badge variant="accent">Most Popular</Badge>
                </div>
              )}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  {pkg.tier}
                </p>
                <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
              </div>
              <p className="text-2xl font-bold text-accent mb-2">{pkg.price}</p>
              <p className="text-sm text-muted-foreground mb-1">
                Timeline: {pkg.timeline}
              </p>
              <p className="text-muted text-sm leading-relaxed mt-3 mb-6">
                {pkg.description}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-muted">{d}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/services#contact"
                variant={pkg.highlighted ? "primary" : "secondary"}
                className="w-full"
              >
                {pkg.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who It's NOT For */}
      <Section className="border-t border-border/50">
        <SectionHeader
          title="Who this is not for"
          subtitle="We believe in honest alignment. Here's when we'll tell you we're not the right fit."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {notForList.map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-4 p-5 rounded-xl border border-border/50 bg-surface"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <p className="text-muted text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <section id="contact" className="gradient-moonlight border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to talk?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Book a free 30-minute discovery call. We&apos;ll review your current
            situation, identify quick wins, and see if there&apos;s a fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Book a Discovery Call
            </Button>
            <Button variant="outline" size="lg">
              Request a Custom Quote
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            No pressure. No hard sell. Just an honest conversation.
          </p>

          {/* Calendly placeholder */}
          <div className="mt-12 p-8 rounded-2xl border border-border/50 bg-card">
            <p className="text-muted text-sm">
              📅 Calendly embed placeholder — integrate your booking link here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
