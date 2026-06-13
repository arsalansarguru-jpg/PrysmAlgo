import type { BlogPost, CaseStudy, FAQ, Testimonial } from "@/types";

export const trustItems = [
  "Capital Preservation Focus",
  "Institutional Risk Controls",
  "Performance-Based Model",
  "Fully Automated Execution",
  "24/5 Monitoring",
];

export const features = [
  {
    title: "AI Execution Engine",
    description:
      "Proprietary machine learning models analyze market microstructure and execute with institutional precision across multiple asset classes.",
    icon: "Brain",
  },
  {
    title: "Institutional Risk Framework",
    description:
      "Multi-layered risk controls with position sizing, exposure limits, and real-time portfolio monitoring aligned with institutional standards.",
    icon: "Shield",
  },
  {
    title: "Multi-Market Analysis",
    description:
      "Cross-asset correlation analysis spanning forex, indices, and commodities with regime detection and adaptive strategy allocation.",
    icon: "Globe",
  },
  {
    title: "Transparent Reporting",
    description:
      "Monthly investor reports with detailed performance attribution, risk metrics, and trade analytics delivered with full transparency.",
    icon: "FileText",
  },
  {
    title: "Automated Execution",
    description:
      "Low-latency execution infrastructure with smart order routing, slippage minimization, and 24/5 market surveillance.",
    icon: "Zap",
  },
  {
    title: "Capital Preservation",
    description:
      "Drawdown protection protocols and emergency stop systems designed to protect investor capital during adverse market conditions.",
    icon: "Lock",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Apply",
    description: "Submit your investor application with capital requirements and investment objectives.",
  },
  {
    step: 2,
    title: "Verification",
    description: "Our team conducts KYC/AML verification and suitability assessment.",
  },
  {
    step: 3,
    title: "Broker Connection",
    description: "Secure connection to your regulated brokerage account via API integration.",
  },
  {
    step: 4,
    title: "Strategy Activation",
    description: "Customized strategy parameters aligned with your risk profile and goals.",
  },
  {
    step: 5,
    title: "Automated Execution",
    description: "AI-powered systems execute trades with institutional risk controls active.",
  },
  {
    step: 6,
    title: "Monthly Reporting",
    description: "Comprehensive performance and risk reports delivered to your investor portal.",
  },
];

export const blueEngineComponents = [
  {
    title: "AI Decision Engine",
    description: "Neural network ensemble for signal generation and trade selection",
    metric: "94.2% signal accuracy",
  },
  {
    title: "Risk Layer",
    description: "Real-time position sizing and exposure management",
    metric: "1.5% max risk/trade",
  },
  {
    title: "Market Scanner",
    description: "Multi-timeframe analysis across 40+ instruments",
    metric: "40+ markets",
  },
  {
    title: "Execution Engine",
    description: "Sub-millisecond order routing and fill optimization",
    metric: "<5ms latency",
  },
  {
    title: "Portfolio Optimizer",
    description: "Dynamic allocation based on correlation and volatility regimes",
    metric: "8-12 positions",
  },
];

