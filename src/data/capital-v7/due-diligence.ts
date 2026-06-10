import type { DueDiligenceSection } from "@/types/capital-v7";

export interface DueDiligenceContent {
  section: DueDiligenceSection;
  title: string;
  summary: string;
  highlights: string[];
}

export const DUE_DILIGENCE_SECTIONS: DueDiligenceContent[] = [
  { section: "operations", title: "Operations", summary: "Institutional-grade operational infrastructure and investor servicing.", highlights: ["Daily NAV reporting", "Monthly investor statements", "Dedicated IR team", "24/5 trade monitoring"] },
  { section: "technology", title: "Technology", summary: "PRYSM BLUE AI engine and systematic execution infrastructure.", highlights: ["AI signal generation", "Low-latency execution", "Redundant infrastructure", "Real-time risk monitoring"] },
  { section: "risk", title: "Risk Management", summary: "Multi-layer drawdown control and position sizing framework.", highlights: ["Max drawdown limits", "Position sizing rules", "Regime detection", "Emergency shutdown logic"] },
  { section: "compliance", title: "Compliance", summary: "KYC/AML procedures and regulatory alignment.", highlights: ["KYC verification", "Investor agreements", "Risk disclosures", "Audit trail"] },
  { section: "research", title: "Research", summary: "Macro and quantitative research supporting systematic strategies.", highlights: ["Daily briefings", "Research institute", "Market regime analysis", "Performance attribution"] },
  { section: "performance", title: "Performance", summary: "Verified track records with third-party transparency.", highlights: ["Live dashboards", "Tear sheets", "Monthly reports", "Benchmark comparison"] },
  { section: "management", title: "Management", summary: "Experienced leadership with institutional trading background.", highlights: ["15+ years experience", "Quantitative expertise", "Capital preservation focus", "Transparent communication"] },
  { section: "security", title: "Security", summary: "Enterprise security, encryption, and access controls.", highlights: ["Role-based access", "Audit logging", "Encrypted storage", "2FA support"] },
];
