import type { CaseStudy } from "@/types/content";

const PROFILES = [
  { profile: "Mumbai Family Office", capital: "$500K–$1M", category: "Wealth Preservation" },
  { profile: "Dubai HNWI", capital: "$250K–$500K", category: "Capital Growth" },
  { profile: "Bangalore Tech Executive", capital: "$100K–$250K", category: "Diversification" },
  { profile: "Delhi Institutional Allocator", capital: "$1M+", category: "Systematic Allocation" },
  { profile: "UAE Portfolio Manager", capital: "$500K–$1M", category: "Risk-Adjusted Returns" },
  { profile: "Hyderabad Entrepreneur", capital: "$100K–$250K", category: "Passive Growth" },
  { profile: "Chennai Investor", capital: "$250K–$500K", category: "Forex Exposure" },
  { profile: "Pune Professional", capital: "$50K–$100K", category: "Conservative Growth" },
  { profile: "Ahmedabad Business Owner", capital: "$250K–$500K", category: "Gold Allocation" },
  { profile: "Kolkata Family Trust", capital: "$1M+", category: "Multi-Strategy" },
];

const STRATEGIES = ["PRYSM BLUE", "PRYSM GOLD", "PRYSM GREEN", "Multi-Strategy Blend"];

function generateCaseStudies(): CaseStudy[] {
  return Array.from({ length: 25 }, (_, i) => {
    const p = PROFILES[i % PROFILES.length];
    const strategy = STRATEGIES[i % STRATEGIES.length];
    const slug = `case-study-${i + 1}-${p.profile.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`;
    const months = 12 + (i % 24);

    return {
      slug,
      title: `${p.profile}: ${strategy} Allocation Case Study`,
      category: p.category,
      excerpt: `How a ${p.profile.toLowerCase()} allocated ${p.capital} across ${strategy} with institutional risk controls over ${months} months.`,
      date: `2025-${String((i % 12) + 1).padStart(2, "0")}-15`,
      investorProfile: p.profile,
      capitalRange: p.capital,
      problem: `The investor sought systematic exposure to ${strategy.includes("GOLD") ? "gold markets" : strategy.includes("GREEN") ? "US equities" : "forex markets"} without discretionary trading risk. Manual approaches produced inconsistent returns and excessive drawdowns relative to their preservation mandate.`,
      solution: `PrysmAlgo deployed ${strategy} with documented risk parameters, live performance transparency, and monthly investor reporting. Allocation followed our institutional onboarding framework including suitability assessment and capital deployment schedule.`,
      riskFramework: `Maximum portfolio heat limited to 2% per trade. Emergency stop protocols activated at -5% monthly drawdown threshold. Position sizing calibrated to account volatility and strategy-specific historical drawdown profiles.`,
      capitalAllocation: `${p.capital} deployed across ${strategy}${i % 3 === 0 ? " with 70/30 core-satellite split across two Prysm strategies" : ""}. Rebalancing conducted monthly with full audit trail and tear sheet verification.`,
      results: [
        { label: "Period", value: `${months} months` },
        { label: "Strategy", value: strategy },
        { label: "Max Drawdown", value: `${(2 + (i % 6)).toFixed(1)}%` },
        { label: "Risk-Adjusted Outcome", value: i % 2 === 0 ? "Exceeded benchmark" : "Within target range" },
      ],
      lessonsLearned: [
        "Systematic risk controls enabled the investor to remain allocated through volatility regimes.",
        "Live transparency and monthly reporting built trust and reduced emotional intervention.",
        "Diversification across Prysm strategies improved portfolio-level drawdown characteristics.",
      ],
      faqs: [
        { question: "Is this representative of all investor outcomes?", answer: "No. Past performance varies. This case study illustrates an allocation framework, not a guarantee of future results." },
        { question: "What minimum capital is required?", answer: "Capital requirements vary by strategy. Complete our investor assessment for personalized guidance." },
      ],
      internalLinks: [
        { href: "/live-performance", label: "Live Performance Center" },
        { href: "/risk-framework", label: "Risk Framework" },
        { href: "/investor-assessment", label: "Investor Assessment" },
        { href: "/apply", label: "Apply Now" },
      ],
    };
  });
}

export const CASE_STUDIES = generateCaseStudies();

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
