import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PrysmAiPage } from "@/components/intelligence/prysm-ai-page";

export const metadata: Metadata = createMetadata({
  title: "Prysm AI — Research Assistant",
  description: "AI-powered assistant for reports, performance, risk metrics, and investor education.",
  path: "/prysm-ai",
  keywords: ["ai trading assistant", "investor ai", "prysm ai"],
});

export default function Page() {
  return <PrysmAiPage />;
}
