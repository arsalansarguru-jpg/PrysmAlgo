export type IrCategory =
  | "quarterly_letter"
  | "monthly_update"
  | "investor_communication"
  | "performance_commentary"
  | "market_commentary"
  | "annual_review"
  | "ceo_letter";

export type PipelineStage =
  | "prospect"
  | "qualified"
  | "active_discussion"
  | "due_diligence"
  | "pending_funding"
  | "funded";

export const PIPELINE_STAGES: PipelineStage[] = [
  "prospect",
  "qualified",
  "active_discussion",
  "due_diligence",
  "pending_funding",
  "funded",
];

export type DataRoomCategory =
  | "performance"
  | "due_diligence"
  | "risk"
  | "methodology"
  | "research"
  | "operational"
  | "presentation";

export type DueDiligenceSection =
  | "operations"
  | "technology"
  | "risk"
  | "compliance"
  | "research"
  | "performance"
  | "management"
  | "security";

export type PartnerType =
  | "introducing_broker"
  | "financial_advisor"
  | "wealth_manager"
  | "family_office";

export type EventType = "webinar" | "briefing" | "qa" | "conference";

export type RetentionRisk = "low" | "medium" | "high";

export interface IrCommunication {
  slug: string;
  category: IrCategory;
  title: string;
  summary: string;
  body: string;
  publishedAt: string;
  author: string;
}

export interface PipelineDeal {
  id: string;
  investorName: string;
  email: string;
  country?: string;
  stage: PipelineStage;
  capitalCommitted: number;
  capitalFunded: number;
  expectedClose?: string;
}

export interface DataRoomDocument {
  slug: string;
  category: DataRoomCategory;
  title: string;
  description: string;
  fileUrl?: string;
  downloadCount: number;
}

export interface InvestorReferral {
  id: string;
  referralCode: string;
  referredEmail?: string;
  referredName?: string;
  status: string;
  rewardAmount: number;
  createdAt: string;
}

export interface InvestorHealthScore {
  email: string;
  engagementScore: number;
  portalUsageScore: number;
  emailOpensScore: number;
  referralScore: number;
  retentionRisk: RetentionRisk;
  overallScore: number;
}

export interface CapitalFlowSummary {
  deposits: number;
  withdrawals: number;
  profitShare: number;
  netFlows: number;
  monthlyGrowth: number;
  aumGrowth: number;
  investorCount: number;
  aum: number;
  countryBreakdown: { country: string; amount: number }[];
}

export interface ExecutiveDashboard {
  aum: number;
  monthlyGrowth: number;
  investorCount: number;
  retentionRate: number;
  pipelineValue: number;
  capitalCommitted: number;
  capitalFunded: number;
  conversionRate: number;
  revenue: number;
  partnerCapital: number;
  countryPerformance: { country: string; aum: number; investors: number }[];
  forecasts: { label: string; value: number; period: string }[];
}

export interface PlatformForecast {
  type: string;
  period: string;
  predictedValue: number;
  confidence: number;
}

export type SupportedLocale = "en" | "ar" | "hi" | "mr";

export const IR_CATEGORY_LABELS: Record<IrCategory, string> = {
  quarterly_letter: "Quarterly Letters",
  monthly_update: "Monthly Updates",
  investor_communication: "Investor Communications",
  performance_commentary: "Performance Commentary",
  market_commentary: "Market Commentary",
  annual_review: "Annual Reviews",
  ceo_letter: "CEO Letters",
};

export const PIPELINE_STAGE_LABELS: Record<PipelineStage, string> = {
  prospect: "Prospects",
  qualified: "Qualified Investors",
  active_discussion: "Active Discussions",
  due_diligence: "Due Diligence",
  pending_funding: "Pending Funding",
  funded: "Funded Investors",
};
