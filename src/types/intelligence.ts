/** Investor Intelligence Platform V5.0 */

export type MembershipTier = "free" | "professional" | "institutional";

export type UserRole = "visitor" | "member" | "investor" | "partner" | "admin";

export interface MembershipPlan {
  id: MembershipTier;
  name: string;
  price: string;
  description: string;
  features: string[];
  permissions: string[];
}

export interface TrustScoreBreakdown {
  transparency: number;
  risk: number;
  reporting: number;
  operational: number;
  verification: number;
  overall: number;
  updatedAt: string;
}

export interface MarketWidget {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  category: "forex" | "commodity" | "index" | "volatility";
}

export interface DailyBriefing {
  slug: string;
  date: string;
  title: string;
  marketSummary: string;
  goldOutlook: string;
  forexOutlook: string;
  economicEvents: { time: string; event: string; impact: string }[];
  algorithmPositioning: string;
  riskAlerts: string[];
  regime: string;
}

export interface ResearchReport {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  excerpt: string;
  pdfReady: boolean;
  tier: MembershipTier;
  sections: { heading: string; paragraphs: string[] }[];
}

export interface UniversityCourse {
  slug: string;
  title: string;
  description: string;
  modules: number;
  duration: string;
  level: string;
  certificate: boolean;
  tier: MembershipTier;
  lessons: { title: string; duration: string }[];
}

export interface InsightArticle {
  slug: string;
  title: string;
  type: "commentary" | "letter" | "note" | "macro" | "outlook" | "video" | "podcast";
  date: string;
  excerpt: string;
  author: string;
  content: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  role: string;
  title: string;
  content: string;
  category: string;
  date: string;
  replies: number;
}

export interface PartnerStats {
  referrals: number;
  conversions: number;
  commission: number;
  pendingPayout: number;
  tier: string;
}

export interface PortalPortfolio {
  totalValue: number;
  ytdReturn: number;
  monthlyReturn: number;
  maxDrawdown: number;
  sharpe: number;
  allocation: { strategy: string; pct: number; value: number }[];
  equityCurve: { month: string; value: number }[];
  monthlyReports: { month: string; title: string; url: string }[];
  profitShare: { period: string; amount: number }[];
  withdrawals: { date: string; amount: number; status: string }[];
  documents: { name: string; type: string; date: string }[];
}

export const MEMBERSHIP_PERMISSIONS: Record<MembershipTier, string[]> = {
  free: ["daily-briefing", "terminal-basic", "university-intro"],
  professional: ["daily-briefing", "terminal-full", "research-institute", "university-full", "insights", "community"],
  institutional: ["all", "portal", "partners", "research-pdf", "priority-support"],
};
