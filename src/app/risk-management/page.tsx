import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { RiskManagementPage } from "@/components/pages/risk-management-page";

export const metadata: Metadata = createMetadata({
  title: "Risk Management Framework | Institutional Risk Controls",
  description:
    "Explore PrysmAlgo's institutional risk management philosophy, position sizing, drawdown controls, emergency stops, and monitoring systems.",
  path: "/risk-management",
  keywords: ["algorithmic trading risk management", "capital preservation", "drawdown protection", "institutional risk framework"],
});

export default function RiskManagement() {
  return <RiskManagementPage />;
}
