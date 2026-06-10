export const ACADEMY_CATEGORIES = [
  "Algorithmic Trading",
  "AI Trading",
  "Forex Markets",
  "Risk Management",
  "Investment Psychology",
  "Capital Preservation",
  "Quantitative Investing",
] as const;

export type AcademyCategory = (typeof ACADEMY_CATEGORIES)[number];

/** Maps academy categories to blog article categories */
export const ACADEMY_CATEGORY_MAP: Record<string, string[]> = {
  "Algorithmic Trading": ["Algorithmic Trading"],
  "AI Trading": ["AI Trading"],
  "Forex Markets": ["Forex Trading"],
  "Risk Management": ["Risk Management"],
  "Investment Psychology": ["Trading Psychology"],
  "Capital Preservation": ["Wealth Preservation", "Risk Management"],
  "Quantitative Investing": ["Quantitative Investing", "Portfolio Management"],
};
