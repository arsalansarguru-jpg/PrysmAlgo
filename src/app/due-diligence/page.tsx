import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { DueDiligenceCenter } from "@/components/capital-v7/due-diligence-center";

export const metadata: Metadata = createMetadata({
  title: "Due Diligence Center",
  description: "Institutional due diligence on operations, technology, risk, compliance, and performance.",
  path: "/due-diligence",
});

export default function DueDiligencePage() {
  return <DueDiligenceCenter />;
}
