import type { ContentCollection } from "@/types/content";

export interface CmsCollectionMeta {
  id: ContentCollection;
  label: string;
  path: string;
  description: string;
  /** Future: Sanity schema name or MDX content directory */
  source: "typescript" | "mdx" | "sanity";
  sourcePath?: string;
  publishable: boolean;
}

/** CMS collection registry — swap `source` to mdx/sanity without route changes */
export const CMS_COLLECTIONS: CmsCollectionMeta[] = [
  { id: "academy", label: "Investor Academy", path: "/academy", description: "Educational articles for qualified investors.", source: "typescript", sourcePath: "src/data/blog-articles.ts", publishable: true },
  { id: "blog", label: "Blog", path: "/blog", description: "Institutional insights and market commentary.", source: "typescript", sourcePath: "src/data/blog-articles.ts", publishable: true },
  { id: "research", label: "Research", path: "/research", description: "Weekly outlooks, macro analysis, and systematic research.", source: "typescript", sourcePath: "src/data/research-reports.ts", publishable: true },
  { id: "resources", label: "Resource Library", path: "/resources", description: "PDF guides and institutional downloads.", source: "typescript", sourcePath: "src/data/resource-library.ts", publishable: true },
  { id: "guides", label: "Investor Guides", path: "/guides", description: "Long-form investor education and whitepapers.", source: "typescript", sourcePath: "src/data/seo-guides.ts", publishable: true },
  { id: "case-studies", label: "Case Studies", path: "/case-studies", description: "Investor outcomes and allocation frameworks.", source: "typescript", sourcePath: "src/data/case-studies.ts", publishable: true },
  { id: "glossary", label: "Glossary", path: "/glossary", description: "500+ institutional trading and investing terms.", source: "typescript", sourcePath: "src/data/glossary.ts", publishable: true },
  { id: "news", label: "News", path: "/news", description: "Company updates, market news, and announcements.", source: "typescript", sourcePath: "src/data/news.ts", publishable: true },
  { id: "downloads", label: "Free Downloads", path: "/downloads", description: "Lead magnet landing pages with email capture.", source: "typescript", sourcePath: "src/data/lead-magnets.ts", publishable: true },
  { id: "tools", label: "Interactive Tools", path: "/tools", description: "Calculators designed for backlink acquisition.", source: "typescript", sourcePath: "src/data/seo-tools.ts", publishable: true },
  { id: "authority", label: "Authority Pages", path: "/why-prysmalgo", description: "Cornerstone EEAT and trust assets.", source: "typescript", sourcePath: "src/data/authority-pages.ts", publishable: true },
];

export function getCollection(id: ContentCollection) {
  return CMS_COLLECTIONS.find((c) => c.id === id);
}

export const CONTENT_HUB_ROUTES = CMS_COLLECTIONS.filter((c) =>
  ["academy", "research", "resources", "blog", "guides", "case-studies", "glossary", "news"].includes(c.id)
);
