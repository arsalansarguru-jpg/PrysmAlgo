export type StrategyMetricsSource = "tear-sheet" | "live-dashboard";

export interface PrysmStrategy {
  id: "blue" | "gold" | "green";
  name: string;
  tagline: string;
  market: string;
  instrument: string;
  liveDays: number;
  totalReturn: number;
  monthlyAvg: number;
  weeklyAvg?: number;
  dailyAvg?: number;
  annualReturn?: number;
  maxDrawdown: number;
  profitFactor: number;
  winRate: number;
  totalTrades: number;
  tradesPerDay?: number;
  capitalMultiple?: number;
  accentColor: string;
  accentClass: string;
  tearSheetPath: string;
  performanceUrl?: string;
  metricsSource: StrategyMetricsSource;
  description: string;
  highlights: string[];
  verification: string;
}

/** All figures below are taken directly from institutional tear sheets unless noted. */
export const PRYSM_STRATEGIES: PrysmStrategy[] = [
  {
    id: "blue",
    name: "PRYSM BLUE",
    tagline: "Performance is not promised. It is engineered.",
    market: "Forex",
    instrument: "EUR/USD",
    liveDays: 844,
    totalReturn: 179.9,
    monthlyAvg: 3.7,
    weeklyAvg: 0.9,
    maxDrawdown: -7.7,
    profitFactor: 1.76,
    winRate: 68.7,
    totalTrades: 4042,
    tradesPerDay: 4.8,
    accentColor: "#3B82F6",
    accentClass: "text-blue-400",
    tearSheetPath: "/tear-sheets/prysm-blue-institutional-analysis.pdf",
    metricsSource: "tear-sheet",
    description:
      "Systemic risk control and long-term survivability across 844 days of live EUR/USD execution. +179.9% cumulative total return per institutional tear sheet (Nov 2025).",
    highlights: [
      "+179.9% cumulative total return (844 days)",
      "+3.7% monthly average · +0.9% weekly average",
      "4,042 trades · profit factor 1.76 · 68.7% win rate",
      "Maximum drawdown -7.7% · 100% EUR/USD",
    ],
    verification: "Semi-verified real account · Tear sheet Nov 2025",
  },
  {
    id: "gold",
    name: "PRYSM GOLD",
    tagline: "Quiet capital compounds.",
    market: "Commodities",
    instrument: "XAU/USD (Gold)",
    liveDays: 669,
    totalReturn: 136.13,
    monthlyAvg: 3.9,
    weeklyAvg: 0.9,
    dailyAvg: 0.18,
    maxDrawdown: -2.3,
    profitFactor: 5.91,
    winRate: 80.9,
    totalTrades: 178,
    tradesPerDay: 0.4,
    capitalMultiple: 2.36,
    accentColor: "#F59E0B",
    accentClass: "text-amber-400",
    tearSheetPath: "/tear-sheets/prysm-gold-institutional-analysis.pdf",
    metricsSource: "tear-sheet",
    description:
      "$30,000 compounded to $70,838.59 with zero withdrawals over 669 days. +136.13% total return and 2.36x capital multiple per institutional tear sheet (Jan 2026).",
    highlights: [
      "+136.13% total return · 2.36x capital multiple",
      "+3.9% monthly · +0.9% weekly · +0.18% daily average",
      "178 trades · profit factor 5.91 · 80.9% win rate",
      "Maximum drawdown only -2.3% · 100% XAU/USD",
    ],
    verification: "Real account (semi-verified) · Tear sheet updated Jan 2026",
  },
  {
    id: "green",
    name: "PRYSM GREEN",
    tagline: "The numbers, unfiltered.",
    market: "US Equities",
    instrument: "US Equity Markets",
    liveDays: 2000,
    totalReturn: 1192.39,
    monthlyAvg: 3.51,
    annualReturn: 50.62,
    maxDrawdown: -9.16,
    profitFactor: 2.13,
    winRate: 47.8,
    totalTrades: 3884,
    accentColor: "#22C55E",
    accentClass: "text-green-400",
    tearSheetPath: "/tear-sheets/prysm-green-institutional-analysis.pdf",
    performanceUrl: "https://green.prysmalgo.com",
    metricsSource: "live-dashboard",
    description:
      "Live US equity markets algorithm with full transparency. Structural break protocol — every trade logged, timestamped, and visible on the live performance dashboard.",
    highlights: [
      "+1,192% cumulative return · 50.6% CAGR (live)",
      "+3.5% monthly average · 3,884 trades",
      "Profit factor 2.13 · Sharpe ratio 3.25",
      "Live dashboard at green.prysmalgo.com",
    ],
    verification: "Live & verified · Updated from green.prysmalgo.com · Jun 2026",
  },
];

export const GREEN_PERFORMANCE_URL = "https://green.prysmalgo.com";

export function getStrategyById(id: PrysmStrategy["id"]) {
  return PRYSM_STRATEGIES.find((s) => s.id === id);
}

export function formatStrategyReturn(value: number): string {
  if (value >= 1000) {
    return `+${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`;
  }
  return `+${value % 1 === 0 ? value : value.toFixed(2)}%`;
}

export function formatPercent(value: number | undefined | null): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `+${value % 1 === 0 ? value : value.toFixed(1)}%`;
}
