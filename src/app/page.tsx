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
import { H1, H2, H4 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Dalbit \u2014 Cultural Intelligence for Global Creators",
  description:
    "Dalbit is a cultural intelligence layer and premium network for cross-border creative work. We help creators, brands, and agencies collaborate globally without cultural misfires.",
};

/* ---------- Data ---------- */

const problems = [
  {
    title: "Cultural misfires",
    description:
      "Projects don\u2019t fail because the work is bad. They fail because meaning gets lost between languages, norms, and expectations \u2014 and nobody notices until the damage is done.",
  },
  {
    title: "Fragmented tools",
    description:
      "There is no single platform designed for cross-border creative work. Teams stitch together translators, project tools, and spreadsheets \u2014 and still lose context.",
  },
  {
    title: "Trust deficit",
    description:
      "Global clients and creators lack reliable signals to evaluate each other. Portfolios don\u2019t capture cultural fluency, and referrals don\u2019t cross borders well.",
  },
];

const solutions = [
  {
    badge: "Intelligence",
    title: "Cultural Intelligence",
    description:
      "Context-aware insights that surface cultural nuance before it becomes a problem. Not translation \u2014 understanding.",
  },
  {
    badge: "Profiles",
    title: "Premium Profiles",
    description:
      "Verified creative profiles enriched with cultural context, language capabilities, and collaboration preferences. Signal over noise.",
  },
  {
    badge: "Workflow",
    title: "Collaboration Workflow",
    description:
      "Structured briefs, intelligent matching, and async messaging designed for timezone and cultural differences.",
  },
];

const steps = [
  {
    number: "01",
    title: "Complete the intake",
    description:
      "A short, conversational onboarding that maps your identity, culture, and goals. No forms \u2014 just a guided conversation that helps us understand who you are and what you need.",
  },
  {
    number: "02",
    title: "Get matched",
    description:
      "Our system surfaces relevant collaborators, adjusted for cultural context. You see people who actually fit \u2014 not just people who match a keyword.",
  },
  {
    number: "03",
    title: "Collaborate with clarity",
    description:
      "Briefs, messaging, and workflows designed to reduce friction. Every touchpoint accounts for language, timezone, and cultural expectations.",
  },
];

const useCases = [
  {
    audience: "For Creators",
    points: [
      "Access global clients who value your cultural perspective",
      "Receive briefs that are clear, respectful, and well-structured",
      "Fewer misunderstandings, fewer revision cycles",
    ],
  },
  {
    audience: "For Brands",
    points: [
      "Find talent that fits the culture, not just the brief",
      "Faster approvals through better-aligned creative direction",
      "Reduce costly miscommunication across markets",
    ],
  },
  {
    audience: "For Agencies",
    points: [
      "Standardize cross-border communications with a shared framework",
      "Reduce revision cycles caused by cultural gaps",
      "Scale international projects without scaling headcount",
    ],
  },
];

const logos = [
  "Tidal Studio",
  "Mondo Creative",
  "Kinfolk Agency",
  "Seoul Digital",
  "Wayfare Co.",
  "Bridge Collective",
];

/* ---------- Page ---------- */

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-6">
              Cultural Intelligence Platform
            </Badge>
            <H1 className="mb-6">
              Dalbit helps creators, brands, and agencies collaborate globally
              &mdash; without cultural misfires.
            </H1>
            <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              A cultural intelligence layer + premium network for cross-border
              creative work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/start" size="lg">
                Start the Intake
              </Button>
              <Button href="/investors" variant="secondary" size="lg">
                Request Investor Deck
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative radial */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 75% 25%, rgba(180,83,9,0.10), transparent 60%)",
          }}
        />
      </section>

      {/* ─── Problem ─── */}
      <Section id="problem">
        <SectionHeader
          title="The problem is invisible"
          subtitle="Cross-border creative work breaks down in ways that are hard to see and expensive to fix."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item) => (
            <Card key={item.title} hover>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Solution ─── */}
      <Section id="solution" className="gradient-section">
        <SectionHeader
          title="One platform. Three layers of intelligence."
          subtitle="Dalbit combines cultural context, verified profiles, and structured workflows into a single layer that sits beneath every collaboration."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solutions.map((item) => (
            <Card key={item.title} hover>
              <CardHeader>
                <Badge variant="accent" className="mb-3">
                  {item.badge}
                </Badge>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── How it works ─── */}
      <Section id="how-it-works">
        <SectionHeader
          title="How it works"
          subtitle="Three steps from signup to your first collaboration."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="block text-5xl font-bold text-accent/15 font-serif mb-4">
                {step.number}
              </span>
              <H4 className="mb-3">{step.title}</H4>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Use Cases ─── */}
      <Section id="use-cases" className="gradient-section">
        <SectionHeader
          title="Built for every side of the table"
          subtitle="Whether you create the work, commission it, or manage it \u2014 Dalbit gives you shared context."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc) => (
            <Card key={uc.audience} hover>
              <CardHeader>
                <CardTitle>{uc.audience}</CardTitle>
              </CardHeader>
              <ul className="space-y-3 mt-2">
                {uc.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-muted text-sm leading-relaxed"
                  >
                    <span className="text-accent mt-0.5 flex-shrink-0">
                      &bull;
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Social Proof ─── */}
      <Section id="social-proof">
        <SectionHeader title="Trusted by forward-thinking teams" />

        {/* Placeholder logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-16">
          {logos.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center h-16 rounded-xl border border-border bg-card text-muted text-sm font-medium tracking-wide"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Placeholder testimonial */}
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-4">
            &ldquo;Dalbit gave us the cultural layer we didn&rsquo;t know we
            were missing. Our cross-border projects run smoother and our creators
            feel understood.&rdquo;
          </blockquote>
          <p className="text-muted text-sm">
            &mdash; Placeholder, Creative Director at Mondo Creative
          </p>
        </div>
      </Section>

      {/* ─── Final CTA ─── */}
      <Section className="gradient-section border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <H2 className="mb-4">Ready to work without borders?</H2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Start the intake and tell us about your work, your culture, and your
            goals. We&apos;ll take it from there.
          </p>
          <Button href="/start" size="lg">
            Start the Intake
          </Button>
        </div>
      </Section>
    </>
  );
}
