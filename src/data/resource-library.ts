export interface LibraryResource {
  slug: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  filePath: string;
  previewSections: string[];
  featured?: boolean;
}

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    slug: "investor-guide",
    title: "Institutional Investor Guide",
    description: "Complete guide for qualified investors evaluating algorithmic trading technology and systematic strategies.",
    category: "Investor Guides",
    pages: 48,
    filePath: "/tear-sheets/prysm-blue-institutional-analysis.pdf",
    previewSections: ["Due diligence framework", "Onboarding process", "Fee structure overview"],
    featured: true,
  },
  {
    slug: "risk-management-handbook",
    title: "Risk Management Handbook",
    description: "Institutional risk management framework covering drawdown controls, position sizing, and capital preservation.",
    category: "Risk Management",
    pages: 36,
    filePath: "/tear-sheets/prysm-gold-institutional-analysis.pdf",
    previewSections: ["Five-tier risk architecture", "Drawdown protocols", "Emergency stop systems"],
    featured: true,
  },
  {
    slug: "algorithmic-trading-guide",
    title: "Algorithmic Trading Guide",
    description: "Professional overview of algorithmic trading systems, execution infrastructure, and institutional best practices.",
    category: "Algorithmic Trading",
    pages: 52,
    filePath: "/tear-sheets/prysm-blue-institutional-analysis.pdf",
    previewSections: ["System architecture", "Execution quality", "Performance attribution"],
  },
  {
    slug: "forex-investment-guide",
    title: "Forex Investment Technology Guide",
    description: "How institutional investors deploy systematic forex strategies with disciplined risk management.",
    category: "Forex Markets",
    pages: 40,
    filePath: "/tear-sheets/prysm-blue-institutional-analysis.pdf",
    previewSections: ["EUR/USD systematic execution", "Liquidity considerations", "Risk controls"],
  },
  {
    slug: "capital-preservation-framework",
    title: "Capital Preservation Framework",
    description: "Multi-layered capital preservation methodology for institutional algorithmic portfolios.",
    category: "Capital Preservation",
    pages: 32,
    filePath: "/tear-sheets/prysm-green-institutional-analysis.pdf",
    previewSections: ["Preservation-first philosophy", "Drawdown management", "Recovery protocols"],
    featured: true,
  },
];
