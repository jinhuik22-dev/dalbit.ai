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
import { H1, H4 } from "@/components/ui/Heading";
import { InvestorForm } from "./InvestorForm";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Dalbit is building the cultural intelligence infrastructure for cross-border creative work. Learn about our market opportunity, business model, and team.",
};

/* ---------- Data ---------- */

const marketStats = [
  {
    figure: "$500B+",
    label: "Creator economy projected market size",
    note: "Goldman Sachs, 2024",
  },
  {
    figure: "70%",
    label: "Of cross-border projects experience cultural friction",
    note: "Illustrative estimate",
  },
  {
    figure: "3\u20135\u00D7",
    label: "More revisions on cross-cultural briefs vs. domestic",
    note: "Illustrative estimate",
  },
];

const whyNowPoints = [
  {
    title: "Cross-border collaborations are rising exponentially",
    description:
      "Brands increasingly source creative talent globally. Remote-first workflows have normalized international teams, but the tooling has not caught up.",
  },
  {
    title: "AI dramatically lowers the cost of cultural intelligence",
    description:
      "Large language models and structured data pipelines make it feasible to capture, model, and surface cultural context at scale for the first time.",
  },
  {
    title: "Premium networks win on trust, not just features",
    description:
      "In creative markets, curation and trust outperform open marketplaces. Dalbit\u2019s intake-first model builds trust from the first interaction.",
  },
];

const wedgeComponents = [
  {
    title: "Intake diagnostics",
    description:
      "A free, gamified onboarding that maps cultural identity, creative preferences, and collaboration style. Delivers immediate value to the user while generating structured data.",
  },
  {
    title: "Cultural intelligence engine",
    description:
      "A growing model that learns from intake data, collaboration patterns, and outcomes to improve matching, brief generation, and conflict prediction.",
  },
  {
    title: "Premium directory",
    description:
      "A curated, searchable network of verified creators, brands, and agencies enriched with cultural context \u2014 the output layer that monetizes the data.",
  },
];

const revenueStreams = [
  {
    title: "Subscription tiers",
    detail: "Freemium \u2192 Pro \u2192 Enterprise",
    description:
      "Free intake and basic profile. Pro unlocks advanced matching, cultural briefs, and analytics. Enterprise adds custom integrations and team management.",
  },
  {
    title: "Marketplace take rate",
    detail: "5\u201315% on facilitated collaborations",
    description:
      "When Dalbit facilitates a match that leads to a paid collaboration, we capture a transparent service fee proportional to project value.",
  },
  {
    title: "Enterprise solutions",
    detail: "Custom cultural intelligence APIs",
    description:
      "Agencies and platforms license our cultural intelligence model to power their own cross-border workflows and talent discovery.",
  },
];

const gtmPhases = [
  {
    phase: "Start niche",
    items: [
      "Bilingual Korean\u2013English creators and agencies",
      "High cultural distance, high collaboration demand",
      "Founder\u2019s domain expertise and network",
    ],
  },
  {
    phase: "Expand",
    items: [
      "Community partnerships with creator collectives",
      "Content-led growth: cultural intelligence insights",
      "Strategic agency partnerships for demand-side pull",
    ],
  },
  {
    phase: "Scale",
    items: [
      "Multi-language and multi-market expansion",
      "Enterprise licensing deals",
      "Platform integrations (Notion, Slack, project tools)",
    ],
  },
];

const tractionMetrics = [
  { value: "\u2014", label: "Intake completions" },
  { value: "\u2014", label: "Waitlist signups" },
  { value: "\u2014", label: "Agency partnerships in pipeline" },
  { value: "\u2014", label: "Countries represented" },
];

const team = [
  {
    name: "[Founder Name]",
    role: "CEO & Co-founder",
    bio: "Background in cross-cultural brand strategy. Previously led international creative programs at [Company]. Bilingual Korean\u2013English.",
  },
  {
    name: "[Co-founder Name]",
    role: "CTO & Co-founder",
    bio: "Full-stack engineer with experience building data platforms and ML pipelines. Previously at [Company]. Passionate about structured cultural data.",
  },
  {
    name: "[Advisor Name]",
    role: "Advisor",
    bio: "Veteran of the creator economy space. Former VP at [Company]. Deep network across agencies and creator collectives in APAC and North America.",
  },
];

/* ---------- Page ---------- */

