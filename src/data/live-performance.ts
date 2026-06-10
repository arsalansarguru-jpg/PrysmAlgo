/** CMS-ready live performance data — replace values via JSON or CMS */

export const livePerformanceMetrics = {
  annualReturn: 56.1,
  monthlyReturn: 3.7,
  ytdReturn: 24.8,
  maxDrawdown: -7.7,
  winRate: 68.7,
  profitFactor: 1.76,
  sharpeRatio: 1.84,
  avgTradeDurationHours: 28.8,
  totalReturn: 179.9,
  liveDays: 844,
};

export const equityCurveSeries = [
  { month: "Jan 24", value: 100 },
  { month: "Apr 24", value: 112 },
  { month: "Jul 24", value: 128 },
  { month: "Oct 24", value: 145 },
  { month: "Jan 25", value: 162 },
  { month: "Apr 25", value: 178 },
  { month: "Jul 25", value: 195 },
  { month: "Nov 25", value: 279.9 },
];

export const monthlyReturnsSeries = [
  { month: "Jan", return: 3.2 },
  { month: "Feb", return: 2.8 },
  { month: "Mar", return: 1.9 },
  { month: "Apr", return: 3.5 },
  { month: "May", return: 2.1 },
  { month: "Jun", return: 4.2 },
  { month: "Jul", return: 3.8 },
  { month: "Aug", return: 2.4 },
  { month: "Sep", return: 3.1 },
  { month: "Oct", return: 2.9 },
  { month: "Nov", return: 23.3 },
  { month: "Dec", return: 3.7 },
];

export const drawdownSeries = [
  { month: "Jan", drawdown: -1.2 },
  { month: "Feb", drawdown: -0.8 },
  { month: "Mar", drawdown: -2.1 },
  { month: "Apr", drawdown: -1.5 },
  { month: "May", drawdown: -3.2 },
  { month: "Jun", drawdown: -1.8 },
  { month: "Jul", drawdown: -2.4 },
  { month: "Aug", drawdown: -4.0 },
  { month: "Sep", drawdown: -2.6 },
  { month: "Oct", drawdown: -1.9 },
  { month: "Nov", drawdown: -3.8 },
  { month: "Dec", drawdown: -7.7 },
];

export const growthOfCapital = equityCurveSeries.map((p) => ({
  month: p.month,
  value: p.value * 10000,
}));

export const monthlyReports = [
  { month: "November 2025", title: "Monthly Investor Report", size: "2.4 MB", path: "#" },
  { month: "October 2025", title: "Monthly Investor Report", size: "2.1 MB", path: "#" },
  { month: "September 2025", title: "Monthly Investor Report", size: "2.3 MB", path: "#" },
  { month: "Q3 2025", title: "Quarterly Performance Summary", size: "4.8 MB", path: "#" },
];

export const performanceHistory = [
  { period: "2025 YTD", return: 24.8, drawdown: -7.7, trades: 1842 },
  { period: "2024", return: 68.4, drawdown: -6.2, trades: 1620 },
  { period: "2023", return: 42.1, drawdown: -5.8, trades: 580 },
];

export const riskMetricsLive = [
  { label: "Sharpe Ratio", value: "1.84" },
  { label: "Sortino Ratio", value: "2.41" },
  { label: "Calmar Ratio", value: "2.71" },
  { label: "Volatility (Ann.)", value: "8.2%" },
  { label: "Beta", value: "0.32" },
  { label: "Alpha", value: "12.4%" },
];
