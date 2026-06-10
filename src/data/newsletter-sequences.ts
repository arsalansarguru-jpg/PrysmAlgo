import type { NewsletterEdition } from "@/types/content";

export const NEWSLETTER_TYPES = [
  { id: "weekly-insights", label: "Weekly Market Insights", description: "Macro summary, forex/gold outlook, and systematic positioning.", frequency: "Weekly" },
  { id: "monthly-performance", label: "Monthly Performance Report", description: "Strategy returns, drawdown analysis, and risk metrics.", frequency: "Monthly" },
  { id: "quarterly-letter", label: "Quarterly Investor Letter", description: "Long-form attribution, outlook, and governance update.", frequency: "Quarterly" },
] as const;

export const NEWSLETTER_EDITIONS: NewsletterEdition[] = [
  { slug: "weekly-insights-mar-w1-2026", type: "weekly-insights", title: "Weekly Insights — March Week 1", date: "2026-03-03", excerpt: "FOMC preview, EUR/USD structure, gold volatility regime.", sequence: 1 },
  { slug: "weekly-insights-feb-w4-2026", type: "weekly-insights", title: "Weekly Insights — February Week 4", date: "2026-02-24", excerpt: "NFP reaction, systematic positioning update.", sequence: 2 },
  { slug: "monthly-performance-feb-2026", type: "monthly-performance", title: "February 2026 Performance Report", date: "2026-03-01", excerpt: "Monthly returns, drawdown metrics, trade attribution.", sequence: 1 },
  { slug: "monthly-performance-jan-2026", type: "monthly-performance", title: "January 2026 Performance Report", date: "2026-02-01", excerpt: "Strategy breakdown and risk dashboard summary.", sequence: 2 },
  { slug: "quarterly-letter-q1-2026", type: "quarterly-letter", title: "Q1 2026 Investor Letter", date: "2026-01-15", excerpt: "Quarterly attribution, governance, and forward outlook.", sequence: 1 },
];

/** Lead nurturing sequence — 5-touch onboarding */
export const NURTURE_SEQUENCE = [
  { day: 0, subject: "Welcome to PrysmAlgo Research", cta: "/downloads/ultimate-algorithmic-trading-guide", action: "Download Algo Guide" },
  { day: 2, subject: "Understanding Live Performance", cta: "/live-performance", action: "View Live Performance" },
  { day: 5, subject: "Risk Framework Essentials", cta: "/risk-framework", action: "Read Risk Framework" },
  { day: 8, subject: "Take the Investor Assessment", cta: "/investor-assessment", action: "Start Assessment" },
  { day: 14, subject: "Schedule Your Strategy Call", cta: "calendly", action: "Book Consultation" },
] as const;
