import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI marketing consulting for SMBs. Clear deliverables, measurable outcomes, and practical cross-cultural growth support.",
};

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
            Clear deliverables. Measurable outcomes. No fluff. Let&apos;s identify
            what matters most and design the right support for your stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#contact" size="lg">
              Book a Discovery Call
            </Button>
            <Button href="/trial" variant="secondary" size="lg">
              Try Free Tools First
            </Button>
          </div>
        </div>
      </section>

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
