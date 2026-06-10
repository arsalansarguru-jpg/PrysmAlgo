import type { IrCommunication } from "@/types/capital-v7";

export const IR_COMMUNICATIONS: IrCommunication[] = [
  {
    slug: "ceo-letter-q1-2026",
    category: "ceo_letter",
    title: "CEO Letter — Q1 2026",
    summary: "Founder commentary on capital preservation priorities and institutional growth.",
    body: "Dear Investors,\n\nQ1 2026 reinforced our commitment to disciplined risk management and systematic execution. PRYSM BLUE maintained controlled drawdowns while capturing favorable regime shifts in FX markets.\n\nWe remain focused on capital preservation as the foundation of long-term compounding.",
    publishedAt: "2026-03-15",
    author: "Arsalan Sarguru",
  },
  {
    slug: "quarterly-letter-q1-2026",
    category: "quarterly_letter",
    title: "Quarterly Investor Letter — Q1 2026",
    summary: "Comprehensive quarterly review of performance, risk, and outlook.",
    body: "Quarterly performance review covering equity curve analysis, drawdown metrics, strategy allocation, and forward-looking market regime assessment.",
    publishedAt: "2026-04-01",
    author: "Investor Relations",
  },
  {
    slug: "monthly-update-march-2026",
    category: "monthly_update",
    title: "Monthly Update — March 2026",
    summary: "March performance summary and portfolio positioning update.",
    body: "Monthly investor update with performance attribution, risk metrics, and operational highlights.",
    publishedAt: "2026-04-05",
    author: "Investor Relations",
  },
  {
    slug: "performance-commentary-march-2026",
    category: "performance_commentary",
    title: "Performance Commentary — March 2026",
    summary: "Detailed analysis of strategy performance and risk-adjusted returns.",
    body: "Performance commentary covering win rate, profit factor, Sharpe ratio, and benchmark comparison.",
    publishedAt: "2026-04-03",
    author: "Quantitative Research",
  },
  {
    slug: "market-commentary-april-2026",
    category: "market_commentary",
    title: "Market Commentary — April 2026",
    summary: "Macro outlook on FX, gold, and volatility regimes.",
    body: "Market commentary on central bank policy, USD dynamics, gold positioning, and systematic opportunity set.",
    publishedAt: "2026-04-08",
    author: "Macro Research",
  },
  {
    slug: "annual-review-2025",
    category: "annual_review",
    title: "Annual Review — 2025",
    summary: "Full-year institutional review for qualified investors.",
    body: "Annual review covering full-year returns, risk statistics, operational milestones, and 2026 strategic priorities.",
    publishedAt: "2026-01-20",
    author: "Investor Relations",
  },
  {
    slug: "investor-communication-april-2026",
    category: "investor_communication",
    title: "Investor Communication — Platform Update",
    summary: "Update on investor portal, reporting, and data room enhancements.",
    body: "Communication regarding enhanced investor portal features, monthly reporting automation, and secure data room access.",
    publishedAt: "2026-04-10",
    author: "Investor Relations",
  },
];

export function getIrCommunication(slug: string) {
  return IR_COMMUNICATIONS.find((c) => c.slug === slug);
}
