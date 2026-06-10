export const PRESERVATION_PILLARS = [
  {
    title: "Drawdown Control",
    description: "Maximum drawdown limits enforced at strategy and portfolio level. PRYSM GOLD maintains only -2.3% historical max drawdown.",
    diagram: "Peak → Trough monitoring with automatic position reduction at -5% monthly threshold.",
  },
  {
    title: "Position Sizing",
    description: "Every trade sized by account equity, stop distance, and portfolio heat. No discretionary overrides.",
    diagram: "Risk% × Account ÷ Stop Distance = Position Size",
  },
  {
    title: "Risk Filters",
    description: "Pre-trade filters block entries during high-impact events, low liquidity, and adverse correlation regimes.",
    diagram: "Signal → Filter Chain → Risk Check → Execution",
  },
  {
    title: "Market Regime Detection",
    description: "AI-powered regime classification adapts strategy parameters to volatility environments.",
    diagram: "Low Vol → Normal sizing | High Vol → Reduced exposure | Crisis → Emergency protocol",
  },
  {
    title: "Trade Management",
    description: "Dynamic stop management, trailing protocols, and time-based exits prevent runaway losses.",
    diagram: "Entry → Initial Stop → Breakeven → Trail → Exit",
  },
  {
    title: "Portfolio Protection",
    description: "Multi-strategy diversification reduces portfolio-level correlation and drawdown risk.",
    diagram: "Blue (Forex) + Gold (Commodities) + Green (Equities) = Uncorrelated alpha streams",
  },
  {
    title: "Emergency Shutdown",
    description: "Automated circuit breakers halt all trading when predefined catastrophic thresholds are breached.",
    diagram: "Drawdown > Limit → Halt → Notify → Manual Review → Resume",
  },
];
