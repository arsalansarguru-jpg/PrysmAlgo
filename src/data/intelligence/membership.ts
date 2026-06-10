import type { MembershipPlan } from "@/types/intelligence";

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Essential market intelligence for curious investors.",
    features: [
      "Daily Briefing (latest)",
      "Terminal — basic widgets",
      "University intro courses",
      "Trust Score visibility",
      "Community read access",
    ],
    permissions: ["daily-briefing", "terminal-basic", "university-intro", "trust-score"],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$99/mo",
    description: "Full research access for serious allocators.",
    features: [
      "Full Daily Briefing archive",
      "Terminal — all widgets + AI insights",
      "Research Institute reports",
      "University full courses + certificates",
      "Executive Insights",
      "Community participation",
      "Prysm AI assistant",
    ],
    permissions: ["daily-briefing", "terminal-full", "research-institute", "university-full", "insights", "community", "prysm-ai"],
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "Custom",
    description: "Portal access, partner tools, and priority support.",
    features: [
      "Everything in Professional",
      "Investor Portal dashboard",
      "Partner referral dashboard",
      "PDF research downloads",
      "Priority strategy calls",
      "Custom reporting",
      "API access (coming soon)",
    ],
    permissions: ["all", "portal", "partners", "research-pdf", "priority-support", "api-access"],
  },
];

export function getPlan(tier: string) {
  return MEMBERSHIP_PLANS.find((p) => p.id === tier);
}
