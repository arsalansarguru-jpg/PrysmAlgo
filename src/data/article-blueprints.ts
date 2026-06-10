import type { ArticleBlueprint, SearchIntent } from "@/types/content";

const CATEGORY_COUNTS: { category: string; count: number; intent: SearchIntent }[] = [
  { category: "Algorithmic Trading", count: 40, intent: "informational" },
  { category: "AI Trading", count: 40, intent: "informational" },
  { category: "Risk Management", count: 30, intent: "informational" },
  { category: "Forex Markets", count: 20, intent: "commercial" },
  { category: "Gold Trading", count: 20, intent: "commercial" },
  { category: "Wealth Preservation", count: 20, intent: "informational" },
  { category: "Quantitative Investing", count: 20, intent: "informational" },
  { category: "Investor Education", count: 10, intent: "transactional" },
];

const TOPICS: Record<string, string[]> = {
  "Algorithmic Trading": [
    "Systematic Execution", "Order Routing", "Backtesting Frameworks", "Slippage Control",
    "Market Microstructure", "Liquidity Analysis", "Trade Filtering", "Signal Validation",
    "Portfolio Rebalancing", "Execution Algorithms", "VWAP Strategies", "TWAP Execution",
    "Smart Order Routing", "Latency Optimization", "Broker API Integration", "Cloud Infrastructure",
    "Multi-Asset Systems", "Regime Detection", "Trend Following Systems", "Mean Reversion Models",
    "Statistical Arbitrage", "Pairs Trading", "Momentum Strategies", "Factor Models",
    "Systematic Alpha", "Trade Attribution", "Performance Attribution", "Cost Analysis",
    "Infrastructure Scaling", "Disaster Recovery", "Failover Protocols", "Real-Time Monitoring",
    "Institutional Workflows", "Family Office Allocation", "Due Diligence Frameworks",
    "Vendor Evaluation", "Technology Stack Selection", "Compliance Automation", "Audit Trails",
    "Investor Reporting",
  ],
  "AI Trading": [
    "Neural Network Ensembles", "Machine Learning Pipelines", "Feature Engineering",
    "Model Validation", "Overfitting Prevention", "Walk-Forward Analysis", "Deep Learning Signals",
    "Reinforcement Learning", "Natural Language Processing", "Sentiment Analysis",
    "Alternative Data Integration", "Computer Vision in Finance", "Time Series Forecasting",
    "LSTM Models", "Transformer Architectures", "Gradient Boosting", "Ensemble Methods",
    "Model Governance", "AI Risk Controls", "Explainable AI", "Bias Detection",
    "Data Quality Pipelines", "Real-Time Inference", "Model Drift Detection", "Retraining Protocols",
    "GPU Infrastructure", "MLOps for Trading", "Signal Decay Analysis", "Alpha Decay",
    "Cross-Validation", "Hyperparameter Tuning", "Bayesian Optimization", "AutoML Systems",
    "Predictive Analytics", "Anomaly Detection", "Clustering Market Regimes", "AI Portfolio Construction",
    "Hybrid Quant-AI Models", "Blue Engine Architecture", "Institutional AI Adoption",
  ],
  "Risk Management": [
    "Drawdown Protection", "Position Sizing", "Stop Loss Protocols", "Volatility Targeting",
    "Value at Risk", "Conditional VaR", "Stress Testing", "Scenario Analysis",
    "Correlation Risk", "Tail Risk Hedging", "Maximum Drawdown Limits", "Risk Parity",
    "Kelly Criterion", "Risk Budgeting", "Exposure Limits", "Leverage Controls",
    "Emergency Stop Systems", "Circuit Breakers", "Liquidity Risk", "Concentration Risk",
    "Currency Risk", "Interest Rate Risk", "Black Swan Preparation", "Crisis Protocols",
    "Risk-Adjusted Returns", "Sharpe Optimization", "Sortino Analysis", "Calmar Ratios",
    "Portfolio Heat Maps", "Real-Time Risk Dashboards", "Investor Risk Profiling",
  ],
  "Forex Markets": [
    "EUR/USD Analysis", "Major Pairs Trading", "Cross Currency Strategies", "Carry Trades",
    "Central Bank Policy", "Interest Rate Differentials", "Forex Liquidity", "Session Overlaps",
    "Asian Session Trading", "London Session Dynamics", "NY Session Volatility", "News Trading Risk",
    "Forex Correlation Matrices", "Currency Hedging", "Emerging Market FX", "USD Index Impact",
    "ECB Policy Impact", "Fed Policy Impact", "Forex Execution Quality", "Pip Value Calculation",
  ],
  "Gold Trading": [
    "XAU/USD Strategies", "Gold Volatility Regimes", "Safe Haven Dynamics", "Inflation Hedging",
    "Central Bank Gold Demand", "Gold-Silver Ratio", "Commodity Correlation", "Gold Futures vs Spot",
    "Gold ETF Analysis", "Geopolitical Gold Impact", "USD-Gold Inverse Correlation", "Gold Seasonality",
    "Institutional Gold Allocation", "Gold Drawdown Analysis", "Prysm Gold Framework", "Gold Risk Management",
    "Gold Position Sizing", "Gold Market Structure", "Gold Liquidity Events", "Long-Term Gold Compounding",
  ],
  "Wealth Preservation": [
    "Capital Preservation", "Inflation Protection", "Drawdown Minimization", "Wealth Compounding",
    "Family Office Strategies", "Intergenerational Wealth", "Tax-Efficient Investing", "Diversification Principles",
    "Defensive Allocation", "Crisis-Resilient Portfolios", "Low Volatility Strategies", "Principal Protection",
    "Emergency Capital Reserves", "Wealth Transfer Planning", "Conservative Growth", "Income Preservation",
    "Real Return Targeting", "Purchasing Power Protection", "Institutional Wealth Management", "HNWI Allocation",
  ],
  "Quantitative Investing": [
    "Factor Investing", "Smart Beta", "Quantitative Screening", "Statistical Models",
    "Monte Carlo Simulation", "Portfolio Optimization", "Efficient Frontier", "Black-Litterman Models",
    "Risk Factor Decomposition", "Alpha Generation", "Beta Management", "Quantitative Due Diligence",
    "Systematic Rebalancing", "Quant Portfolio Construction", "Multi-Factor Models", "Style Factors",
    "Quality Factors", "Momentum Factors", "Value Factors", "Quantitative Backtesting",
  ],
  "Investor Education": [
    "Investor Due Diligence", "Reading Tear Sheets", "Understanding Drawdowns", "Evaluating Track Records",
    "Investor Onboarding", "KYC for Investors", "Risk Tolerance Assessment", "Portfolio Monitoring",
    "Performance Benchmarking", "Institutional Investor Guide",
  ],
};

