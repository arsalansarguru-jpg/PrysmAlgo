import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { LivePerformanceCenter } from "@/components/growth/live-performance-center";
import { getLivePerformance } from "@/lib/performance/service";

export const metadata: Metadata = createMetadata({
  title: "Live Performance Center | Institutional Trading Metrics",
  description: "Real-time performance dashboard with equity curves, monthly returns, drawdown analysis, and risk metrics for PrysmAlgo strategies.",
  path: "/live-performance",
  keywords: ["live trading performance", "algorithmic trading returns", "institutional performance dashboard"],
});

// Incrementally regenerate every 5 minutes so the page is pre-rendered with
// the latest verified metrics — never a flash of zeros on first load.
export const revalidate = 300;

export default async function LivePerformancePage() {
  const initialData = await getLivePerformance();
  return <LivePerformanceCenter initialData={initialData} />;
}
