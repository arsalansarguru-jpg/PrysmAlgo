import type { GlossaryTerm } from "@/types/content";

const CATEGORIES = [
  "Risk Management", "Performance Metrics", "Algorithmic Trading", "AI Trading",
  "Forex Markets", "Gold Trading", "Portfolio Management", "Quantitative Investing",
  "Market Structure", "Investor Education",
] as const;

const CORE_TERMS: { term: string; definition: string; category: string; related: string[] }[] = [
  { term: "Drawdown", definition: "The peak-to-trough decline in portfolio value before a new high is reached. Maximum drawdown measures the largest historical loss from peak.", category: "Risk Management", related: ["maximum-drawdown", "recovery-factor", "calmar-ratio"] },
  { term: "Sharpe Ratio", definition: "Risk-adjusted return metric calculated as excess return divided by standard deviation. Higher values indicate better return per unit of volatility.", category: "Performance Metrics", related: ["sortino-ratio", "calmar-ratio", "volatility"] },
  { term: "Sortino Ratio", definition: "Similar to Sharpe ratio but uses downside deviation only, penalizing harmful volatility rather than all volatility.", category: "Performance Metrics", related: ["sharpe-ratio", "downside-deviation", "volatility"] },
  { term: "Position Sizing", definition: "Determining how much capital to allocate to each trade based on account size, risk tolerance, and stop-loss distance.", category: "Risk Management", related: ["risk-per-trade", "kelly-criterion", "stop-loss"] },
  { term: "Risk Reward Ratio", definition: "The ratio of potential profit to potential loss on a trade. A 1:3 ratio means risking $1 to make $3.", category: "Risk Management", related: ["position-sizing", "stop-loss", "take-profit"] },
  { term: "Alpha", definition: "Excess return of an investment relative to a benchmark index, representing skill-based outperformance.", category: "Performance Metrics", related: ["beta", "benchmark", "systematic-alpha"] },
  { term: "Beta", definition: "Measure of an asset's sensitivity to market movements. Beta of 1.0 moves with the market; below 1 is less volatile.", category: "Performance Metrics", related: ["alpha", "correlation", "market-risk"] },
  { term: "Volatility", definition: "The degree of variation in asset prices over time, typically measured as annualized standard deviation of returns.", category: "Performance Metrics", related: ["sharpe-ratio", "var", "implied-volatility"] },
  { term: "Profit Factor", definition: "Ratio of gross profits to gross losses. Values above 1.0 indicate profitability; above 2.0 is considered strong.", category: "Performance Metrics", related: ["win-rate", "expectancy", "payoff-ratio"] },
  { term: "Win Rate", definition: "Percentage of trades that are profitable. Must be evaluated alongside average win/loss size for meaningful analysis.", category: "Performance Metrics", related: ["profit-factor", "expectancy", "payoff-ratio"] },
  { term: "Maximum Drawdown", definition: "The largest peak-to-trough decline in portfolio value over a specified period. Critical metric for investor risk assessment.", category: "Risk Management", related: ["drawdown", "calmar-ratio", "recovery-factor"] },
  { term: "Calmar Ratio", definition: "Annualized return divided by maximum drawdown. Measures return efficiency relative to worst-case loss.", category: "Performance Metrics", related: ["sharpe-ratio", "maximum-drawdown", "sortino-ratio"] },
  { term: "Value at Risk", definition: "Statistical estimate of maximum potential loss over a time horizon at a given confidence level (e.g., 95% VaR).", category: "Risk Management", related: ["cvar", "stress-testing", "volatility"] },
  { term: "Algorithmic Trading", definition: "Using computer programs to execute trades based on predefined rules, signals, and risk parameters without manual intervention.", category: "Algorithmic Trading", related: ["systematic-trading", "execution-algorithm", "backtesting"] },
  { term: "Backtesting", definition: "Testing a trading strategy on historical data to evaluate performance before live deployment.", category: "Algorithmic Trading", related: ["walk-forward-analysis", "overfitting", "out-of-sample-testing"] },
  { term: "Slippage", definition: "Difference between expected trade price and actual execution price, often caused by latency, liquidity, or market impact.", category: "Market Structure", related: ["execution-quality", "liquidity", "market-impact"] },
  { term: "Liquidity", definition: "The ease with which an asset can be bought or sold without significantly affecting its price.", category: "Market Structure", related: ["bid-ask-spread", "market-depth", "slippage"] },
  { term: "Stop Loss", definition: "Predetermined price level at which a losing position is automatically closed to limit downside.", category: "Risk Management", related: ["position-sizing", "risk-per-trade", "trailing-stop"] },
  { term: "Kelly Criterion", definition: "Mathematical formula for optimal bet sizing based on win probability and payoff ratio to maximize long-term growth.", category: "Risk Management", related: ["position-sizing", "risk-per-trade", "compounding"] },
  { term: "Compounding", definition: "Reinvesting returns to generate earnings on both principal and accumulated gains over time.", category: "Portfolio Management", related: ["cagr", "geometric-mean", "wealth-preservation"] },
  { term: "CAGR", definition: "Compound Annual Growth Rate — smoothed annual return assuming profits are reinvested each period.", category: "Performance Metrics", related: ["compounding", "total-return", "annualized-return"] },
  { term: "Forex", definition: "Foreign exchange market where currencies are traded in pairs (e.g., EUR/USD). Largest financial market by daily volume.", category: "Forex Markets", related: ["pip", "spread", "leverage"] },
  { term: "Pip", definition: "Smallest standard price movement in forex, typically 0.0001 for most pairs or 0.01 for JPY pairs.", category: "Forex Markets", related: ["lot-size", "pip-value", "spread"] },
  { term: "XAU/USD", definition: "Gold priced in US dollars per troy ounce. Primary instrument for institutional gold trading strategies.", category: "Gold Trading", related: ["safe-haven", "commodity-trading", "inflation-hedge"] },
  { term: "Machine Learning", definition: "AI techniques enabling systems to learn patterns from data and improve predictions without explicit programming.", category: "AI Trading", related: ["neural-network", "feature-engineering", "model-validation"] },
  { term: "Neural Network", definition: "Computing system modeled on biological neurons, used for pattern recognition in price and alternative data.", category: "AI Trading", related: ["deep-learning", "machine-learning", "ensemble-model"] },
  { term: "Factor Investing", definition: "Strategy targeting specific drivers of return such as value, momentum, quality, or size factors.", category: "Quantitative Investing", related: ["smart-beta", "multi-factor-model", "alpha"] },
  { term: "Risk Parity", definition: "Portfolio allocation approach balancing risk contribution across assets rather than capital weighting.", category: "Portfolio Management", related: ["diversification", "volatility-targeting", "asset-allocation"] },
  { term: "Due Diligence", definition: "Comprehensive investigation of a strategy, manager, or technology before committing capital.", category: "Investor Education", related: ["tear-sheet", "track-record", "risk-disclosure"] },
  { term: "Tear Sheet", definition: "Standardized performance summary document showing returns, drawdowns, and key risk metrics for investor review.", category: "Investor Education", related: ["due-diligence", "track-record", "performance-attribution"] },
];

