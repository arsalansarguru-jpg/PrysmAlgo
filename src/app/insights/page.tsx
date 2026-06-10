import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { InsightsHub } from "@/components/intelligence/insights-hub";

export const metadata: Metadata = createMetadata({
  title: "Executive Insights",
  description: "Founder commentary, market letters, investor notes, and quarterly outlooks.",
  path: "/insights",
  keywords: ["founder commentary", "market letter", "investor insights"],
});

export default function Page() {
  return <InsightsHub />;
}
