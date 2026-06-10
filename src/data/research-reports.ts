import type { ResearchReport } from "@/types/content";

const TEMPLATES: Record<string, { sections: string[]; takeaways: string[] }> = {
  "weekly-reports": {
    sections: ["Market Summary", "Key Events", "Strategy Positioning", "Risk Outlook", "Investor Actions"],
    takeaways: ["Volatility regime assessment", "Systematic positioning update", "Drawdown risk monitor"],
  },
  "forex-outlook": {
    sections: ["EUR/USD Technical Structure", "Central Bank Calendar", "Liquidity Analysis", "Prysm Blue Context", "Risk Scenarios"],
    takeaways: ["Major pair directional bias", "Event risk calendar", "Execution quality notes"],
  },
  "gold-analysis": {
    sections: ["XAU/USD Regime", "Volatility Profile", "Macro Drivers", "Prysm Gold Framework", "Allocation Implications"],
    takeaways: ["Gold volatility regime", "Safe haven dynamics", "Drawdown characteristics"],
  },
  "market-insights": {
    sections: ["Global Macro", "Cross-Asset Flows", "Institutional Positioning", "Systematic Signals", "Week Ahead"],
    takeaways: ["Macro regime shift indicators", "Flow-based insights", "Correlation changes"],
  },
  "ai-trading": {
    sections: ["Model Performance", "Signal Quality", "Blue Engine Update", "Governance Review", "Forward Outlook"],
    takeaways: ["AI signal validation metrics", "Model drift status", "Infrastructure updates"],
  },
  "economic-calendar": {
    sections: ["High-Impact Events", "Central Bank Schedule", "Data Releases", "Systematic Risk Map", "Positioning Guidance"],
    takeaways: ["Event-driven risk windows", "Volatility expectations", "Hedging considerations"],
  },
};

function buildReport(
  slug: string,
  title: string,
  category: string,
  categorySlug: string,
  date: string,
  excerpt: string,
  featured: boolean
): ResearchReport {
  const tpl = TEMPLATES[categorySlug] ?? TEMPLATES["market-insights"];
  return {
    slug,
    title,
    category,
    categorySlug,
    date,
    excerpt,
    featured,
    template: categorySlug,
    sections: tpl.sections.map((heading) => ({
      heading,
      paragraphs: [
        `${heading} for this reporting period reflects systematic analysis from the PrysmAlgo research desk, incorporating live strategy data and macro event mapping.`,
        `Qualified investors should review this section alongside live performance metrics and their personal risk tolerance.`,
      ],
    })),
    keyTakeaways: tpl.takeaways,
    faqs: [
      { question: "Who is this research for?", answer: "Qualified and institutional investors evaluating systematic strategies." },
      { question: "How often is research published?", answer: "Weekly for market briefs; monthly for deep-dive outlooks." },
    ],
    internalLinks: [
      { href: "/live-performance", label: "Live Performance" },
      { href: "/research", label: "Research Hub" },
      { href: "/downloads/ai-trading-report", label: "AI Trading Report" },
    ],
  };
}

export const RESEARCH_REPORTS: ResearchReport[] = [
  buildReport("weekly-market-brief-mar-2026", "Weekly Market Brief — March 2026", "Weekly Reports", "weekly-reports", "2026-03-01", "US equity volatility regime analysis and systematic strategy positioning.", true),
  buildReport("eurusd-systematic-outlook-q1", "EUR/USD Systematic Outlook Q1 2026", "Forex Outlook", "forex-outlook", "2026-01-15", "Structural break analysis and Prysm Blue positioning framework.", true),
  buildReport("gold-volatility-regime-2026", "Gold Volatility Regime Analysis", "Gold Analysis", "gold-analysis", "2026-02-10", "XAU/USD consolidation patterns and Prysm Gold execution context.", false),
  buildReport("ai-signal-generation-update", "AI Signal Generation: Q1 Update", "AI Trading Research", "ai-trading", "2026-02-28", "Blue Engine neural ensemble performance and model governance.", false),
  buildReport("macro-calendar-march-2026", "March 2026 Economic Calendar", "Economic Calendar", "economic-calendar", "2026-03-01", "FOMC, ECB, and NFP events with systematic risk implications.", false),
  buildReport("market-structure-insights-feb", "Market Structure Insights — February", "Market Insights", "market-insights", "2026-02-20", "Institutional flow patterns and liquidity regime shifts.", false),
  buildReport("weekly-forex-outlook-mar-w2", "Weekly Forex Outlook — March Week 2", "Forex Outlook", "forex-outlook", "2026-03-08", "EUR/USD range dynamics and liquidity event mapping.", false),
  buildReport("gold-outlook-q1-2026", "Gold Market Outlook Q1 2026", "Gold Analysis", "gold-analysis", "2026-01-25", "XAU/USD institutional allocation framework for Q1.", false),
  buildReport("macro-analysis-fed-cycle-2026", "Macro Analysis: Fed Cycle 2026", "Market Insights", "market-insights", "2026-02-05", "Rate path implications for systematic multi-asset portfolios.", false),
  buildReport("risk-management-research-drawdowns", "Risk Management Research: Drawdown Protocols", "AI Trading Research", "ai-trading", "2026-01-30", "Comparative drawdown analysis across Prysm strategies.", false),
];

export function getResearchReport(slug: string) {
  return RESEARCH_REPORTS.find((r) => r.slug === slug);
}
