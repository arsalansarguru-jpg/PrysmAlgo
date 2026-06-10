import type { RelatedContentBundle } from "@/types/content";
import { ARTICLE_BLUEPRINTS } from "@/data/article-blueprints";
import { GLOSSARY_TERMS } from "@/data/glossary";
import { CASE_STUDIES } from "@/data/case-studies";
import { RESEARCH_REPORTS } from "@/data/research-reports";
import { SEO_TOOLS } from "@/data/seo-tools";
import { LEAD_MAGNETS } from "@/data/lead-magnets";
import { blogArticles } from "@/data/blog-articles";

const SERVICE_LINKS = [
  { href: "/live-performance", label: "Live Performance Center" },
  { href: "/investor-assessment", label: "Investor Assessment" },
  { href: "/apply", label: "Investor Application" },
  { href: "/risk-framework", label: "Risk Framework" },
  { href: "/why-prysmalgo", label: "Why PrysmAlgo" },
];

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % 10000;
  return h;
}

function pick<T>(arr: T[], seed: number, count: number): T[] {
  if (arr.length === 0) return [];
  const out: T[] = [];
  for (let i = 0; i < count; i++) out.push(arr[(seed + i * 7) % arr.length]);
  return [...new Map(out.map((item) => [JSON.stringify(item), item])).values()].slice(0, count);
}

export function getRelatedContent(context: {
  slug: string;
  category?: string;
  keywords?: string[];
  type?: "article" | "glossary" | "case-study" | "research" | "news" | "authority";
}): RelatedContentBundle {
  const seed = hashSlug(context.slug);
  const cat = context.category?.toLowerCase() ?? "";

  const articles = pick(
    blogArticles
      .filter((a) => !context.slug.includes(a.slug))
      .sort((a, b) => (a.category === context.category ? -1 : b.category === context.category ? 1 : 0))
      .map((a) => ({ href: `/blog/${a.slug}`, label: a.title })),
    seed,
    4
  );

  const blueprints = pick(
    ARTICLE_BLUEPRINTS.filter((b) => b.category.toLowerCase().includes(cat.split(" ")[0]) || cat.includes(b.category.toLowerCase().split(" ")[0]))
      .map((b) => ({ href: `/content/blueprints/${b.slug}`, label: b.h1 })),
    seed + 1,
    2
  );

  const glossary = pick(
    GLOSSARY_TERMS.filter((t) => context.keywords?.some((k) => t.term.toLowerCase().includes(k.toLowerCase())) || t.category.toLowerCase().includes(cat.split(" ")[0]))
      .map((t) => ({ href: `/glossary/${t.slug}`, label: t.term })),
    seed + 2,
    4
  );

  if (glossary.length < 3) {
    glossary.push(
      ...pick(
        GLOSSARY_TERMS.map((t) => ({ href: `/glossary/${t.slug}`, label: t.term })),
        seed + 3,
        4 - glossary.length
      )
    );
  }

  const research = pick(
    RESEARCH_REPORTS.map((r) => ({ href: `/research/${r.slug}`, label: r.title })),
    seed + 4,
    3
  );

  const resources = pick(
    LEAD_MAGNETS.map((m) => ({ href: `/downloads/${m.slug}`, label: m.title })),
    seed + 5,
    3
  );

  const tools = pick(
    SEO_TOOLS.map((t) => ({ href: `/tools/${t.slug}`, label: t.title })),
    seed + 6,
    3
  );

  const caseStudies = pick(
    CASE_STUDIES.map((c) => ({ href: `/case-studies/${c.slug}`, label: c.title })),
    seed + 7,
    2
  );

  return {
    articles: [...articles, ...blueprints].slice(0, 5),
    resources: [...resources, ...caseStudies.map((c) => ({ href: c.href, label: c.label }))].slice(0, 4),
    research,
    glossary: glossary.slice(0, 5),
    tools,
    services: pick(SERVICE_LINKS, seed + 8, 4),
  };
}

export function getGlossaryRelatedTerms(termSlug: string, relatedSlugs: string[]) {
  const terms = relatedSlugs
    .map((slug) => GLOSSARY_TERMS.find((t) => t.slug === slug))
    .filter(Boolean)
    .map((t) => ({ href: `/glossary/${t!.slug}`, label: t!.term }));

  if (terms.length >= 3) return terms;
  const seed = hashSlug(termSlug);
  return [
    ...terms,
    ...pick(
      GLOSSARY_TERMS.filter((t) => t.slug !== termSlug).map((t) => ({ href: `/glossary/${t.slug}`, label: t.term })),
      seed,
      6 - terms.length
    ),
  ];
}
