import type { UniversityCourse } from "@/types/intelligence";

export const UNIVERSITY_COURSES: UniversityCourse[] = [
  {
    slug: "algorithmic-trading-101",
    title: "Algorithmic Trading 101",
    description: "Foundational course covering systematic execution, infrastructure, and institutional workflows.",
    modules: 8,
    duration: "6 hours",
    level: "Beginner",
    certificate: true,
    tier: "free",
    lessons: [
      { title: "Introduction to Systematic Trading", duration: "45 min" },
      { title: "Execution Quality & Slippage", duration: "40 min" },
      { title: "Backtesting Fundamentals", duration: "50 min" },
      { title: "Infrastructure Overview", duration: "35 min" },
    ],
  },
  {
    slug: "risk-management-mastery",
    title: "Risk Management Mastery",
    description: "Deep dive into drawdown protection, position sizing, and portfolio-level risk controls.",
    modules: 10,
    duration: "8 hours",
    level: "Intermediate",
    certificate: true,
    tier: "professional",
    lessons: [
      { title: "Drawdown Protection Protocols", duration: "55 min" },
      { title: "Position Sizing Frameworks", duration: "50 min" },
      { title: "Emergency Stop Systems", duration: "45 min" },
      { title: "Portfolio Heat Management", duration: "40 min" },
    ],
  },
  {
    slug: "portfolio-construction",
    title: "Portfolio Construction",
    description: "Multi-strategy allocation, correlation analysis, and institutional portfolio design.",
    modules: 7,
    duration: "5 hours",
    level: "Advanced",
    certificate: true,
    tier: "professional",
    lessons: [
      { title: "Multi-Strategy Blending", duration: "50 min" },
      { title: "Correlation & Diversification", duration: "45 min" },
      { title: "Rebalancing Protocols", duration: "40 min" },
    ],
  },
  {
    slug: "ai-trading-systems",
    title: "AI Trading Systems",
    description: "Blue Engine architecture, model governance, and machine learning in systematic trading.",
    modules: 9,
    duration: "7 hours",
    level: "Advanced",
    certificate: true,
    tier: "institutional",
    lessons: [
      { title: "Neural Ensemble Architecture", duration: "60 min" },
      { title: "Model Validation & Governance", duration: "55 min" },
      { title: "Signal Quality Metrics", duration: "45 min" },
    ],
  },
  {
    slug: "macro-investing",
    title: "Macro Investing",
    description: "Macro regime analysis, central bank policy, and systematic macro positioning.",
    modules: 6,
    duration: "5 hours",
    level: "Intermediate",
    certificate: true,
    tier: "professional",
    lessons: [
      { title: "Regime Classification", duration: "45 min" },
      { title: "Central Bank Policy Matrix", duration: "50 min" },
      { title: "Cross-Asset Macro Flows", duration: "40 min" },
    ],
  },
  {
    slug: "capital-preservation",
    title: "Capital Preservation",
    description: "Wealth preservation strategies, low-drawdown approaches, and crisis protocols.",
    modules: 6,
    duration: "4 hours",
    level: "All Levels",
    certificate: true,
    tier: "free",
    lessons: [
      { title: "Preservation-First Allocation", duration: "40 min" },
      { title: "Crisis Protocols", duration: "35 min" },
      { title: "HNWI Frameworks", duration: "45 min" },
    ],
  },
];

export function getCourse(slug: string) {
  return UNIVERSITY_COURSES.find((c) => c.slug === slug);
}
