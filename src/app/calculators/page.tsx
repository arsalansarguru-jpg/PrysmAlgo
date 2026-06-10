import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { CalculatorsHub } from "@/components/growth/calculators-hub";

export const metadata: Metadata = createMetadata({
  title: "Investor Calculators | Portfolio & Risk Tools",
  description: "Compound growth, drawdown recovery, position sizing, risk-reward, and portfolio allocation calculators for investors.",
  path: "/calculators",
  keywords: ["trading calculator", "compound growth calculator", "position sizing calculator"],
});

export default function CalculatorsPage() {
  return <CalculatorsHub />;
}
