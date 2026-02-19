import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dalbit — AI-Powered Growth for Modern Brands",
    template: "%s | Dalbit",
  },
  description:
    "Dalbit helps brands and creators build AI-powered growth systems that scale. Audit, automate, and accelerate your marketing.",
  keywords: ["AI marketing", "growth systems", "creator economy", "brand automation", "dalbit"],
  openGraph: {
    title: "Dalbit — AI-Powered Growth for Modern Brands",
    description:
      "Dalbit helps brands and creators build AI-powered growth systems that scale.",
    url: "https://dalbit.ai",
    siteName: "Dalbit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dalbit — AI-Powered Growth for Modern Brands",
    description:
      "Dalbit helps brands and creators build AI-powered growth systems that scale.",
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
