import type { InsightArticle } from "@/types/intelligence";
import { FOUNDER } from "@/lib/constants";

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "founder-letter-q1-2026",
    title: "Founder Letter — Q1 2026 Outlook",
    type: "letter",
    date: "2026-01-15",
    excerpt: "Arsalan Sarguru shares the institutional outlook for systematic trading in 2026.",
    author: FOUNDER.name,
    content: "As we enter 2026, systematic strategies face a unique environment: compressed volatility, elevated event risk, and increasing institutional demand for transparency. PrysmAlgo's mission remains unchanged — engineer risk-adjusted returns with full accountability.",
  },
  {
    slug: "macro-commentary-march-2026",
    title: "Macro Commentary — March 2026",
    type: "commentary",
    date: "2026-03-01",
    excerpt: "Central bank divergence and its impact on forex and gold systematic strategies.",
    author: "PrysmAlgo Research",
    content: "The divergence between Fed and ECB policy paths creates asymmetric opportunities in EUR/USD while gold benefits from safe-haven flows amid geopolitical uncertainty.",
  },
  {
    slug: "investor-note-risk-framework",
    title: "Investor Note: Risk Framework Update",
    type: "note",
    date: "2026-02-15",
    excerpt: "Updated drawdown protocols and emergency stop enhancements across all strategies.",
    author: "Risk Committee",
    content: "We have enhanced our five-tier risk architecture with improved real-time monitoring and automated position reduction triggers at predefined drawdown thresholds.",
  },
  {
    slug: "quarterly-outlook-q2-2026",
    title: "Quarterly Outlook — Q2 2026",
    type: "outlook",
    date: "2026-03-15",
    excerpt: "Systematic positioning and regime expectations for the second quarter.",
    author: "PrysmAlgo Research",
    content: "Our regime detection models suggest continued low-volatility environment with episodic event-risk spikes. Multi-strategy diversification remains optimal.",
  },
  {
    slug: "market-structure-forex-2026",
    title: "Forex Market Structure Report",
    type: "macro",
    date: "2026-02-01",
    excerpt: "EUR/USD liquidity analysis and institutional flow patterns.",
    author: "PrysmAlgo Research",
    content: "Forex market microstructure analysis reveals improving execution quality in major pairs with reduced slippage during London-NY overlap sessions.",
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug);
}
