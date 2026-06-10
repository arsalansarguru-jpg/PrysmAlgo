import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { NEWS_ARTICLES, NEWS_CATEGORIES } from "@/data/news";

export const metadata: Metadata = createMetadata({
  title: "News & Announcements",
  description: "Latest PrysmAlgo company news, market updates, research releases, and events.",
  path: "/news",
  keywords: ["prysmalgo news", "algorithmic trading news", "fintech announcements"],
});

export default function NewsPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "News", path: "/news" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Newsroom</h1>
        <p className="text-lg text-muted max-w-3xl mb-8">Company updates, research releases, and market announcements.</p>
        <div className="flex flex-wrap gap-2 mb-12">
          {NEWS_CATEGORIES.map((c) => (
            <span key={c} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{c}</span>
          ))}
        </div>
        <div className="space-y-6">
          {NEWS_ARTICLES.map((a) => (
            <Link key={a.slug} href={`/news/${a.slug}`} className="block rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-brand text-accent">{a.category}</span>
                {a.featured && <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded">Featured</span>}
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">{a.title}</h2>
              <p className="text-sm text-muted">{a.excerpt}</p>
              <p className="text-xs text-muted/60 mt-3">{a.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
