import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { InvestorQuiz } from "@/components/growth/investor-quiz";

export const metadata: Metadata = createMetadata({
  title: "Investor Qualification Assessment",
  description: "Take our 2-minute investor assessment to receive a personalized recommendation for PrysmAlgo strategies.",
  path: "/investor-assessment",
  keywords: ["investor assessment", "qualified investor", "algorithmic trading eligibility"],
});

export default function InvestorAssessmentPage() {
  return <InvestorQuiz />;
}
