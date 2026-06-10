import type { SeoTool } from "@/types/content";

export const SEO_TOOLS: SeoTool[] = [
  {
    slug: "drawdown-calculator",
    title: "Drawdown Calculator",
    description: "Calculate maximum drawdown, recovery percentage, and capital required to recover from portfolio losses.",
    category: "Risk Management",
    calculatorId: "drawdown",
    keywords: ["drawdown calculator", "recovery calculator", "maximum drawdown tool"],
    faqs: [
      { question: "What is drawdown recovery?", answer: "A 50% loss requires a 100% gain to break even. This calculator shows the exact recovery percentage needed." },
    ],
  },
  {
    slug: "risk-calculator",
    title: "Risk Per Trade Calculator",
    description: "Calculate dollar risk per trade based on account size and risk percentage for institutional position management.",
    category: "Risk Management",
    calculatorId: "position",
    keywords: ["risk calculator", "risk per trade", "trading risk tool"],
    faqs: [
      { question: "What risk percentage do professionals use?", answer: "Most institutional systematic traders risk 0.5–2% per trade depending on strategy volatility." },
    ],
  },
  {
    slug: "position-sizing-calculator",
    title: "Position Sizing Calculator",
    description: "Determine optimal position size based on account equity, risk tolerance, and stop-loss distance.",
    category: "Risk Management",
    calculatorId: "position",
    keywords: ["position sizing calculator", "lot size calculator", "trade size tool"],
    faqs: [
      { question: "How does stop-loss distance affect position size?", answer: "Wider stops require smaller positions to maintain the same dollar risk." },
    ],
  },
  {
    slug: "profit-factor-calculator",
    title: "Profit Factor Calculator",
    description: "Calculate profit factor from gross wins and gross losses to evaluate strategy edge.",
    category: "Performance Metrics",
    calculatorId: "profit-factor",
    keywords: ["profit factor calculator", "trading edge calculator"],
    faqs: [
      { question: "What is a good profit factor?", answer: "Above 1.5 is acceptable; above 2.0 is strong for systematic strategies." },
    ],
  },
  {
    slug: "sharpe-ratio-calculator",
    title: "Sharpe Ratio Calculator",
    description: "Calculate risk-adjusted returns using return, risk-free rate, and standard deviation.",
    category: "Performance Metrics",
    calculatorId: "sharpe",
    keywords: ["sharpe ratio calculator", "risk adjusted return calculator"],
    faqs: [
      { question: "What Sharpe ratio is considered good?", answer: "Above 1.0 is good; above 2.0 is excellent for systematic strategies." },
    ],
  },
  {
    slug: "compounding-calculator",
    title: "Compounding Calculator",
    description: "Project portfolio growth with compound returns over multiple years.",
    category: "Wealth Preservation",
    calculatorId: "compound",
    keywords: ["compounding calculator", "compound interest calculator", "wealth growth calculator"],
    faqs: [
      { question: "How does compounding affect long-term wealth?", answer: "Reinvested returns accelerate growth exponentially over extended periods." },
    ],
  },
  {
    slug: "portfolio-allocation-calculator",
    title: "Portfolio Allocation Calculator",
    description: "Model multi-strategy allocation across Prysm Blue, Gold, and Green with custom weightings.",
    category: "Portfolio Management",
    calculatorId: "allocation",
    keywords: ["portfolio allocation calculator", "asset allocation tool"],
    faqs: [
      { question: "How should I allocate across strategies?", answer: "Allocation depends on risk tolerance, horizon, and diversification goals. Take our investor assessment for guidance." },
    ],
  },
];

export function getSeoTool(slug: string) {
  return SEO_TOOLS.find((t) => t.slug === slug);
}
