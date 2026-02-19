import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Dalbit is a cross-cultural, AI-powered growth platform for SMBs and multilingual creators. Learn what we do, why it matters, and how we work.",
};

const steps = [
  {
    number: "01",
    title: "Diagnose",
    description:
      "We audit your current marketing, messaging, and growth channels. We identify what's working, what's leaking, and what's missing — across languages and markets.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We build a clear, actionable plan: positioning, ICP definition, channel strategy, and content frameworks. Powered by AI, refined by human insight.",
  },
  {
    number: "03",
    title: "Execute & Scale",
    description:
      "We help you implement the strategy — from landing pages and ad campaigns to creator partnerships and cross-cultural outreach. Then we measure, iterate, and scale.",
  },
];

const personas = [
  {
    icon: "🏢",
    title: "SMB Owners & Operators",
    description:
      "Local or regional businesses that want leads, revenue, and real systems — not marketing fluff. You know your product is good; you need help getting it in front of the right people.",
    tags: ["Lead generation", "Growth systems", "Clear ROI"],
  },
  {
    icon: "🌐",
    title: "Multilingual Creators & Artists",
    description:
      "Bilingual or multilingual creators who want better brand deals, stronger pitches, and clear pricing. You bridge cultures — we help you monetize that skill.",
    tags: ["Brand deals", "Pitch materials", "Rate strategy"],
  },
  {
    icon: "🤝",
    title: "Agencies & Brands",
    description:
      "Teams that need vetted, culturally aligned creators and smoother cross-border execution. We help reduce the friction of global collaborations.",
    tags: ["Creator matching", "Cultural alignment", "Cross-border"],
  },
];

const faqs = [
  {
    q: "What does Dalbit actually do?",
    a: "We're an AI-powered marketing consulting service. We help SMBs get clearer positioning, better targeting, and measurable growth — and we help multilingual creators build better B2B collaborations. Cultural intelligence is our edge.",
  },
  {
    q: "Is this just another AI automation tool?",
    a: "No. We use AI to accelerate research, analysis, and content generation — but every strategy is guided by human expertise and cultural context. AI handles the heavy lifting; humans handle the nuance.",
  },
  {
    q: "Who is Dalbit NOT for?",
    a: "We're not a good fit for businesses looking for overnight results, companies unwilling to invest time in implementation, or anyone interested in unethical marketing practices.",
  },
  {
    q: "What languages do you work with?",
    a: "Our team has native-level expertise in English and Korean, with operational fluency across several other languages. Our tools and frameworks are designed for multilingual markets.",
  },
  {
    q: "How much does it cost?",
    a: "Our packages start with a focused AI marketing audit. Pricing varies by scope — check out our Services page for details, or book a discovery call for a custom quote.",
  },
  {
    q: "What's the trial tools page?",
    a: "It's a set of free, guided AI tools that give you a taste of what Dalbit can do. You'll get useful outputs immediately — and we'll use your inputs to understand how we might work together.",
  },
  {
    q: "Where is Dalbit based?",
    a: "We operate at the intersection of Bay Area tech culture and Seoul's creative economy. Our team works across US and Korean time zones.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <Badge variant="accent" className="mb-6">About Dalbit</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 max-w-4xl glow-text">
            Smarter growth and better collaborations —{" "}
            <span className="text-accent">across languages and markets.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
            Dalbit is an AI-powered growth platform that helps SMBs and
            multilingual creators build marketing systems that actually
            convert — with cultural intelligence at the core.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/services" size="lg">
              Book a Discovery Call
            </Button>
            <Button href="/trial" variant="secondary" size="lg">
              Try Trial Tools
            </Button>
          </div>
        </div>
      </section>

      {/* What Dalbit Is */}
      <Section id="what">
        <SectionHeader
          title="What is Dalbit?"
          subtitle="A cross-cultural, multilingual growth platform — built for the way business actually works today."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hover={false} className="gradient-moonlight">
            <h3 className="text-lg font-semibold text-accent mb-3">Today (v1)</h3>
            <p className="text-muted leading-relaxed">
              AI-powered marketing consulting for SMBs. We audit your current
              approach, build clear strategies, and help you implement systems
              that generate leads and revenue — not vanity metrics.
            </p>
          </Card>
          <Card hover={false} className="gradient-moonlight">
            <h3 className="text-lg font-semibold text-accent mb-3">Tomorrow (v2)</h3>
            <p className="text-muted leading-relaxed">
              A premium B2B network connecting multilingual creators with
              brands and agencies. Better collaborations, less cultural
              friction, and matchmaking that actually considers language,
              values, and market fit.
            </p>
          </Card>
        </div>
      </Section>

      {/* Why Now */}
      <Section className="border-t border-border/50" id="why">
        <SectionHeader
          title="Why this matters now"
          subtitle="Two problems that cost businesses real money — and nobody's solving them well."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-1">📉</span>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Marketing waste</h4>
                <p className="text-muted text-sm leading-relaxed">
                  SMBs burn budget on marketing that doesn&apos;t convert because
                  messaging, targeting, and channels aren&apos;t aligned. The result?
                  Expensive experiments with no clear ROI.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-1">🌍</span>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Cross-cultural friction</h4>
                <p className="text-muted text-sm leading-relaxed">
                  Brands and creators struggle to collaborate globally because
                  language barriers and cultural misalignment create friction,
                  misunderstandings, and poor results. Opportunity gets lost in translation.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 p-6 rounded-2xl border border-accent/20 gradient-moonlight">
          <p className="text-foreground font-medium text-center">
            Dalbit&apos;s angle: <span className="text-accent">cultural intelligence + multilingual context + business strategy</span> — not &quot;just automation.&quot;
          </p>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="border-t border-border/50" id="how">
        <SectionHeader
          title="How it works"
          subtitle="Three steps from confusion to clarity."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Card key={step.number} className="relative">
              <span className="text-5xl font-bold text-accent/10 absolute top-4 right-4">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who It's For */}
      <Section className="border-t border-border/50" id="who">
        <SectionHeader
          title="Who it's for"
          subtitle="Dalbit works best for people who want real systems, not shortcuts."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p) => (
            <Card key={p.title}>
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription className="mt-3">{p.description}</CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Founder Note */}
      <Section className="border-t border-border/50" id="founder">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-6">Founder Note</Badge>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Built at the intersection of two worlds
          </h2>
          <div className="text-muted leading-relaxed space-y-4 text-left md:text-center">
            <p>
              I started Dalbit because I&apos;ve lived the problem. Growing up between
              the Bay Area and Seoul, I saw firsthand how much value gets lost
              when businesses and creators try to work across languages and
              cultures without the right systems.
            </p>
            <p>
              My background spans business strategy, technology, and the
              creator economy. I built Dalbit to combine these — using AI to
              handle the heavy lifting, human insight to handle the nuance,
              and cultural intelligence to bridge the gap.
            </p>
            <p className="text-foreground font-medium">
              This isn&apos;t about overnight results or magic AI. It&apos;s about
              building sustainable, meaningful growth systems that work
              across borders.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border/50" id="faq">
        <SectionHeader title="Frequently asked questions" />
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border border-border rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-card transition-colors">
                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                <span className="text-accent text-xl flex-shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-muted text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA Banner */}
      <section className="gradient-moonlight border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let&apos;s figure out your growth together.
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Whether you&apos;re an SMB looking for clarity or a creator looking
            for better collaborations — we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/services" size="lg">
              View Services
            </Button>
            <Button href="/trial" variant="secondary" size="lg">
              Try Trial Tools
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
