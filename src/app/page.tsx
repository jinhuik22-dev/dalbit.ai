import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const routes = [
  {
    href: "/about",
    title: "About Dalbit",
    description: "Learn what we do, how it works, and why it matters.",
    icon: "✦",
  },
  {
    href: "/services",
    title: "Services",
    description: "AI marketing consulting packages for SMBs ready to grow.",
    icon: "◆",
  },
  {
    href: "/trial",
    title: "Free Trial Tools",
    description: "Try our AI-powered growth tools — no signup required.",
    icon: "▸",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              AI + Cultural Intelligence
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 glow-text">
              Smarter growth.{" "}
              <span className="text-accent">Better collaborations.</span>
              <br />
              Across languages and markets.
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
              Dalbit helps SMBs and multilingual creators build AI-powered
              growth systems that actually convert — with cultural intelligence
              baked in, not bolted on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/trial" size="lg">
                Try Free Tools
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative moonlight gradient */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 80% 30%, rgba(167,139,250,0.15), transparent 60%)",
          }}
        />
      </section>

      {/* Route Cards */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((route) => (
            <a key={route.href} href={route.href} className="group">
              <Card className="h-full group-hover:border-accent/40 transition-all duration-300">
                <div className="text-3xl mb-4">{route.icon}</div>
                <CardTitle className="group-hover:text-accent transition-colors">
                  {route.title}
                </CardTitle>
                <CardDescription className="mt-2">{route.description}</CardDescription>
                <p className="mt-4 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore &rarr;
                </p>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* Quick value props */}
      <Section className="border-t border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              stat: "Cultural Intelligence",
              desc: "Not just translation — real cultural alignment for global markets.",
            },
            {
              stat: "AI + Human Strategy",
              desc: "Automation where it helps. Human insight where it matters.",
            },
            {
              stat: "Measurable Outcomes",
              desc: "Clear KPIs, honest reporting, and systems built to scale.",
            },
          ].map((item) => (
            <div key={item.stat}>
              <h3 className="text-lg font-semibold text-accent mb-2">{item.stat}</h3>
              <p className="text-muted text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Banner */}
      <section className="gradient-moonlight border-t border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to grow smarter?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Book a free discovery call or try our trial tools to see how Dalbit
            can work for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/trial" size="lg">
              Try Free Tools
            </Button>
            <Button href="/services" variant="outline" size="lg">
              View Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
