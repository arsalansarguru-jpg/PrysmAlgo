import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CONTENT_HUB_ROUTES } from "@/lib/cms/collections";
import { ARTICLE_BLUEPRINTS, BLUEPRINT_CATEGORIES } from "@/data/article-blueprints";
import { GLOSSARY_TERMS } from "@/data/glossary";

export const metadata: Metadata = createMetadata({
  title: "Content Hub — Authority Engine V3.0",
  description: "PrysmAlgo content architecture: academy, research, glossary, case studies, news, and 200+ SEO article blueprints.",
  path: "/content",
  keywords: ["prysmalgo content", "algorithmic trading education", "investor resources"],
});

export default function ContentHubPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Content Hub", path: "/content" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Authority Content Hub</h1>
        <p className="text-lg text-muted max-w-3xl mb-4">
          Scalable content architecture powering organic growth across India and UAE.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted mb-12">
          <span>{ARTICLE_BLUEPRINTS.length} article blueprints</span>
          <span>·</span>
          <span>{GLOSSARY_TERMS.length} glossary terms</span>
          <span>·</span>
          <span>{BLUEPRINT_CATEGORIES.length} content categories</span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6">Content Collections</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CONTENT_HUB_ROUTES.map((col) => (
            <Link key={col.id} href={col.path} className="rounded-xl border border-border bg-primary/30 p-5 hover:border-accent/40 transition-colors group">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{col.label}</h3>
              <p className="text-xs text-muted mt-2">{col.description}</p>
              <ArrowRight className="h-4 w-4 text-accent mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6">Article Blueprint Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {BLUEPRINT_CATEGORIES.map((cat) => {
            const count = ARTICLE_BLUEPRINTS.filter((b) => b.category === cat).length;
            return (
              <div key={cat} className="rounded-lg border border-border p-4">
                <p className="font-medium text-foreground text-sm">{cat}</p>
                <p className="text-xs text-muted">{count} blueprints</p>
              </div>
            );
          })}
        </div>
        <Link href="/content/blueprints" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
          Browse all blueprints <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
