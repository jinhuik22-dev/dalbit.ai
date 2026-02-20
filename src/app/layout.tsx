import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BETWEEN by dalbit \u2014 Portfolio First. Built BETWEEN Cultures.",
    template: "%s | BETWEEN by dalbit",
  },
  description:
    "BETWEEN by dalbit is a portfolio-first platform for cross-cultural creative matching: intake, premium profile, match, and chat in BETWEEN Trial Mode without vanity metrics.",
  keywords: [
    "between by dalbit",
    "portfolio first",
    "cross-cultural creators",
    "creative matching",
    "global talent",
    "dalbit",
  ],
  openGraph: {
    title: "BETWEEN by dalbit \u2014 Portfolio First. Built BETWEEN Cultures.",
    description:
      "A portfolio-first matching experience for cross-cultural creative work.",
    url: "https://dalbit.ai",
    siteName: "BETWEEN by dalbit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BETWEEN by dalbit \u2014 Portfolio First. Built BETWEEN Cultures.",
    description:
      "Portfolio-first cross-cultural matching by dalbit.",
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