export const riskCards = [
  {
    title: "Maximum Risk Per Trade",
    value: "1.5%",
    description: "Hard cap on capital at risk per individual position",
  },
  {
    title: "Portfolio Exposure Limits",
    value: "25%",
    description: "Maximum aggregate exposure across all open positions",
  },
  {
    title: "Emergency Stop Systems",
    value: "Active",
    description: "Automated circuit breakers triggered by predefined thresholds",
  },
  {
    title: "Drawdown Protection",
    value: "-8%",
    description: "Strategy pause and risk reduction at drawdown threshold",
  },
  {
    title: "Capital Preservation Layer",
    value: "Tier 1",
    description: "Priority capital protection protocols during volatility spikes",
  },
  {
    title: "Risk Monitoring Engine",
    value: "24/5",
    description: "Continuous surveillance with real-time alerting infrastructure",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "James Richardson",
    role: "Managing Partner",
    company: "Meridian Capital Partners",
    quote:
      "PrysmAlgo's risk-first approach aligns perfectly with our institutional mandate. The transparency in reporting and disciplined execution have exceeded our expectations over 18 months.",
    avatar: "JR",
  },
  {
    name: "Elena Vasquez",
    role: "Chief Investment Officer",
    company: "Atlas Wealth Management",
    quote:
      "After evaluating numerous algorithmic providers, PrysmAlgo stood out for their institutional-grade infrastructure and capital preservation focus. A genuine partner, not a signal service.",
    avatar: "EV",
  },
  {
    name: "David Chen",
    role: "Family Office Principal",
    company: "Chen Family Office",
    quote:
      "The monthly reporting and risk analytics provide the level of detail we require for our investment committee. Consistent performance with controlled drawdowns.",
    avatar: "DC",
  },
  {
    name: "Sarah Whitfield",
    role: "Portfolio Manager",
    company: "Whitfield Investments",
    quote:
      "PrysmAlgo delivers what they promise: disciplined, automated execution with institutional risk controls. Our allocation has grown significantly based on performance.",
    avatar: "SW",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    title: "Conservative Growth Portfolio",
    startingCapital: 2500000,
    riskProfile: "Conservative",
    duration: "24 months",
    growth: 34.2,
    description:
      "A family office seeking capital preservation with moderate growth deployed a conservative risk profile across forex and index strategies.",
  },
  {
    id: "cs-2",
    title: "Balanced Institutional Allocation",
    startingCapital: 5000000,
    riskProfile: "Moderate",
    duration: "18 months",
    growth: 28.7,
    description:
      "An institutional allocator diversified across multiple PrysmAlgo strategies with moderate risk parameters and monthly rebalancing.",
  },
  {
    id: "cs-3",
    title: "Growth-Oriented Strategy",
    startingCapital: 1000000,
    riskProfile: "Growth",
    duration: "12 months",
    growth: 22.1,
    description:
      "A high-net-worth individual allocated to growth-oriented parameters with enhanced multi-market exposure and active risk management.",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What is the minimum investment amount?",
    answer:
      "PrysmAlgo accepts qualified investors with a minimum allocation of $250,000 USD. This threshold ensures we can deliver institutional-grade service and risk management to each investor relationship.",
  },
  {
    question: "How is my capital protected?",
    answer:
      "Your capital remains in your own regulated brokerage account at all times. PrysmAlgo connects via secure API and never has custody of your funds. Our multi-layered risk framework includes position limits, drawdown protection, and emergency stop systems.",
  },
  {
    question: "What markets do you trade?",
    answer:
      "Our systems operate across major forex pairs, global indices, and select commodities. All instruments are highly liquid, regulated markets with transparent pricing and institutional-grade execution infrastructure.",
  },
  {
    question: "How are fees structured?",
    answer:
      "We operate on a performance-based fee model aligned with investor interests. A management fee plus performance allocation applies only on profits above a high-water mark. Full fee disclosure is provided during the application process.",
  },
  {
    question: "What is the expected drawdown?",
    answer:
      "Historical maximum drawdown has been -7.7% with our standard risk parameters. We implement automatic risk reduction protocols at -5% and strategy pause at -8% drawdown. Past performance does not guarantee future results.",
  },
  {
    question: "How often do I receive reports?",
    answer:
      "Investors receive comprehensive monthly performance reports including equity curves, risk metrics, trade analytics, and attribution analysis. Real-time dashboard access is available through the investor portal.",
  },
  {
    question: "Is PrysmAlgo regulated?",
    answer:
      "PrysmAlgo operates as a technology provider connecting to regulated brokerage partners. We maintain strict compliance with applicable financial regulations and conduct full KYC/AML verification for all investors.",
  },
  {
    question: "Can I withdraw my capital at any time?",
    answer:
      "Yes. Since your capital remains in your own brokerage account, you maintain full control and can withdraw funds according to your broker's standard procedures. We recommend providing notice for orderly position management.",
  },
  {
    question: "What technology powers the trading systems?",
    answer:
      "Our proprietary Blue Engine combines machine learning signal generation, institutional risk management, multi-market analysis, and low-latency execution infrastructure. The system has been developed and refined over five years.",
  },
  {
    question: "How do I get started?",
    answer:
      "Submit an application through our investor portal. After verification and suitability assessment, we guide you through broker connection and strategy activation. The entire onboarding process typically takes 5-10 business days.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "institutional-risk-management-2026",
    title: "Institutional Risk Management in Algorithmic Trading",
    excerpt:
      "How leading quantitative firms approach risk management and why capital preservation must precede return optimization.",
    category: "Risk Management",
    date: "2026-05-15",
    readTime: "8 min",
    author: "PrysmAlgo Research",
  },
  {
    slug: "ai-finance-evolution",
    title: "The Evolution of AI in Quantitative Finance",
    excerpt:
      "From rule-based systems to neural network ensembles: tracing the technological evolution reshaping institutional trading.",
    category: "AI in Finance",
    date: "2026-05-08",
    readTime: "12 min",
    author: "PrysmAlgo Research",
  },
  {
    slug: "forex-market-structure",
    title: "Understanding Modern Forex Market Structure",
    excerpt:
      "An institutional perspective on liquidity, execution quality, and algorithmic opportunities in global currency markets.",
    category: "Forex Markets",
    date: "2026-04-28",
    readTime: "10 min",
    author: "PrysmAlgo Research",
  },
  {
    slug: "drawdown-protection-strategies",
    title: "Drawdown Protection: Beyond Stop Losses",
    excerpt:
      "Multi-layered approaches to capital preservation including regime detection, correlation analysis, and dynamic position sizing.",
    category: "Investment Strategy",
    date: "2026-04-18",
    readTime: "9 min",
    author: "PrysmAlgo Research",
  },
  {
    slug: "algorithmic-execution-quality",
    title: "Measuring Algorithmic Execution Quality",
    excerpt:
      "Key metrics institutional investors should evaluate when assessing algorithmic trading execution and slippage analysis.",
    category: "Algorithmic Trading",
    date: "2026-04-05",
    readTime: "7 min",
    author: "PrysmAlgo Research",
  },
  {
    slug: "market-insights-q1-2026",
    title: "Q1 2026 Market Insights: Volatility Regimes",
    excerpt:
      "Analysis of shifting volatility regimes across major asset classes and implications for systematic trading strategies.",
    category: "Market Insights",
    date: "2026-03-22",
    readTime: "11 min",
    author: "PrysmAlgo Research",
  },
];

export const blogCategories = [
  "All",
  "Market Insights",
  "Risk Management",
  "Algorithmic Trading",
  "Forex Markets",
  "AI in Finance",
  "Investment Strategy",
];
