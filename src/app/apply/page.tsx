import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ApplyPage } from "@/components/pages/apply-page";

export const metadata: Metadata = createMetadata({
  title: "Investor Application | Apply for Algorithmic Trading",
  description:
    "Apply to become a PrysmAlgo investor. Submit your application for institutional-grade algorithmic trading access. Minimum $250,000.",
  path: "/apply",
  keywords: ["algorithmic trading application", "investor application", "AI trading platform apply"],
});

export default function Apply() {
  return <ApplyPage />;
}