const H2_TEMPLATES = [
  "Executive Summary",
  "Why This Matters for Institutional Investors",
  "Core Concepts and Definitions",
  "Practical Framework",
  "Risk Considerations",
  "Implementation Checklist",
  "Common Mistakes to Avoid",
  "How PrysmAlgo Approaches This",
  "FAQ",
];

const CTA_BLOCKS = [
  "After H2 section 2 — inline newsletter signup",
  "Mid-article — investor assessment CTA",
  "Before FAQ — book strategy call",
  "End of article — apply now + WhatsApp",
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generateBlueprints(): ArticleBlueprint[] {
  const blueprints: ArticleBlueprint[] = [];
  for (const { category, count, intent } of CATEGORY_COUNTS) {
    const topics = TOPICS[category];
    for (let i = 0; i < count; i++) {
      const topic = topics[i % topics.length];
      const variant = Math.floor(i / topics.length) + 1;
      const suffix = variant > 1 ? ` — Part ${variant}` : "";
      const slug = slugify(`${topic}-${category}-${i + 1}`);
      const keyword = `${topic.toLowerCase()} ${category.toLowerCase()}`;
      const h1 = `${topic}${suffix}: Institutional Guide for India & UAE Investors`;

      blueprints.push({
        slug,
        category,
        seoTitle: `${h1} | PrysmAlgo`,
        seoDescription: `Professional guide to ${topic.toLowerCase()} for qualified investors in India and UAE. Institutional frameworks, risk controls, and systematic approaches from PrysmAlgo.`,
        targetKeyword: keyword,
        secondaryKeywords: [
          `${topic.toLowerCase()} india`,
          `${topic.toLowerCase()} uae`,
          `institutional ${category.toLowerCase()}`,
          `prysmalgo ${topic.toLowerCase()}`,
        ],
        searchIntent: intent,
        h1,
        h2Structure: H2_TEMPLATES,
        faqs: [
          { question: `What is ${topic} in ${category}?`, answer: `${topic} is a core discipline within ${category} that institutional investors use to improve risk-adjusted returns through systematic, rules-based processes.` },
          { question: `How does PrysmAlgo apply ${topic}?`, answer: `PrysmAlgo integrates ${topic.toLowerCase()} into its Blue, Gold, and Green strategies with documented risk frameworks and live performance transparency.` },
          { question: `Is ${topic} suitable for HNWI investors in India and UAE?`, answer: `Qualified investors with appropriate capital and risk tolerance can evaluate ${topic.toLowerCase()} through our investor assessment and strategy consultation process.` },
        ],
        internalLinks: [
          { href: "/glossary", label: "Investor Glossary" },
          { href: "/live-performance", label: "Live Performance" },
          { href: "/risk-framework", label: "Risk Framework" },
          { href: `/tools/position-sizing-calculator`, label: "Position Sizing Calculator" },
          { href: "/investor-assessment", label: "Investor Assessment" },
        ],
        ctaPlacement: CTA_BLOCKS,
        status: "blueprint",
      });
    }
  }
  return blueprints;
}

export const ARTICLE_BLUEPRINTS = generateBlueprints();
export const BLUEPRINT_CATEGORIES = [...new Set(ARTICLE_BLUEPRINTS.map((b) => b.category))];

export function getBlueprintBySlug(slug: string) {
  return ARTICLE_BLUEPRINTS.find((b) => b.slug === slug);
}

export function getBlueprintsByCategory(category: string) {
  return ARTICLE_BLUEPRINTS.filter((b) => b.category === category);
}
