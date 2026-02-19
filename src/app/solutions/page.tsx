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
  title: "Solutions",
  description:
    "Whether you're a creator, brand, or agency — Dalbit meets you where you are in the cross-border creative economy with cultural intelligence, better briefs, and unified workflows.",
};

/* ---------- Data ---------- */

const creatorBenefits = [
  {
    title: "Global Discovery",
    description:
      "Get found by brands and agencies who need your specific cultural and creative expertise.",
  },
  {
    title: "Better Briefs",
    description:
      "Receive briefs that are culturally contextualized, so you spend less time clarifying and more time creating.",
  },
  {
    title: "Fewer Misunderstandings",
    description:
      "Dalbit\u2019s cultural intelligence layer flags potential miscommunications before they happen.",
  },
];

const brandBenefits = [
  {
    title: "Cultural Fit Matching",
    description:
      "Go beyond portfolios. Find creators who understand your target market\u2019s cultural context.",
  },
  {
    title: "Faster Approvals",
    description:
      "Culturally-aligned briefs mean fewer revision cycles and faster turnarounds.",
  },
  {
    title: "Unified Workflows",
    description:
      "Manage cross-border collaborations in one place, with built-in cultural context.",
  },
];

const agencyBenefits = [
  {
    title: "Standardized Comms",
    description:
      "Templates and frameworks that account for cultural and linguistic differences across markets.",
  },
  {
    title: "Reduced Revision Cycles",
    description:
      "Cultural pre-alignment means fewer back-and-forths between creators and clients.",
  },
  {
    title: "Scalable Operations",
    description:
      "Manage multiple cross-border projects with consistent quality and cultural sensitivity.",
  },
];

/* ---------- Reusable benefit grid ---------- */

function BenefitGrid({
  benefits,
}: {
  benefits: { title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {benefits.map((benefit, i) => (
        <ScrollReveal key={benefit.title} delay={i * 120}>
          <Card hover className="h-full">
            <CardHeader>
              <CardTitle>{benefit.title}</CardTitle>
            </CardHeader>
            <CardDescription className="text-base leading-relaxed">
              {benefit.description}
            </CardDescription>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ---------- Workflow example card ---------- */

function WorkflowExample({ children }: { children: React.ReactNode }) {
  return (
    <ScrollReveal delay={200}>
      <div className="mt-10 bg-surface border-l-4 border-accent rounded-2xl p-6 md:p-8 shadow-warm">
        <p className="text-xs font-medium uppercase tracking-wider text-accent mb-3">
          Example workflow
        </p>
        <p className="text-foreground italic leading-relaxed">{children}</p>
      </div>
    </ScrollReveal>
  );
}

/* ---------- Page ---------- */

export default function SolutionsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-28 md:pt-32 md:pb-40">
          <div className="max-w-3xl">
            <ScrollReveal delay={0}>
              <Badge variant="accent" className="mb-6">
                Solutions
              </Badge>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <H1 className="mb-6">
                Tailored for every side of the creative table
              </H1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                Whatever your role in the cross-border creative economy, Dalbit
                meets you where you are.
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

      {/* ─── For Creators ─── */}
      <Section id="creators" className="gradient-section">
        <ScrollReveal>
          <SectionHeader
            title="For Creators"
            subtitle="Get discovered by global clients. Get better briefs. Fewer misunderstandings."
          />
        </ScrollReveal>
        <BenefitGrid benefits={creatorBenefits} />
        <WorkflowExample>
          A Korean illustrator receives a brief from a US brand. Dalbit
          auto-flags cultural nuances in the brief, suggests tone adjustments,
          and provides context notes — before the first revision.
        </WorkflowExample>
      </Section>

      {/* ─── For Brands ─── */}
      <Section id="brands">
        <ScrollReveal>
          <SectionHeader
            title="For Brands"
            subtitle="Find talent that fits the culture. Not just the brief."
          />
        </ScrollReveal>
        <BenefitGrid benefits={brandBenefits} />
        <WorkflowExample>
          A Japanese beauty brand searches for a bilingual creator in LA. Dalbit
          surfaces matched profiles with cultural alignment scores, and generates
          a brief pre-adapted for the creator&apos;s market context.
        </WorkflowExample>
      </Section>

      {/* ─── For Agencies ─── */}
      <Section id="agencies" className="gradient-section">
        <ScrollReveal>
          <SectionHeader
            title="For Agencies"
            subtitle="Standardize cross-border communications. Reduce revision cycles."
          />
        </ScrollReveal>
        <BenefitGrid benefits={agencyBenefits} />
        <WorkflowExample>
          A Seoul-based agency manages creators across 4 markets. Dalbit
          standardizes briefing templates, flags cultural misalignments, and
          tracks revision efficiency across all projects.
        </WorkflowExample>
      </Section>

      {/* ─── Final CTA ─── */}
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
              <H2 className="mb-4">Find your starting point</H2>
              <p className="text-muted text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Whether you create, commission, or coordinate — Dalbit gives you the
                cultural intelligence layer to do it better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/start" size="lg">
                  Start the Intake
                </Button>
                <Button href="/product" variant="secondary" size="lg">
                  View Product
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
