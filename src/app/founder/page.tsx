import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { FounderAuthorityPage } from "@/components/growth/founder-authority-page";
import { FOUNDER } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: `${FOUNDER.name} | Founder & CEO`,
  description: `Meet ${FOUNDER.name}, Founder & CEO of PrysmAlgo. Mission, vision, timeline, and thought leadership in algorithmic trading.`,
  path: "/founder",
  keywords: ["Arsalan Sarguru", "PrysmAlgo founder", "algorithmic trading leadership"],
});

export default function FounderPage() {
  return <FounderAuthorityPage />;
}
