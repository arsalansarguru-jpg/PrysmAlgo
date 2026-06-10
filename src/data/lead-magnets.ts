import type { LeadMagnet } from "@/types/content";

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    slug: "ultimate-algorithmic-trading-guide",
    title: "Ultimate Algorithmic Trading Guide",
    description: "Comprehensive 48-page institutional guide covering systematic execution, infrastructure, due diligence, and investor onboarding for qualified allocators.",
    category: "Algorithmic Trading",
    fileType: "PDF",
    pages: 48,
    highlights: ["Systematic execution frameworks", "Infrastructure checklist", "Due diligence questionnaire", "Risk control templates"],
    formSource: "lead-magnet-algo-guide",
    keywords: ["algorithmic trading guide", "institutional algo trading", "systematic trading pdf"],
  },
  {
    slug: "risk-management-handbook",
    title: "Risk Management Handbook",
    description: "Institutional risk management handbook with drawdown protocols, position sizing frameworks, and emergency stop procedures.",
    category: "Risk Management",
    fileType: "PDF",
    pages: 36,
    highlights: ["Drawdown protection protocols", "Position sizing formulas", "VaR and stress testing", "Portfolio heat maps"],
    formSource: "lead-magnet-risk-handbook",
    keywords: ["risk management handbook", "trading risk pdf", "institutional risk framework"],
  },
  {
    slug: "capital-preservation-blueprint",
    title: "Capital Preservation Blueprint",
    description: "Strategic blueprint for HNWI and family office investors seeking wealth preservation through systematic, low-drawdown approaches.",
    category: "Wealth Preservation",
    fileType: "PDF",
    pages: 28,
    highlights: ["Preservation-first allocation", "Drawdown minimization", "Multi-strategy blending", "Crisis protocols"],
    formSource: "lead-magnet-preservation",
    keywords: ["capital preservation", "wealth preservation guide", "HNWI investing"],
  },
  {
    slug: "investor-due-diligence-checklist",
    title: "Investor Due Diligence Checklist",
    description: "Professional checklist for evaluating algorithmic trading managers, tear sheets, and technology providers.",
    category: "Investor Education",
    fileType: "PDF",
    pages: 16,
    highlights: ["Manager evaluation criteria", "Tear sheet analysis", "Technology audit points", "Red flag indicators"],
    formSource: "lead-magnet-due-diligence",
    keywords: ["due diligence checklist", "investor checklist", "algo trading due diligence"],
  },
  {
    slug: "ai-trading-report",
    title: "AI Trading Report 2026",
    description: "Annual research report on AI signal generation, model governance, and institutional adoption of machine learning in systematic trading.",
    category: "AI Trading",
    fileType: "PDF",
    pages: 42,
    highlights: ["Blue Engine architecture", "Model validation framework", "AI risk controls", "Performance attribution"],
    formSource: "lead-magnet-ai-report",
    keywords: ["ai trading report", "machine learning trading", "institutional ai trading"],
  },
];

export function getLeadMagnet(slug: string) {
  return LEAD_MAGNETS.find((m) => m.slug === slug);
}
