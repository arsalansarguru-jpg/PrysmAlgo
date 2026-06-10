import type { CommunityPost } from "@/types/intelligence";

export const COMMUNITY_CATEGORIES = ["Market Discussions", "Research Updates", "Weekly Insights", "Investor Q&A"] as const;

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: "1", author: "Institutional Allocator", role: "Member", title: "EUR/USD regime shift — thoughts on Prysm Blue positioning?", content: "Noticing compression in major pairs. How does the Blue strategy adapt to low-volatility environments?", category: "Market Discussions", date: "2026-03-08", replies: 12 },
  { id: "2", author: "PrysmAlgo Research", role: "Official", title: "Weekly Research: Gold Volatility Regime Update", content: "New institute report published on XAU/USD structural analysis. Key takeaway: consolidation phase with upside bias.", category: "Research Updates", date: "2026-03-07", replies: 8 },
  { id: "3", author: "Family Office Principal", role: "Investor", title: "Drawdown protection during event weeks", content: "How do emergency stop protocols work during FOMC weeks? Looking for transparency on historical behavior.", category: "Investor Q&A", date: "2026-03-06", replies: 15 },
  { id: "4", author: "Quant Analyst", role: "Member", title: "Multi-strategy allocation framework", content: "Sharing my approach to blending Blue/Gold/Green based on correlation analysis. Open to feedback.", category: "Weekly Insights", date: "2026-03-05", replies: 6 },
  { id: "5", author: "UAE Investor", role: "Member", title: "Onboarding experience for international investors", content: "Completed onboarding from Dubai in 8 business days. Happy to share the process for others.", category: "Investor Q&A", date: "2026-03-04", replies: 9 },
];
