import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { UniversityHub } from "@/components/intelligence/university-hub";

export const metadata: Metadata = createMetadata({
  title: "PrysmAlgo University",
  description: "Investor education courses with certificates in algorithmic trading, risk, and AI systems.",
  path: "/university",
  keywords: ["investor education", "algorithmic trading course", "risk management course"],
});

export default function Page() {
  return <UniversityHub />;
}
