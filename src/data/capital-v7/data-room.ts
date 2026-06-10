import type { DataRoomDocument } from "@/types/capital-v7";

export const DATA_ROOM_DOCUMENTS: DataRoomDocument[] = [
  { slug: "performance-report-q1-2026", category: "performance", title: "Q1 2026 Performance Report", description: "Verified performance metrics and equity curve analysis.", downloadCount: 42, fileUrl: "/tear-sheets/prysm-blue-tear-sheet.pdf" },
  { slug: "due-diligence-pack", category: "due_diligence", title: "Institutional Due Diligence Pack", description: "Complete DD questionnaire responses and supporting documentation.", downloadCount: 28 },
  { slug: "risk-framework", category: "risk", title: "Risk Management Framework", description: "Multi-layer risk architecture and drawdown controls.", downloadCount: 56, fileUrl: "/tear-sheets/risk-framework.pdf" },
  { slug: "investment-methodology", category: "methodology", title: "Investment Methodology Overview", description: "Systematic execution, signal generation, and portfolio construction.", downloadCount: 34 },
  { slug: "research-outlook-q2", category: "research", title: "Q2 2026 Research Outlook", description: "Macro and systematic research for qualified allocators.", downloadCount: 19 },
  { slug: "operational-overview", category: "operational", title: "Operational Overview", description: "Infrastructure, reporting, and investor servicing capabilities.", downloadCount: 15 },
  { slug: "investor-presentation-2026", category: "presentation", title: "Investor Presentation 2026", description: "Institutional pitch deck for qualified prospects.", downloadCount: 67 },
];
