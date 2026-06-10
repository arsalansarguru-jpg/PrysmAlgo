import { blogArticles } from "@/data/blog-articles";
import { resourcePages } from "@/data/seo-silos";
import { locationPages } from "@/data/seo-locations";
import { guidePages } from "@/data/seo-guides";
import { COUNTRY_LANDINGS } from "@/data/country-landings";
import { GLOSSARY_TERMS } from "@/data/glossary";
import { CASE_STUDIES } from "@/data/case-studies";
import { NEWS_ARTICLES } from "@/data/news";
import { RESEARCH_REPORTS } from "@/data/research-reports";
import { LEAD_MAGNETS } from "@/data/lead-magnets";
import { SEO_TOOLS } from "@/data/seo-tools";
import { PROGRAMMATIC_CITIES } from "@/data/programmatic-cities";
import { AUTHORITY_PAGES } from "@/data/authority-pages";
import { DAILY_BRIEFINGS } from "@/data/intelligence/daily-briefings";
import { INSTITUTE_REPORTS } from "@/data/intelligence/research-institute";
import { UNIVERSITY_COURSES } from "@/data/intelligence/university";
import { INSIGHTS } from "@/data/intelligence/insights";

export interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: Date;
}

const PROGRAMMATIC_VERTICALS = ["algorithmic-trading", "ai-trading", "quantitative-investing"] as const;

export const STATIC_ROUTES: SitemapEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/live-performance", priority: 0.95, changeFrequency: "daily" },
  { path: "/why-prysmalgo", priority: 0.95, changeFrequency: "monthly" },
  { path: "/risk-framework", priority: 0.9, changeFrequency: "monthly" },
  { path: "/investment-philosophy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/technology", priority: 0.85, changeFrequency: "monthly" },
  { path: "/blue-engine", priority: 0.85, changeFrequency: "monthly" },
  { path: "/capital-preservation", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.9, changeFrequency: "monthly" },
  { path: "/trust-center", priority: 0.9, changeFrequency: "monthly" },
  { path: "/performance", priority: 0.9, changeFrequency: "weekly" },
  { path: "/performance-methodology", priority: 0.85, changeFrequency: "monthly" },
  { path: "/risk-management", priority: 0.9, changeFrequency: "monthly" },
  { path: "/academy", priority: 0.9, changeFrequency: "daily" },
  { path: "/blog", priority: 0.85, changeFrequency: "daily" },
  { path: "/glossary", priority: 0.9, changeFrequency: "weekly" },
  { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" },
  { path: "/news", priority: 0.8, changeFrequency: "weekly" },
  { path: "/learn", priority: 0.85, changeFrequency: "weekly" },
  { path: "/resources", priority: 0.85, changeFrequency: "weekly" },
  { path: "/downloads", priority: 0.85, changeFrequency: "monthly" },
  { path: "/research", priority: 0.85, changeFrequency: "weekly" },
  { path: "/tools", priority: 0.85, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.8, changeFrequency: "weekly" },
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/content", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terminal", priority: 0.95, changeFrequency: "daily" },
  { path: "/daily-briefing", priority: 0.95, changeFrequency: "daily" },
  { path: "/research-institute", priority: 0.9, changeFrequency: "weekly" },
  { path: "/transparency", priority: 0.9, changeFrequency: "weekly" },
  { path: "/university", priority: 0.85, changeFrequency: "weekly" },
  { path: "/insights", priority: 0.85, changeFrequency: "weekly" },
  { path: "/prysm-ai", priority: 0.85, changeFrequency: "monthly" },
  { path: "/membership", priority: 0.8, changeFrequency: "monthly" },
  { path: "/book-call", priority: 0.9, changeFrequency: "monthly" },
  { path: "/investor-assessment", priority: 0.85, changeFrequency: "monthly" },
  { path: "/calculators", priority: 0.8, changeFrequency: "monthly" },
  { path: "/media", priority: 0.75, changeFrequency: "monthly" },
  { path: "/dashboard-demo", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/apply", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export function getAllSitemapEntries(): SitemapEntry[] {
  return [
    ...STATIC_ROUTES,
    ...blogArticles.map((post) => ({
      path: `/blog/${post.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.date),
    })),
    ...blogArticles.map((post) => ({
      path: `/academy/${post.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
      lastModified: new Date(post.date),
    })),
    ...GLOSSARY_TERMS.map((term) => ({
      path: `/glossary/${term.slug}`,
      priority: 0.65,
      changeFrequency: "yearly" as const,
    })),
    ...CASE_STUDIES.map((study) => ({
      path: `/case-studies/${study.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...NEWS_ARTICLES.map((article) => ({
      path: `/news/${article.slug}`,
      priority: 0.75,
      changeFrequency: "weekly" as const,
      lastModified: new Date(article.date),
    })),
    ...RESEARCH_REPORTS.map((report) => ({
      path: `/research/${report.slug}`,
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: new Date(report.date),
    })),
    ...LEAD_MAGNETS.map((magnet) => ({
      path: `/downloads/${magnet.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...SEO_TOOLS.map((tool) => ({
      path: `/tools/${tool.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...resourcePages.map((page) => ({
      path: `/learn/${page.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    })),
    ...locationPages.map((page) => ({
      path: `/locations/${page.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...COUNTRY_LANDINGS.map((page) => ({
      path: `/${page.slug}`,
      priority: 0.85,
      changeFrequency: "monthly" as const,
    })),
    ...PROGRAMMATIC_VERTICALS.flatMap((vertical) =>
      PROGRAMMATIC_CITIES.map((city) => ({
        path: `/${vertical}/${city.slug}`,
        priority: 0.82,
        changeFrequency: "monthly" as const,
      }))
    ),
    ...guidePages.map((page) => ({
      path: `/guides/${page.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    })),
    ...AUTHORITY_PAGES.filter((p) => !STATIC_ROUTES.some((s) => s.path === `/${p.slug}`)).map((page) => ({
      path: `/${page.slug}`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    ...DAILY_BRIEFINGS.map((b) => ({
      path: `/daily-briefing/${b.slug}`,
      priority: 0.8,
      changeFrequency: "daily" as const,
      lastModified: new Date(b.date),
    })),
    ...INSTITUTE_REPORTS.map((r) => ({
      path: `/research-institute/${r.slug}`,
      priority: 0.75,
      changeFrequency: "weekly" as const,
      lastModified: new Date(r.date),
    })),
    ...UNIVERSITY_COURSES.map((c) => ({
      path: `/university/${c.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...INSIGHTS.map((a) => ({
      path: `/insights/${a.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: new Date(a.date),
    })),
  ];
}

export const DISALLOWED_ROUTES = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/private/",
  "/_next/",
  "/content/blueprints/",
  "/portal/",
  "/partners/",
  "/community/",
  "/admin/",
];
