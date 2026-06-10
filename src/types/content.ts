/** Authority Engine V3.0 — unified content type system (CMS-ready) */

export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational";

export type ContentCollection =
  | "blog"
  | "academy"
  | "research"
  | "resources"
  | "guides"
  | "case-studies"
  | "glossary"
  | "news"
  | "downloads"
  | "tools"
  | "authority";

export interface ArticleBlueprint {
  slug: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  h1: string;
  h2Structure: string[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
  ctaPlacement: string[];
  status: "blueprint" | "draft" | "published";
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
  keywords: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  investorProfile: string;
  capitalRange: string;
  problem: string;
  solution: string;
  riskFramework: string;
  capitalAllocation: string;
  results: { label: string; value: string }[];
  lessonsLearned: string[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  featured: boolean;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
}

export interface ResearchReport {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  excerpt: string;
  featured: boolean;
  template: string;
  sections: { heading: string; paragraphs: string[] }[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
}

export interface LeadMagnet {
  slug: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  pages: number;
  highlights: string[];
  formSource: string;
  keywords: string[];
}

export interface ProgrammaticCity {
  slug: string;
  name: string;
  country: "India" | "UAE" | "USA" | "UK";
  countryCode: "IN" | "AE" | "US" | "GB";
  region: string;
  population?: string;
  investorProfile: string;
}

export interface SocialProofItem {
  id: string;
  type: "testimonial" | "review" | "media" | "performance-report";
  title: string;
  content: string;
  author?: string;
  role?: string;
  source?: string;
  date?: string;
  rating?: number;
  featured: boolean;
}

export interface NewsletterEdition {
  slug: string;
  type: "weekly-insights" | "monthly-performance" | "quarterly-letter";
  title: string;
  date: string;
  excerpt: string;
  sequence: number;
}

export interface AuthorityPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { href: string; label: string }[];
}

export interface SeoTool {
  slug: string;
  title: string;
  description: string;
  category: string;
  calculatorId: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export interface RelatedContentBundle {
  articles: { href: string; label: string }[];
  resources: { href: string; label: string }[];
  research: { href: string; label: string }[];
  glossary: { href: string; label: string }[];
  tools: { href: string; label: string }[];
  services: { href: string; label: string }[];
}
