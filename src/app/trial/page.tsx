import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { TrialClient } from "./TrialClient";

export const metadata: Metadata = {
  title: "Trial Tools",
  description:
    "Try Dalbit's free AI-powered growth tools. SMB track and Creator track — get useful outputs instantly.",
};

export default function TrialPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <Badge variant="accent" className="mb-6">Free Tools</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6 max-w-4xl glow-text">
            Try before you talk.{" "}
            <span className="text-accent">Free AI tools</span> for growth.
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Pick your track. Fill in the details. Get a useful, personalized
            output — instantly. No signup required.
          </p>
        </div>
      </section>

      {/* Trial Tools Client Component */}
      <TrialClient />
    </>
  );
}
