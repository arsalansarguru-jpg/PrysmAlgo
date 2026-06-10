import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { MarketTerminal } from "@/components/intelligence/market-terminal";
import { JsonLd } from "@/components/seo/json-ld";
import { intelligenceGraphSchema } from "@/lib/seo/knowledge-graph-v5";

export const metadata: Metadata = createMetadata({
  title: "Market Intelligence Terminal",
  description: "Bloomberg-style terminal with gold, forex, indices, economic calendar, AI insights, and regime detection.",
  path: "/terminal",
  keywords: ["market terminal", "forex terminal", "gold analysis", "economic calendar"],
});

export default function Page() {
  return (
    <>
      <JsonLd data={intelligenceGraphSchema()} />
      <MarketTerminal />
    </>
  );
}
