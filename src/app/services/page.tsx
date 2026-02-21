import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Dalbit.ai services: BETWEEN (Beta Testing) and SMB Consulting.",
};

const SERVICES = [
  {
    title: "BETWEEN (Beta Testing)",
    description:
      "Test our beta matching flow for cross-cultural collaboration, from intake to first conversation.",
    cta: "Start BETWEEN Trial",
    href: "/trial",
  },
  {
    title: "SMB Consulting",
    description:
      "Practical strategy support for small and mid-sized businesses expanding across languages and markets.",
    cta: "Book Discovery Call",
    href: "/services#contact",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">Services</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            What is Dalbit.ai services?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Keep it simple: two focused services for global growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.title} className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {service.description}
              </p>
              <Button href={service.href} className="mt-6">
                {service.cta}
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Need help choosing?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            We can walk you through whether BETWEEN beta testing or SMB consulting is right for your team.
          </p>
          <Button className="mt-6">Contact Dalbit</Button>
        </div>
      </section>
    </>
  );
}
