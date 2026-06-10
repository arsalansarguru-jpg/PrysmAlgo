import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PerformanceDashboard } from "@/components/pages/performance-dashboard";

export const metadata: Metadata = createMetadata({
  title: "Live Strategy Performance | Prysm Blue, Gold & Green",
  description:
    "View live performance for Prysm Blue, Gold, and Green. Download institutional tear sheets. Prysm Green real-time dashboard at green.prysmalgo.com.",
  path: "/performance",
  keywords: [
    "prysm blue performance",
    "prysm gold performance",
    "prysm green performance",
    "algorithmic trading tear sheet",
    "live trading dashboard",
  ],
});

export default function PerformancePage() {
  return <PerformanceDashboard />;
}
