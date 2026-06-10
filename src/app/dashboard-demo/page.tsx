import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { DashboardDemoPage } from "@/components/growth/dashboard-demo-page";

export const metadata: Metadata = createMetadata({
  title: "Investor Dashboard Demo",
  description: "Preview the PrysmAlgo investor dashboard with portfolio overview, trades, risk metrics, and performance analytics.",
  path: "/dashboard-demo",
  keywords: ["investor dashboard", "portfolio demo", "trading dashboard"],
  noIndex: true,
});

export default function DashboardDemoRoute() {
  return <DashboardDemoPage />;
}
