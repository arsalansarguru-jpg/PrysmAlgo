import type { LeadTier } from "@/types/crm";

export interface ScoringInput {
  capital_range?: string;
  experience_level?: string;
  risk_profile?: string;
}

/** V4.0 lead scoring engine */
const CAPITAL_SCORES: Record<string, number> = {
  "$100k+": 100,
  "$50k–$100k": 80,
  "$50k-$100k": 80,
  "$25k–$50k": 60,
  "$25k-$50k": 60,
  "$10k–$25k": 40,
  "$10k-$25k": 40,
  "Below $10k": 20,
  "<$5k": 20,
  "$5k–$10k": 25,
  "$5k-$10k": 25,
  "$250,000 - $500,000": 90,
  "$500,000 - $1,000,000": 100,
  "$1,000,000 - $5,000,000": 100,
  "$5,000,000+": 100,
};

const EXPERIENCE_SCORES: Record<string, number> = {
  Professional: 25,
  Advanced: 15,
  Intermediate: 10,
  Beginner: 5,
  "Institutional (10+ years)": 25,
  "Professional (5-10 years)": 20,
  "Experienced (3-5 years)": 15,
  "Intermediate (1-3 years)": 10,
};

const RISK_SCORES: Record<string, number> = {
  Moderate: 20,
  Low: 15,
  Conservative: 15,
  High: 10,
  Growth: 12,
  Aggressive: 10,
};

export function scoreCapital(range?: string): number {
  if (!range) return 0;
  return CAPITAL_SCORES[range] ?? (range.includes("5,000,000") || range.includes("1,000,000") ? 100 : 30);
}

export function scoreExperience(level?: string): number {
  if (!level) return 0;
  return EXPERIENCE_SCORES[level] ?? 5;
}

export function scoreRisk(profile?: string): number {
  if (!profile) return 0;
  return RISK_SCORES[profile] ?? 10;
}

export function calculateLeadScore(input: ScoringInput): number {
  return scoreCapital(input.capital_range) + scoreExperience(input.experience_level) + scoreRisk(input.risk_profile);
}

export function classifyLeadTier(score: number): LeadTier {
  if (score >= 100) return "hot";
  if (score >= 60) return "warm";
  return "cold";
}

export function getTierLabel(tier: LeadTier): string {
  return tier === "hot" ? "Hot Lead" : tier === "warm" ? "Warm Lead" : "Cold Lead";
}

export function getTierRecommendation(tier: LeadTier): string {
  switch (tier) {
    case "hot":
      return "Priority investor — schedule strategy call within 24 hours.";
    case "warm":
      return "Qualified prospect — nurture with performance data and book consultation.";
    default:
      return "Early-stage lead — enroll in education sequence and reassess in 30 days.";
  }
}
