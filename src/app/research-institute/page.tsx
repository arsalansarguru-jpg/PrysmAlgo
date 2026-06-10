import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ResearchInstituteHub } from "@/components/intelligence/research-institute-hub";

export const metadata: Metadata = createMetadata({
  title: "Prysm Research Institute",
  description: "Institutional macro, market structure, AI trading, risk, and quantitative research reports.",
  path: "/research-institute",
  keywords: ["institutional research", "macro research", "quantitative research"],
});

export default function Page() {
  return <ResearchInstituteHub />;
}
