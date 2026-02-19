import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AppDashboard() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <Badge variant="accent" className="mb-6">
          Early Access
        </Badge>

        <H1 className="mb-4">Welcome to Dalbit</H1>

        <p className="text-muted text-lg leading-relaxed mb-12">
          You&apos;re inside. We&apos;re building something special for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left mb-12">
          <Card>
            <div className="mb-3">
              <Badge variant="muted">Coming Soon</Badge>
            </div>
            <CardTitle>Build your profile</CardTitle>
            <CardDescription className="mt-2">
              Your cultural profile is the foundation. Coming soon.
            </CardDescription>
          </Card>

          <Card>
            <div className="mb-3">
              <Badge variant="muted">Coming Soon</Badge>
            </div>
            <CardTitle>Explore the network</CardTitle>
            <CardDescription className="mt-2">
              Discover creators, brands, and agencies aligned with your vision.
            </CardDescription>
          </Card>
        </div>

        <Link
          href="/"
          className="text-accent text-sm font-medium hover:underline"
        >
          &larr; Back to home
        </Link>
      </div>
    </section>
  );
}
