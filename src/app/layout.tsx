import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Between by Dalbit \u2014 Portfolio First. Built Between Cultures.",
    template: "%s | Between by Dalbit",
  },
  description:
    "Between by Dalbit is a portfolio-first platform for cross-cultural creative matching: intake, premium profile, match, and chat in trial mode without vanity metrics.",
  keywords: [
    "between by dalbit",
    "portfolio first",
    "cross-cultural creators",
    "creative matching",
    "global talent",
    "dalbit",
  ],
  openGraph: {
    title: "Between by Dalbit \u2014 Portfolio First. Built Between Cultures.",
    description:
      "A portfolio-first matching experience for cross-cultural creative work.",
    url: "https://dalbit.ai",
    siteName: "Between by Dalbit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Between by Dalbit \u2014 Portfolio First. Built Between Cultures.",
    description:
      "Portfolio-first cross-cultural matching by Dalbit.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
