import { RESEARCH_REPORTS } from "./research-reports";

export const researchCategories = [
  { slug: "market-insights", name: "Market Insights", description: "Weekly macro and market structure analysis." },
  { slug: "forex-outlook", name: "Forex Outlook", description: "EUR/USD and major pair systematic analysis." },
  { slug: "gold-analysis", name: "Gold Analysis", description: "XAU/USD structural and volatility research." },
  { slug: "economic-calendar", name: "Economic Calendar", description: "Key events impacting systematic strategies." },
  { slug: "ai-trading", name: "AI Trading Research", description: "Machine learning and systematic signal research." },
  { slug: "weekly-reports", name: "Weekly Reports", description: "Institutional weekly market briefings." },
];

export const researchReports = RESEARCH_REPORTS.map((r) => ({
  slug: r.slug,
  title: r.title,
  category: r.category,
  date: r.date,
  excerpt: r.excerpt,
  featured: r.featured,
}));

export const economicEvents = [
  { date: "Mar 12", event: "US CPI Release", impact: "High" },
  { date: "Mar 19", event: "FOMC Rate Decision", impact: "High" },
  { date: "Mar 20", event: "BoE Rate Decision", impact: "Medium" },
  { date: "Mar 28", event: "US NFP Employment", impact: "High" },
];
