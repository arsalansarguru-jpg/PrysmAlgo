import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ARTICLE_BLUEPRINTS, BLUEPRINT_CATEGORIES } from "@/data/article-blueprints";

export const metadata: Metadata = createMetadata({
  title: "200 SEO Article Blueprints",
  description: "Content blueprints for algorithmic trading, AI trading, risk management, forex, gold, and investor education.",
  path: "/content/blueprints",
  noIndex: true,
});

export default function BlueprintsIndexPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Content Hub", path: "/content" }, { name: "Blueprints", path: "/content/blueprints" }]} />
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">200 Article Blueprints</h1>
        <p className="text-muted mb-12">SEO-ready content structures for editorial production. Not indexed — for internal/content team use.</p>
        {BLUEPRINT_CATEGORIES.map((cat) => (
          <section key={cat} className="mb-12">
            <h2 className="text-lg font-semibold text-accent mb-4">{cat}</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {ARTICLE_BLUEPRINTS.filter((b) => b.category === cat).map((b) => (
                <Link key={b.slug} href={`/content/blueprints/${b.slug}`} className="rounded-lg border border-border p-4 hover:border-accent/30 transition-colors">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{b.h1}</p>
                  <p className="text-xs text-muted mt-1">{b.targetKeyword}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
