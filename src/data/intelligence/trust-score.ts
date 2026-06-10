import type { TrustScoreBreakdown } from "@/types/intelligence";

/** Dynamic trust framework — update values from live data / CMS */
export const TRUST_SCORE: TrustScoreBreakdown = {
  transparency: 94,
  risk: 91,
  reporting: 88,
  operational: 90,
  verification: 87,
  overall: 90,
  updatedAt: new Date().toISOString().split("T")[0],
};

export const TRUST_DIMENSIONS = [
  { key: "transparency" as const, label: "Transparency", description: "Live performance visibility, tear sheets, and open trade logging." },
  { key: "risk" as const, label: "Risk Management", description: "Documented drawdown limits, emergency protocols, and position sizing." },
  { key: "reporting" as const, label: "Reporting", description: "Monthly investor reports, quarterly letters, and attribution analysis." },
  { key: "operational" as const, label: "Operational", description: "Infrastructure uptime, execution quality, and governance standards." },
  { key: "verification" as const, label: "Verification", description: "Third-party data sources, live dashboard, and audit readiness." },
];
