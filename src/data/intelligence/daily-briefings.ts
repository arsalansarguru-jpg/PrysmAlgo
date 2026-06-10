import type { DailyBriefing } from "@/types/intelligence";

function generateBriefing(daysAgo: number): DailyBriefing {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const dateStr = d.toISOString().split("T")[0];
  const slug = `briefing-${dateStr}`;

  return {
    slug,
    date: dateStr,
    title: `PrysmAlgo Daily Briefing — ${d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    marketSummary: "Global equities advanced on easing rate expectations while gold held firm above key support. Cross-asset correlations remain subdued, supporting diversified systematic allocation.",
    goldOutlook: "XAU/USD consolidating in $2,320–$2,360 range. Safe-haven bid intact on geopolitical uncertainty. Prysm Gold maintains defensive positioning with 2.3% max historical drawdown framework.",
    forexOutlook: "EUR/USD range-bound ahead of ECB commentary. USD strength moderating as rate-cut expectations firm. Prysm Blue monitoring liquidity events for execution optimization.",
    economicEvents: [
      { time: "08:30", event: "US Initial Jobless Claims", impact: "Medium" },
      { time: "10:00", event: "Existing Home Sales", impact: "Low" },
      { time: "14:00", event: "Fed Speaker", impact: "High" },
    ],
    algorithmPositioning: "Prysm strategies maintaining neutral-to-slightly-long bias across forex and gold. US equity exposure via Prysm Green aligned with low-volatility regime detection.",
    riskAlerts: ["Elevated event risk around central bank communications", "Monitor VIX term structure for regime shift signals"],
    regime: daysAgo % 3 === 0 ? "Risk-On" : daysAgo % 3 === 1 ? "Transitional" : "Low Volatility",
  };
}

export const DAILY_BRIEFINGS: DailyBriefing[] = Array.from({ length: 30 }, (_, i) => generateBriefing(i));

export function getBriefing(slug: string) {
  return DAILY_BRIEFINGS.find((b) => b.slug === slug);
}

export function getLatestBriefing() {
  return DAILY_BRIEFINGS[0];
}
