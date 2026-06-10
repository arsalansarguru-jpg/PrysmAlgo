import type { SeoContentPage } from "@/types/seo";

export function buildSeoPage(
  slug: string,
  title: string,
  description: string,
  category: string,
  keywords: string[],
  sections: { heading: string; paragraphs: string[] }[],
  faqs: { question: string; answer: string }[],
  internalLinks: { href: string; label: string }[]
): SeoContentPage {
  return { slug, title, description, category, keywords, sections, faqs, internalLinks };
}

export const STANDARD_INTERNAL_LINKS = [
  { href: "/performance", label: "Performance Dashboard" },
  { href: "/risk-management", label: "Risk Management Framework" },
  { href: "/trust", label: "Why Trust PrysmAlgo" },
  { href: "/apply", label: "Investor Application" },
];
