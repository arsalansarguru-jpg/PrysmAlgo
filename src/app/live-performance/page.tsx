import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { LivePerformanceCenter } from "@/components/growth/live-performance-center";

export const metadata: Metadata = createMetadata({
  title: "Live Performance Center | Institutional Trading Metrics",
  description: "Real-time performance dashboard with equity curves, monthly returns, drawdown analysis, and risk metrics for PrysmAlgo strategies.",
  path: "/live-performance",
  keywords: ["live trading performance", "algorithmic trading returns", "institutional performance dashboard"],
});

export default function LivePerformancePage() {
  return <LivePerformanceCenter />;
}
