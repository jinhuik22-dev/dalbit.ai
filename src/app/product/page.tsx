import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { H1, H2 } from "@/components/ui/Heading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Dalbit is built for cross-border creative work. Cultural intelligence, premium profiles, and collaboration workflows — all in one platform.",
};

/* ---------- Data ---------- */

const pillars = [
  {
    badge: "Intelligence",
    title: "Cultural Intelligence",
    description:
      "Context-aware rewriting, cultural alignment checks, and tone adaptation across languages. Dalbit doesn\u2019t just translate your words \u2014 it helps you understand what they mean in a different context.",
    details: [
      "Surface cultural nuance before it becomes a problem",
      "Tone and register adaptation for different markets",
      "Alignment checks that catch what spellcheck never will",
      "Contextual rewrites that preserve intent, not just grammar",
    ],
  },
  {
    badge: "Profiles",
    title: "Premium Profiles",
    description:
      "Signal over noise. Verified creative profiles enriched with cultural context, language capabilities, and collaboration preferences \u2014 so you can evaluate fit before the first call.",
    details: [
      "Verified identity and creative portfolio",
      "Language fluency levels and cultural background",
      "Collaboration style and timezone preferences",
      "Past project context and client compatibility signals",
    ],
  },
  {
    badge: "Workflow",
    title: "Collaboration Workflow",
    description:
      "Structured briefs, intelligent matching, and async messaging designed for timezone and cultural differences. Every step of the project accounts for the realities of global work.",
    details: [
      "Brief templates that capture cultural context upfront",
      "Intelligent matching based on language, culture, and style",
      "Async messaging with built-in tone guidance",
      "Milestone tracking that respects different working norms",
    ],
  },
];

const timeline = [
  {
    label: "Today",
    title: "Intake + cultural intelligence diagnostics",
    description:
      "A conversational onboarding that maps your cultural context, creative identity, and collaboration goals. You walk away with a clear profile and initial intelligence insights.",
  },
  {
    label: "Next",
    title: "Premium directory + collaboration tools",
    description:
      "A searchable network of verified creators and brands, enriched with cultural metadata. Structured briefs, project workflows, and messaging \u2014 all in one place.",
  },
  {
    label: "Future",
    title: "AI-powered cultural alignment engine + marketplace",
    description:
      "Predictive matching that learns from successful collaborations. A marketplace where cultural intelligence is built into every transaction, not bolted on after the fact.",
  },
];

/* ---------- Page ---------- */

export default function ProductPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <ScrollReveal delay={0}>
              <Badge variant="accent" className="mb-6">
                Product
              </Badge>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <H1 className="mb-6">Built for cross-border creative work</H1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                Dalbit is the cultural intelligence layer that sits beneath every
                global collaboration. We combine verified profiles, structured
                workflows, and contextual insight so creative teams can do their
                best work across languages and markets.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <Button href="/start" size="lg">
                Start the Intake
              </Button>
            </ScrollReveal>
          </div>
        </div>

        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(225,6,0,0.06), transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-px"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(10,10,10,0.08) 50%, transparent)",
          }}
        />
      </section>

      {/* ─── Three Pillars ─── */}
      <Section id="pillars">
        <ScrollReveal>
          <SectionHeader
            title="Three pillars, one platform"
            subtitle="Each layer reinforces the others. Together, they give every collaboration a foundation of shared understanding."
          />
        </ScrollReveal>
        <div className="space-y-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={index * 100}>
              <Card className="p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                  {/* Left: text content */}
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <CardHeader>
                      <Badge variant="accent" className="mb-3">
                        {pillar.badge}
                      </Badge>
                      <CardTitle className="text-2xl md:text-3xl">
                        {pillar.title}
                      </CardTitle>
                    </CardHeader>
                    <CardDescription className="text-base leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                  </div>

                  {/* Right: detail list */}
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <ul className="space-y-4">
                      {pillar.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ─── Product Story Timeline ─── */}
      <Section id="roadmap" className="gradient-section">
        <ScrollReveal>
          <SectionHeader
            title="Where we&rsquo;re going"
            subtitle="Dalbit is being built in public, one thoughtful layer at a time."
          />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 top-2 bottom-2 w-px bg-border"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {timeline.map((point, index) => (
                <ScrollReveal key={point.label} delay={index * 150}>
                  <div className="relative pl-12">
                    {/* Dot */}
                    <div
                      className={[
                        "absolute left-0 top-1 h-8 w-8 rounded-full border-2 flex items-center justify-center",
                        index === 0
                          ? "border-accent bg-accent/10"
                          : "border-border bg-card",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-2.5 w-2.5 rounded-full",
                          index === 0 ? "bg-accent" : "bg-warm-400",
                        ].join(" ")}
                      />
                    </div>

                    {/* Content */}
                    <Badge
                      variant={index === 0 ? "accent" : "muted"}
                      className="mb-2"
                    >
                      {point.label}
                    </Badge>
                    <h3 className="font-serif text-xl font-semibold text-foreground tracking-tight mb-2">
                      {point.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden border-t border-border/50">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(225,6,0,0.03) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <H2 className="mb-4">See it for yourself</H2>
              <p className="text-muted text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                The intake takes a few minutes. You&apos;ll walk away with a clear
                picture of your cultural context and how Dalbit can help.
              </p>
              <Button href="/start" size="lg">
                Start the Intake
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
