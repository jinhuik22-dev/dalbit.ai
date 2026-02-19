import type { Metadata } from "next";
import { IntakeChat } from "./IntakeChat";

export const metadata: Metadata = {
  title: "Start the Intake",
  description:
    "Tell us about yourself, your work, and your vision. Dalbit's intake helps us understand your creative world so we can connect you to the right opportunities.",
  openGraph: {
    title: "Start the Intake | Dalbit",
    description:
      "Tell us about yourself, your work, and your vision. Dalbit's intake helps us connect you to global creative opportunities.",
  },
};

export default function StartPage() {
  return <IntakeChat />;
}
