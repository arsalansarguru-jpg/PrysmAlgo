export type UserRole =
  | "visitor"
  | "lead"
  | "investor"
  | "partner"
  | "admin"
  | "super_admin";

export type OnboardingStage =
  | "application"
  | "qualification"
  | "approval"
  | "agreement"
  | "broker_connection"
  | "account_activation"
  | "portal_access"
  | "completed";

export const ONBOARDING_STAGES: OnboardingStage[] = [
  "application",
  "qualification",
  "approval",
  "agreement",
  "broker_connection",
  "account_activation",
  "portal_access",
  "completed",
];

export type KycStatus = "pending" | "submitted" | "under_review" | "approved" | "rejected";

export type DocumentCategory = "agreement" | "statement" | "report" | "tax" | "kyc" | "other";

export type PerformanceProvider = "fxblue" | "myfxbook" | "broker" | "manual";

export interface PerformanceMetrics {
  annualReturn: number;
  monthlyReturn: number;
  ytdReturn: number;
  maxDrawdown: number;
  winRate: number;
  profitFactor: number;
  sharpeRatio: number;
  totalReturn: number;
  liveDays: number;
  source: "live" | "static";
  syncedAt?: string;
  provider?: PerformanceProvider;
}

export interface PerformanceSnapshot {
  strategyId: string;
  metrics: PerformanceMetrics;
  equityCurve: { month: string; value: number }[];
  monthlyReturns: { month: string; return: number }[];
  drawdownSeries: { month: string; drawdown: number }[];
}

export interface OnboardingWorkflow {
  id: string;
  email: string;
  currentStage: OnboardingStage;
  stages: { stage: OnboardingStage; completedAt?: string; notes?: string }[];
  leadId?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvestorDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  storagePath: string;
  fileSize?: number;
  mimeType?: string;
  createdAt: string;
}

export interface KycSubmission {
  id: string;
  userId?: string;
  status: KycStatus;
  submittedAt?: string;
  reviewedAt?: string;
  auditTrail: { action: string; at: string; by?: string }[];
}

export interface AnalyticsCommandCenter {
  traffic: number;
  leads: number;
  applications: number;
  calls: number;
  investors: number;
  capitalInflow: number;
  conversionRate: number;
  revenue: number;
  partnerRevenue: number;
  countryBreakdown: { country: string; count: number }[];
}

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  visitor: 0,
  lead: 1,
  investor: 2,
  partner: 2,
  admin: 3,
  super_admin: 4,
};

export const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  "/portal": ["investor", "admin", "super_admin"],
  "/portal/documents": ["investor", "admin", "super_admin"],
  "/portal/kyc": ["investor", "admin", "super_admin"],
  "/community": ["lead", "investor", "partner", "admin", "super_admin"],
  "/partners": ["partner", "admin", "super_admin"],
  "/membership": ["lead", "investor", "partner", "admin", "super_admin"],
  "/admin": ["admin", "super_admin"],
};
