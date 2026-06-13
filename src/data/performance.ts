import { PRYSM_STRATEGIES } from "./strategies";

const prysmBlue = PRYSM_STRATEGIES.find((s) => s.id === "blue")!;
const prysmGold = PRYSM_STRATEGIES.find((s) => s.id === "gold")!;
const prysmGreen = PRYSM_STRATEGIES.find((s) => s.id === "green")!;

/**
 * Single source of truth for Prysm Blue headline metrics. Every surface
 * (homepage hero, institutional metrics block, live performance fallback)
 * must read from here so figures never contradict across pages.
 */
export const PRYSM_BLUE_SHARPE = 1.84;

export const headlineMetrics = {
  sharpeRatio: PRYSM_BLUE_SHARPE,
  winRate: prysmBlue.winRate,
  maxDrawdown: prysmBlue.maxDrawdown,
  totalReturn: prysmBlue.totalReturn,
  monthlyReturn: prysmBlue.monthlyAvg,
  profitFactor: prysmBlue.profitFactor,
};

/** Data provenance label shown alongside every metric block. */
export const PERFORMANCE_SOURCE_LABEL =
  "Prysm Blue · institutional tear sheet (Nov 2025)";

/** Prysm Blue — all figures from institutional tear sheet (Nov 2025) */
export const performanceOverview = {
  totalReturn: prysmBlue.totalReturn,
  monthlyReturn: prysmBlue.monthlyAvg,
  weeklyReturn: prysmBlue.weeklyAvg ?? 0.9,
  maxDrawdown: prysmBlue.maxDrawdown,
  winRate: prysmBlue.winRate,
  riskRewardRatio: 0.8,
  profitFactor: prysmBlue.profitFactor,
};

export const equityCurveData = [
  { month: "Jan", value: 1000000, benchmark: 1000000 },
  { month: "Feb", value: 1012000, benchmark: 1003000 },
  { month: "Mar", value: 1028000, benchmark: 1001000 },
  { month: "Apr", value: 1035000, benchmark: 1008000 },
  { month: "May", value: 1042000, benchmark: 1012000 },
  { month: "Jun", value: 1058000, benchmark: 1015000 },
  { month: "Jul", value: 1065000, benchmark: 1020000 },
  { month: "Aug", value: 1072000, benchmark: 1018000 },
  { month: "Sep", value: 1085000, benchmark: 1025000 },
  { month: "Oct", value: 1098000, benchmark: 1030000 },
  { month: "Nov", value: 1112000, benchmark: 1035000 },
  { month: "Dec", value: 1184000, benchmark: 1042000 },
];

export const monthlyReturns = [
  { month: "January", return: 1.2, benchmark: 0.3 },
  { month: "February", return: 1.6, benchmark: 0.5 },
  { month: "March", return: 0.7, benchmark: -0.2 },
  { month: "April", return: 0.7, benchmark: 0.7 },
  { month: "May", return: 0.7, benchmark: 0.4 },
  { month: "June", return: 1.5, benchmark: 0.3 },
  { month: "July", return: 0.7, benchmark: 0.5 },
  { month: "August", return: 0.7, benchmark: -0.2 },
  { month: "September", return: 1.2, benchmark: 0.7 },
  { month: "October", return: 1.2, benchmark: 0.5 },
  { month: "November", return: 1.3, benchmark: 0.5 },
  { month: "December", return: 6.5, benchmark: 0.7 },
];

export const riskMetrics = [
  { label: "Sharpe Ratio", value: "1.84", description: "Risk-adjusted return efficiency" },
  { label: "Sortino Ratio", value: "2.41", description: "Downside risk-adjusted return" },
  { label: "Calmar Ratio", value: "2.71", description: "Return vs maximum drawdown" },
  { label: "Volatility (Ann.)", value: "8.2%", description: "Annualized portfolio volatility" },
  { label: "Beta", value: "0.32", description: "Market correlation coefficient" },
  { label: "Alpha", value: "12.4%", description: "Excess return over benchmark" },
];

/** Prysm strategies use cumulative total return from tear sheets / live dashboard */
export const benchmarkComparison = [
  {
    name: "PRYSM BLUE",
    totalReturn: prysmBlue.totalReturn,
    monthlyReturn: prysmBlue.monthlyAvg,
    sharpe: 1.84,
    maxDD: prysmBlue.maxDrawdown,
    isPrysm: true,
  },
  {
    name: "PRYSM GOLD",
    totalReturn: prysmGold.totalReturn,
    monthlyReturn: prysmGold.monthlyAvg,
    sharpe: 2.1,
    maxDD: prysmGold.maxDrawdown,
    isPrysm: true,
  },
  {
    name: "PRYSM GREEN",
    totalReturn: prysmGreen.totalReturn,
    monthlyReturn: prysmGreen.monthlyAvg,
    sharpe: 3.25,
    maxDD: prysmGreen.maxDrawdown,
    isPrysm: true,
  },
  { name: "S&P 500", annualReturn: 4.2, sharpe: 0.62, maxDD: -12.4, isPrysm: false },
  { name: "Hedge Fund Index", annualReturn: 6.8, sharpe: 0.91, maxDD: -8.2, isPrysm: false },
  { name: "60/40 Portfolio", annualReturn: 5.1, sharpe: 0.74, maxDD: -10.1, isPrysm: false },
];
