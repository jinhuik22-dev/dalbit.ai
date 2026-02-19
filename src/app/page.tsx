import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { H1, H2 } from "@/components/ui/Heading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HomeChatTeaser } from "@/components/HomeChatTeaser";

export const metadata: Metadata = {
  title: "Dalbit — Cultural Intelligence for Global Creators",
  description:
    "Cultural intelligence for cross-border creative work. Dalbit helps creators, brands, and agencies collaborate globally without cultural misfires.",
};

/* ---------- Page ---------- */

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 md:pt-44 md:pb-32 text-center">
          <ScrollReveal delay={0} distance={12}>
            <Badge variant="accent" className="mb-8">
              Now in early access
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={100} distance={16}>
            <H1 className="mb-6 max-w-4xl mx-auto">
              Create across borders.
              <br />
              <span className="text-gradient-accent">Without the friction.</span>
            </H1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-muted text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10">
              Cultural intelligence for creators, brands, and agencies
              working globally.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/start" size="lg">
                Get Started
              </Button>
              <Button href="/product" variant="ghost" size="lg">
                See how it works
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Chat Teaser ─── */}
      <section className="px-6 pb-24 md:pb-36">
        <ScrollReveal>
          <HomeChatTeaser />
        </ScrollReveal>
      </section>

      {/* ─── Value Props — Apple-style stacked sections ─── */}
      <section className="border-t border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-36">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            <ScrollReveal delay={0}>
              <div className="text-center md:text-left">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                  Intelligence
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
                  Understand culture,
                  <br />not just language.
                </h3>
                <p className="text-muted leading-relaxed">
                  Context-aware insights that catch what translation misses.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="text-center md:text-left">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                  Profiles
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
                  Find the right people.
                  <br />Faster.
                </h3>
                <p className="text-muted leading-relaxed">
                  Verified creatives with cultural context built in.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className="text-center md:text-left">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">
                  Workflow
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
                  Work together.
                  <br />Across anything.
                </h3>
                <p className="text-muted leading-relaxed">
                  Briefs, matching, and messaging built for global teams.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── How it works — bold numbered steps ─── */}
      <section className="border-t border-border/50 bg-warm-100">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-36">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <H2>Three steps. Two minutes.</H2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: "1", title: "Tell us about you", desc: "A quick conversation that maps your identity, culture, and goals." },
              { n: "2", title: "Get matched", desc: "See collaborators who fit — culturally, not just by keyword." },
              { n: "3", title: "Start creating", desc: "Every touchpoint accounts for language, timezone, and context." },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 120}>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white text-lg font-bold mb-5">
                    {step.n}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-t border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-40 text-center">
          <ScrollReveal>
            <H2 className="mb-5">Ready to go global?</H2>
            <p className="text-muted text-xl mb-10 max-w-lg mx-auto">
              Join creators and brands already building across borders.
            </p>
            <Button href="/start" size="lg">
              Get Started
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
