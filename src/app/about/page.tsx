import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { H1, H2 } from "@/components/ui/Heading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
      <section className="relative overflow-hidden gradient-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-32 md:pb-40">
          <ScrollReveal delay={0}>
            <Badge variant="accent" className="mb-6">
              About Dalbit
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <H1 className="max-w-4xl mb-6">
              Cultural intelligence for the global creative economy
            </H1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Dalbit exists to bridge the gap between talent, language, and culture
              &mdash; so the best creative work can happen across any border.
            </p>
          </ScrollReveal>
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

      {/* ─── Vision ─── */}
      <Section id="vision">
        <ScrollReveal>
          <SectionHeader title="Our vision" align="left" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="max-w-3xl">
            <p className="text-muted text-lg leading-relaxed">
              Dalbit is building the infrastructure that makes cross-border
              creative collaboration as seamless as working with someone down the
              street. We believe every creator, brand, and agency deserves access
              to global opportunities &mdash; without cultural misfires.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ─── What is Cultural Intelligence ─── */}
      <Section className="border-t border-border/50" id="cultural-intelligence">
        <ScrollReveal>
          <SectionHeader
            title="What we mean by cultural intelligence"
            subtitle="It&rsquo;s not just translation. It&rsquo;s understanding context, tone, norms, expectations, and unspoken rules that differ across markets."
          />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-muted leading-relaxed text-center">
              It&apos;s knowing that a &ldquo;direct&rdquo; tone in the US can
              feel aggressive in Japan, or that Korean business culture values
              relationship-building before transactional asks.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ciPillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 120}>
              <Card className="h-full">
                <CardTitle>{pillar.title}</CardTitle>
                <CardDescription className="mt-3">
                  {pillar.description}
                </CardDescription>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ─── Brand Story ─── */}
      <Section className="border-t border-border/50" id="story">
        <ScrollReveal>
          <SectionHeader title="Why we built this" align="left" />
        </ScrollReveal>
        <div className="max-w-3xl space-y-4">
          <ScrollReveal delay={100}>
            <p className="text-muted text-lg leading-relaxed">
              Dalbit was built at the intersection of Bay Area tech and Seoul&apos;s
              creative economy. Founded by someone who&apos;s lived the friction
              firsthand &mdash; navigating two languages, two business cultures,
              and the constant gap between how things are said and how they&apos;re
              understood.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted text-lg leading-relaxed">
              The result is a platform purpose-built for the people who work across
              borders every day: creators, brands, and agencies who refuse to let
              cultural friction hold back great work.
            </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* ─── Values ─── */}
      <Section className="border-t border-border/50" id="values">
        <ScrollReveal>
          <SectionHeader title="What we stand for" />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <ScrollReveal key={value.title} delay={i * 100}>
              <Card className="h-full">
                <CardTitle>{value.title}</CardTitle>
                <CardDescription className="mt-3">
                  {value.description}
                </CardDescription>
              </Card>
            </ScrollReveal>
          ))}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <ScrollReveal>
            <H2 className="mb-4">Ready to be part of this?</H2>
            <p className="text-muted text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Join the creators, brands, and agencies building the future of
              cross-cultural collaboration.
            </p>
            <Button href="/start" size="lg">
              Start the Intake
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