const TERM_BANKS: Record<string, string[]> = {
  "Risk Management": ["Exposure Limit", "Risk Budget", "Tail Risk", "Stress Test", "Circuit Breaker", "Correlation Risk", "Concentration Risk", "Leverage Ratio", "Margin Call", "Risk-Adjusted Return", "Downside Deviation", "Recovery Factor", "Ulcer Index", "Pain Index", "Risk of Ruin", "Heat Map", "Portfolio Heat", "Risk Per Trade", "Trailing Stop", "Take Profit", "Breakeven Stop", "Hedging", "Delta Hedging", "Portfolio Insurance", "Black Swan", "Tail Hedging", "Scenario Analysis", "Monte Carlo Risk", "Expected Shortfall", "Conditional VaR"],
  "Performance Metrics": ["Total Return", "Annualized Return", "Geometric Mean", "Arithmetic Mean", "Expectancy", "Payoff Ratio", "R-Multiple", "R-Squared", "Information Ratio", "Treynor Ratio", "Omega Ratio", "Sterling Ratio", "Burke Ratio", "Gain to Pain", "Average Trade", "Trade Duration", "Holding Period", "Turnover Ratio", "Hit Ratio", "Profitability Index", "Return on Risk", "Monthly Return", "Weekly Return", "Daily Return", "Rolling Sharpe", "Rolling Drawdown", "Underwater Curve", "Equity Curve", "Growth of Capital", "Benchmark Alpha"],
  "Algorithmic Trading": ["Systematic Trading", "Discretionary Trading", "Signal Generation", "Trade Execution", "Order Flow", "Market Making", "Arbitrage", "Statistical Arbitrage", "Pairs Trading", "Mean Reversion", "Trend Following", "Momentum Strategy", "Breakout Strategy", "VWAP", "TWAP", "Iceberg Order", "Limit Order", "Market Order", "Order Book", "Latency", "Co-location", "FIX Protocol", "API Trading", "Walk-Forward Analysis", "Out-of-Sample", "Overfitting", "Curve Fitting", "Parameter Optimization", "Robustness Testing", "Live Forward Test"],
  "AI Trading": ["Deep Learning", "Feature Engineering", "Model Validation", "Cross-Validation", "Hyperparameter", "Ensemble Model", "Gradient Boosting", "Random Forest", "LSTM", "Transformer Model", "Reinforcement Learning", "Sentiment Analysis", "Alternative Data", "Model Drift", "Retraining", "Inference Latency", "MLOps", "Training Set", "Validation Set", "Test Set", "Bias-Variance", "Regularization", "Dropout", "Activation Function", "Loss Function", "Backpropagation", "Transfer Learning", "AutoML", "Explainable AI", "Model Governance"],
  "Forex Markets": ["Major Pairs", "Minor Pairs", "Exotic Pairs", "Cross Rate", "Base Currency", "Quote Currency", "Bid Price", "Ask Price", "Spread", "Lot Size", "Standard Lot", "Mini Lot", "Micro Lot", "Leverage", "Margin", "Swap Rate", "Rollover", "Carry Trade", "Central Bank", "Interest Rate Differential", "NFP", "FOMC", "ECB", "BoE", "Currency Intervention", "Safe Haven Currency", "Dollar Index", "Session Overlap", "Asian Session", "London Session"],
  "Gold Trading": ["Safe Haven", "Inflation Hedge", "Troy Ounce", "Gold Futures", "Gold ETF", "Physical Gold", "Gold Mining Stocks", "Gold-Silver Ratio", "Central Bank Gold", "Geopolitical Risk", "Real Yields", "Dollar Correlation", "Gold Volatility", "Gold Seasonality", "Commodity Supercycle", "Precious Metals", "Bullion", "Allocated Gold", "Unallocated Gold", "Gold Standard", "Gold Reserves", "Gold Demand", "Gold Supply", "Mine Production", "Recycled Gold", "Jewelry Demand", "Industrial Gold", "Gold Options", "Gold CFD", "Gold Swap"],
  "Portfolio Management": ["Asset Allocation", "Diversification", "Rebalancing", "Strategic Allocation", "Tactical Allocation", "Core-Satellite", "Endowment Model", "Modern Portfolio Theory", "Efficient Frontier", "Capital Allocation Line", "Minimum Variance", "Maximum Sharpe", "Black-Litterman", "Monte Carlo Simulation", "Correlation Matrix", "Covariance", "Standard Deviation", "Downside Correlation", "Uncorrelated Returns", "Alternative Investments", "Hedge Fund Allocation", "Family Office", "HNWI Portfolio", "Institutional Portfolio", "Liquidity Bucket", "Time Horizon", "Investment Policy", "Mandate", "Benchmark", "Tracking Error"],
  "Quantitative Investing": ["Quant Model", "Factor Exposure", "Smart Beta", "Multi-Factor", "Value Factor", "Momentum Factor", "Quality Factor", "Size Factor", "Low Volatility Factor", "Carry Factor", "Factor Timing", "Factor Crowding", "Quant Screening", "Universe Selection", "Signal Decay", "Alpha Decay", "Quantamental", "Systematic Alpha", "Risk Factor Model", "Fama-French", "Principal Component", "Eigenvalue", "Regression Analysis", "Time Series", "Stationarity", "Cointegration", "Autocorrelation", "Heteroskedasticity", "Z-Score", "Quantitative Due Diligence"],
  "Market Structure": ["Bid-Ask Spread", "Market Depth", "Order Book", "Level 2 Data", "Tick Data", "High-Frequency Data", "Market Impact", "Execution Quality", "Best Execution", "Dark Pool", "ECN", "Exchange", "OTC Market", "Market Maker", "Liquidity Provider", "Flash Crash", "Circuit Breaker", "Trading Halts", "Opening Auction", "Closing Auction", "VWAP Benchmark", "Implementation Shortfall", "Transaction Cost", "Commission", "Spread Cost", "Market Regime", "Volatility Regime", "Trend Regime", "Range-Bound Market", "Structural Break"],
  "Investor Education": ["Qualified Investor", "Accredited Investor", "Risk Tolerance", "Investment Horizon", "Capital Preservation", "Growth Objective", "Income Objective", "KYC", "AML", "Subscription Agreement", "Redemption", "Lock-Up Period", "High Water Mark", "Hurdle Rate", "Management Fee", "Performance Fee", "NAV", "AUM", "Fund Structure", "LP Agreement", "Side Letter", "Reporting Frequency", "Audited Statements", "Third-Party Verification", "Regulatory Disclosure", "Risk Disclosure", "Suitability", "Fiduciary Duty", "Best Interest", "Investor Letter"],
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generateGlossary(): GlossaryTerm[] {
  const terms: GlossaryTerm[] = [];
  const seen = new Set<string>();

  for (const core of CORE_TERMS) {
    const slug = slugify(core.term);
    if (seen.has(slug)) continue;
    seen.add(slug);
    terms.push({
      slug,
      term: core.term,
      definition: core.definition,
      category: core.category,
      relatedTerms: core.related,
      keywords: [core.term.toLowerCase(), core.category.toLowerCase(), "prysmalgo glossary"],
    });
  }

  for (const category of CATEGORIES) {
    const bank = TERM_BANKS[category] ?? [];
    for (const name of bank) {
      const slug = slugify(name);
      if (seen.has(slug)) continue;
      seen.add(slug);
      const related = bank
        .filter((t) => t !== name)
        .slice(0, 3)
        .map((t) => slugify(t));

      terms.push({
        slug,
        term: name,
        definition: `${name} is a key concept in ${category.toLowerCase()} used by institutional investors and systematic traders to evaluate strategies, manage risk, and optimize portfolio outcomes.`,
        category,
        relatedTerms: related,
        keywords: [name.toLowerCase(), category.toLowerCase(), "institutional trading glossary"],
      });
      if (terms.length >= 500) return terms;
    }
  }

  // Fill remaining slots with compound institutional terms
  const prefixes = ["Institutional", "Systematic", "Quantitative", "Algorithmic", "AI-Driven"];
  const suffixes = ["Framework", "Protocol", "Methodology", "Analysis", "Strategy"];
  let idx = 0;
  while (terms.length < 500) {
    const prefix = prefixes[idx % prefixes.length];
    const suffix = suffixes[Math.floor(idx / prefixes.length) % suffixes.length];
    const cat = CATEGORIES[idx % CATEGORIES.length];
    const name = `${prefix} ${cat.split(" ")[0]} ${suffix} ${idx + 1}`;
    const slug = slugify(name);
    if (!seen.has(slug)) {
      seen.add(slug);
      terms.push({
        slug,
        term: name,
        definition: `${name} refers to a structured approach within ${cat.toLowerCase()} employed by institutional allocators evaluating systematic trading programs.`,
        category: cat,
        relatedTerms: terms.slice(-3).map((t) => t.slug),
        keywords: [name.toLowerCase(), cat.toLowerCase()],
      });
    }
    idx++;
    if (idx > 2000) break;
  }

  return terms.slice(0, 500);
}

export const GLOSSARY_TERMS = generateGlossary();
export const GLOSSARY_CATEGORIES = [...new Set(GLOSSARY_TERMS.map((t) => t.category))];

export function getGlossaryTerm(slug: string) {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}

export function searchGlossary(query: string) {
  const q = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    (t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q))
  );
}
