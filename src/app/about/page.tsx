import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dalbit is a cultural intelligence platform bridging talent, language, and culture so the best creative work can happen across any border.",
};

const ciPillars = [
  {
    title: "Context",
    description:
      "Understanding cultural norms, expectations, and unspoken rules that shape how business gets done in different markets.",
  },
  {
    title: "Tone",
    description:
      "Adapting communication style so messaging resonates authentically, whether you\u2019re addressing a Korean boardroom or a US-based creator community.",
  },
  {
    title: "Trust",
    description:
      "Building cross-cultural credibility through relationship awareness, timing, and respect for how trust is earned in each market.",
  },
];

const values = [
  {
    title: "Cultural Respect",
    description:
      "We treat every market, language, and creative tradition with genuine respect \u2014 not as a checkbox.",
  },
  {
    title: "Clarity Over Hype",
    description:
      "We say what we mean, back claims with substance, and never oversell what we can deliver.",
  },
  {
    title: "Quality Over Quantity",
    description:
      "Fewer, better connections. Deeper understanding. Work that actually moves the needle.",
  },
  {
    title: "Global by Default",
    description:
      "We build for a world without borders \u2014 every decision considers cross-cultural impact from the start.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <Badge variant="accent" className="mb-6">
            About Dalbit
          </Badge>
          <H1 className="max-w-4xl mb-6">
            Cultural intelligence for the global creative economy
          </H1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Dalbit exists to bridge the gap between talent, language, and culture
            &mdash; so the best creative work can happen across any border.
          </p>
        </div>
      </section>

      {/* ─── Vision ─── */}
      <Section id="vision">
        <SectionHeader title="Our vision" align="left" />
        <div className="max-w-3xl">
          <p className="text-muted text-lg leading-relaxed">
            Dalbit is building the infrastructure that makes cross-border
            creative collaboration as seamless as working with someone down the
            street. We believe every creator, brand, and agency deserves access
            to global opportunities &mdash; without cultural misfires.
          </p>
        </div>
      </Section>

      {/* ─── What is Cultural Intelligence ─── */}
      <Section className="border-t border-border/50" id="cultural-intelligence">
        <SectionHeader
          title="What we mean by cultural intelligence"
          subtitle="It&rsquo;s not just translation. It&rsquo;s understanding context, tone, norms, expectations, and unspoken rules that differ across markets."
        />
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-muted leading-relaxed text-center">
            It&apos;s knowing that a &ldquo;direct&rdquo; tone in the US can
            feel aggressive in Japan, or that Korean business culture values
            relationship-building before transactional asks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ciPillars.map((pillar) => (
            <Card key={pillar.title}>
              <CardTitle>{pillar.title}</CardTitle>
              <CardDescription className="mt-3">
                {pillar.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── Brand Story ─── */}
      <Section className="border-t border-border/50" id="story">
        <SectionHeader title="Why we built this" align="left" />
        <div className="max-w-3xl space-y-4">
          <p className="text-muted text-lg leading-relaxed">
            Dalbit was built at the intersection of Bay Area tech and Seoul&apos;s
            creative economy. Founded by someone who&apos;s lived the friction
            firsthand &mdash; navigating two languages, two business cultures,
            and the constant gap between how things are said and how they&apos;re
            understood.
          </p>
          <p className="text-muted text-lg leading-relaxed">
            The result is a platform purpose-built for the people who work across
            borders every day: creators, brands, and agencies who refuse to let
            cultural friction hold back great work.
          </p>
        </div>
      </Section>

      {/* ─── Values ─── */}
      <Section className="border-t border-border/50" id="values">
        <SectionHeader title="What we stand for" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value) => (
            <Card key={value.title}>
              <CardTitle>{value.title}</CardTitle>
              <CardDescription className="mt-3">
                {value.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <section className="border-t border-border/50 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Ready to be part of this?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Join the creators, brands, and agencies building the future of
            cross-cultural collaboration.
          </p>
          <Button href="/start" size="lg">
            Start the Intake
          </Button>
        </div>
      </section>
    </>
  );
}
