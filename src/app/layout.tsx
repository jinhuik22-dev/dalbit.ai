import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dalbit \u2014 Cultural Intelligence for Global Creators",
    template: "%s | Dalbit",
  },
  description:
    "Dalbit is a cultural intelligence platform that empowers global creators and brands to navigate cross-cultural markets with data-driven insights and localized strategy.",
  keywords: [
    "cultural intelligence",
    "global creators",
    "cross-cultural marketing",
    "creator economy",
    "localization",
    "dalbit",
  ],
  openGraph: {
    title: "Dalbit \u2014 Cultural Intelligence for Global Creators",
    description:
      "Empowering global creators and brands with cultural intelligence to scale across markets.",
    url: "https://dalbit.ai",
    siteName: "Dalbit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dalbit \u2014 Cultural Intelligence for Global Creators",
    description:
      "Empowering global creators and brands with cultural intelligence to scale across markets.",
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
