export const demoPortfolio = {
  totalValue: 1284500,
  dailyPnl: 12480,
  dailyPnlPct: 0.98,
  monthlyReturn: 3.7,
  ytdReturn: 24.8,
  maxDrawdown: -7.7,
  allocation: [
    { name: "Prysm Blue", value: 45, color: "#3B82F6" },
    { name: "Prysm Gold", value: 30, color: "#F59E0B" },
    { name: "Prysm Green", value: 25, color: "#22C55E" },
  ],
};

export const openTrades = [
  { pair: "EUR/USD", direction: "Long", size: "2.5 lots", entry: "1.0842", pnl: "+$1,240", strategy: "Prysm Blue" },
  { pair: "XAU/USD", direction: "Long", size: "1.0 lot", entry: "2,318.50", pnl: "+$680", strategy: "Prysm Gold" },
  { pair: "NVDA", direction: "Long", size: "150 shares", entry: "$875.20", pnl: "+$420", strategy: "Prysm Green" },
];

export const closedTrades = [
  { pair: "EUR/USD", direction: "Short", pnl: "+$890", date: "2026-03-08", strategy: "Prysm Blue" },
  { pair: "XAU/USD", direction: "Long", pnl: "+$1,120", date: "2026-03-07", strategy: "Prysm Gold" },
  { pair: "AAPL", direction: "Long", pnl: "-$180", date: "2026-03-06", strategy: "Prysm Green" },
  { pair: "EUR/USD", direction: "Long", pnl: "+$650", date: "2026-03-05", strategy: "Prysm Blue" },
];

export const demoRiskMetrics = [
  { label: "Sharpe Ratio", value: "1.84" },
  { label: "Sortino Ratio", value: "2.41" },
  { label: "Win Rate", value: "68.7%" },
  { label: "Profit Factor", value: "1.76" },
  { label: "Max Drawdown", value: "-7.7%" },
  { label: "Avg Trade Duration", value: "28.8h" },
];

export const demoEquityCurve = [
  { month: "Oct", value: 1100000 },
  { month: "Nov", value: 1150000 },
  { month: "Dec", value: 1180000 },
  { month: "Jan", value: 1210000 },
  { month: "Feb", value: 1250000 },
  { month: "Mar", value: 1284500 },
];
