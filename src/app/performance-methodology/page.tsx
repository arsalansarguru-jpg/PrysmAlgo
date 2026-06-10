import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PerformanceMethodologyPage } from "@/components/pages/performance-methodology-page";

export const metadata: Metadata = createMetadata({
  title: "Performance Methodology | Transparent Reporting Standards",
  description:
    "How PrysmAlgo measures, reports, and attributes performance. Institutional reporting standards with full transparency and no exaggerated claims.",
  path: "/performance-methodology",
  keywords: ["performance methodology", "trading performance reporting", "institutional reporting"],
});

export default function PerformanceMethodology() {
  return <PerformanceMethodologyPage />;
}
