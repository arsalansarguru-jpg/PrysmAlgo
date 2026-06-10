import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ResearchHubPage } from "@/components/growth/research-hub-page";

export const metadata: Metadata = createMetadata({
  title: "Weekly Research Hub | Market Insights",
  description: "Institutional market insights, forex outlook, gold analysis, economic calendar, and AI trading research.",
  path: "/research",
  keywords: ["market research", "forex outlook", "gold analysis", "trading research"],
});

export default function ResearchPage() {
  return <ResearchHubPage />;
}
