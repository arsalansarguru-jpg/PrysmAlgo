import type { ResearchReport } from "@/types/intelligence";

const CATEGORIES = [
  { slug: "macro-research", name: "Macro Research" },
  { slug: "market-structure", name: "Market Structure" },
  { slug: "ai-trading-research", name: "AI Trading Research" },
  { slug: "risk-research", name: "Risk Research" },
  { slug: "quantitative-research", name: "Quantitative Research" },
  { slug: "economic-intelligence", name: "Economic Intelligence" },
];

const TITLES: Record<string, string[]> = {
  "macro-research": ["Global Liquidity Cycle Analysis", "Emerging Market Capital Flows", "Rate Path Scenarios Q2 2026"],
  "market-structure": ["Forex Microstructure Report", "Gold Market Depth Analysis", "US Equity Fragmentation Study"],
  "ai-trading-research": ["Blue Engine Model Governance", "Neural Ensemble Validation Framework", "Signal Decay in AI Systems"],
  "risk-research": ["Drawdown Protection Protocols", "Tail Risk Hedging for Systematic Portfolios", "Correlation Regime Shifts"],
  "quantitative-research": ["Factor Exposure in Multi-Strategy Allocation", "Sharpe Optimization Under Constraints", "Backtesting Robustness Standards"],
  "economic-intelligence": ["India-UAE Capital Flow Report", "Central Bank Policy Matrix", "Inflation Regime Classification"],
};

function buildReport(catSlug: string, catName: string, title: string, i: number): ResearchReport {
  const slug = `${catSlug}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
  const d = new Date();
  d.setDate(d.getDate() - i * 7);
  return {
    slug,
    title,
    category: catName,
    categorySlug: catSlug,
    date: d.toISOString().split("T")[0],
    excerpt: `Institutional ${catName.toLowerCase()} report examining ${title.toLowerCase()} with systematic frameworks and data-driven conclusions.`,
    pdfReady: true,
    tier: i < 2 ? "free" : i < 4 ? "professional" : "institutional",
    sections: [
      { heading: "Executive Summary", paragraphs: ["This report provides institutional-grade analysis for qualified investors evaluating systematic strategies and macro positioning."] },
      { heading: "Key Findings", paragraphs: ["Multi-factor analysis supports current PrysmAlgo risk framework. Data suggests continued regime stability with monitored event-risk windows."] },
      { heading: "Implications for Investors", paragraphs: ["Allocation frameworks should maintain diversification across Prysm Blue, Gold, and Green strategies with documented drawdown limits."] },
      { heading: "Methodology", paragraphs: ["Analysis combines proprietary systematic data, public market data, and institutional research standards. Past performance does not guarantee future results."] },
    ],
  };
}

export const INSTITUTE_CATEGORIES = CATEGORIES;

export const INSTITUTE_REPORTS: ResearchReport[] = CATEGORIES.flatMap((cat) =>
  (TITLES[cat.slug] ?? []).map((title, i) => buildReport(cat.slug, cat.name, title, i))
);

export function getInstituteReport(slug: string) {
  return INSTITUTE_REPORTS.find((r) => r.slug === slug);
}
