import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { DailyBriefingHub } from "@/components/intelligence/daily-briefing-hub";

export const metadata: Metadata = createMetadata({
  title: "Daily Investor Briefing",
  description: "Daily market summary, gold & forex outlook, economic events, and algorithm positioning.",
  path: "/daily-briefing",
  keywords: ["daily market briefing", "investor briefing", "forex outlook"],
});

export default function Page() {
  return <DailyBriefingHub />;
}
