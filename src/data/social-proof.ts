import type { SocialProofItem } from "@/types/content";

/** CMS-ready social proof collections */
export const TESTIMONIALS: SocialProofItem[] = [
  { id: "t1", type: "testimonial", title: "Institutional Transparency", content: "The live dashboard and monthly reporting gave us confidence to allocate systematically. No black boxes.", author: "Mumbai Family Office", role: "Principal", featured: true },
  { id: "t2", type: "testimonial", title: "Risk-First Approach", content: "Drawdown controls and emergency protocols aligned with our preservation mandate.", author: "Dubai HNWI", role: "Investor", featured: true },
  { id: "t3", type: "testimonial", title: "Professional Onboarding", content: "The investor assessment and strategy consultation were thorough and institutional-grade.", author: "Bangalore Executive", role: "Tech Founder", featured: false },
];

export const INVESTOR_REVIEWS: SocialProofItem[] = [
  { id: "r1", type: "review", title: "Performance Transparency", content: "Verified tear sheets and live data — exactly what institutional investors need.", author: "Qualified Investor", rating: 5, featured: true, date: "2026-02-01" },
  { id: "r2", type: "review", title: "Systematic Execution", content: "Rules-based trading removed emotional decision-making from our allocation.", author: "UAE Allocator", rating: 5, featured: true, date: "2026-01-15" },
];

export const MEDIA_MENTIONS: SocialProofItem[] = [
  { id: "m1", type: "media", title: "Institutional Algo Trading in India", content: "PrysmAlgo featured for systematic trading transparency.", source: "Industry Publication", date: "2026-01-20", featured: true },
  { id: "m2", type: "media", title: "AI Trading Infrastructure", content: "Blue Engine architecture discussed in quant trading context.", source: "Fintech Review", date: "2025-12-10", featured: false },
];

export const PERFORMANCE_REPORTS: SocialProofItem[] = [
  { id: "p1", type: "performance-report", title: "November 2025 Monthly Report", content: "Institutional monthly performance summary with risk metrics.", date: "2025-11-30", featured: true },
  { id: "p2", type: "performance-report", title: "Q4 2025 Quarterly Letter", content: "Quarterly investor letter with strategy attribution.", date: "2026-01-05", featured: true },
];

export const SOCIAL_PROOF_COLLECTIONS = {
  testimonials: TESTIMONIALS,
  reviews: INVESTOR_REVIEWS,
  media: MEDIA_MENTIONS,
  performanceReports: PERFORMANCE_REPORTS,
} as const;