export default function InvestorsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-6">
              For Investors
            </Badge>
            <H1 className="mb-6">
              The infrastructure layer for cross-border creative work
            </H1>
            <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Dalbit is building the cultural intelligence platform that enables
              global creators, brands, and agencies to collaborate
              effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#deck-form" size="lg">
                Request Investor Deck
              </Button>
              <Button href="#" variant="secondary" size="lg">
                Download One-Pager
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
          title="The problem"
          subtitle="The global creator economy is projected to exceed $500B, yet cross-border collaborations suffer from three compounding frictions: cultural misalignment, language barriers, and fragmented execution tools."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketStats.map((stat) => (
            <Card key={stat.figure}>
              <div className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-semibold text-accent mb-2">
                  {stat.figure}
                </p>
                <p className="text-foreground text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-muted text-xs">{stat.note}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Why Now ─── */}
      <Section id="why-now" className="gradient-section">
        <SectionHeader title="Why now" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyNowPoints.map((point, i) => (
            <div key={point.title}>
              <span className="block text-5xl font-bold text-accent/15 font-serif mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <H4 className="mb-3">{point.title}</H4>
              <p className="text-muted text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Wedge ─── */}
      <Section id="wedge">
        <SectionHeader
          title="Our wedge"
          subtitle="Dalbit enters the market through a free, gamified intake that captures structured cultural and creative identity data. This creates immediate value through personalized onboarding while building a unique, defensible dataset."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wedgeComponents.map((item) => (
            <Card key={item.title} hover>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Moat ─── */}
      <Section id="moat" className="gradient-section">
        <SectionHeader title="Our moat" />
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="p-8">
            <CardHeader>
              <Badge variant="accent" className="mb-3">
                Data flywheel
              </Badge>
              <CardTitle>Compounding cultural intelligence</CardTitle>
            </CardHeader>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Each intake, collaboration, and outcome feeds the cultural
              intelligence model. More data produces better matching, which
              drives better outcomes, which attracts more users, which generates
              more data. This loop is difficult to replicate because the data is
              structured, proprietary, and domain-specific.
            </p>
            {/* Visual flywheel */}
            <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-medium text-foreground">
              {[
                "More data",
                "Better matching",
                "Better outcomes",
                "More users",
              ].map((step, i, arr) => (
                <span key={step} className="flex items-center gap-3">
                  <span className="bg-surface border border-border rounded-lg px-4 py-2">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-accent" aria-hidden="true">
                      &rarr;
                    </span>
                  )}
                  {i === arr.length - 1 && (
                    <span className="text-accent" aria-hidden="true">
                      &circlearrowright;
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-8">
            <CardHeader>
              <Badge variant="accent" className="mb-3">
                Trust &amp; curation
              </Badge>
              <CardTitle>Quality over quantity</CardTitle>
            </CardHeader>
            <p className="text-muted text-sm leading-relaxed">
              Premium positioning means every profile is verified and enriched.
              Unlike open marketplaces that race to the bottom on price, Dalbit
              optimizes for match quality and cultural fit. This attracts
              higher-value participants and commands stronger unit economics.
            </p>
          </Card>
        </div>
      </Section>

      {/* ─── Business Model ─── */}
      <Section id="business-model">
        <SectionHeader title="Business model" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {revenueStreams.map((stream) => (
            <Card key={stream.title} hover>
              <CardHeader>
                <CardTitle>{stream.title}</CardTitle>
                <p className="text-accent text-sm font-medium mt-1">
                  {stream.detail}
                </p>
              </CardHeader>
              <CardDescription>{stream.description}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── GTM Strategy ─── */}
      <Section id="gtm" className="gradient-section">
        <SectionHeader title="Go-to-market" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gtmPhases.map((phase, i) => (
            <Card key={phase.phase}>
              <CardHeader>
                <Badge
                  variant={i === 0 ? "accent" : i === 1 ? "default" : "muted"}
                  className="mb-3"
                >
                  Phase {i + 1}
                </Badge>
                <CardTitle>{phase.phase}</CardTitle>
              </CardHeader>
              <ul className="space-y-3 mt-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-muted text-sm leading-relaxed"
                  >
                    <span className="text-accent mt-0.5 flex-shrink-0">
                      &bull;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Traction ─── */}
      <Section id="traction">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="muted" className="mb-4">
            Pre-launch
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Traction
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tractionMetrics.map((metric) => (
            <Card key={metric.label}>
              <div className="text-center">
                <p className="font-serif text-3xl font-semibold text-foreground mb-1">
                  {metric.value}
                </p>
                <p className="text-muted text-sm">{metric.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Team ─── */}
      <Section id="team" className="gradient-section">
        <SectionHeader
          title="Team"
          subtitle="Domain expertise at the intersection of culture, creative work, and technology."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name}>
              <div className="flex flex-col items-center text-center">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
                  <span className="text-muted text-xl font-serif font-semibold">
                    {member.name.charAt(1)}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-accent text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Investor Deck Request Form ─── */}
      <Section id="deck-form">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="Request investor deck"
            subtitle="Share your details and we will send the full deck within 24 hours."
          />

          <InvestorForm />

          <div className="text-center mt-8">
            <a
              href="#"
              className="text-accent text-sm font-medium hover:underline underline-offset-4"
            >
              Download one-pager (PDF) &darr;
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
