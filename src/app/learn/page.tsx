import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { resourcePages, RESOURCE_CATEGORIES } from "@/data/seo-silos";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Trading Education Hub | Algorithmic Trading Guides",
  description: "Comprehensive guides on algorithmic trading, AI trading, and risk management for institutional investors.",
  path: "/learn",
  keywords: ["algorithmic trading guides", "AI trading education", "trading knowledge hub"],
});

export default function LearnPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Learn", path: "/learn" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">Trading Education Hub</h1>
        <p className="text-lg text-muted max-w-3xl mb-12">Expert guides on algorithmic trading, AI investing, and risk management.</p>
        {RESOURCE_CATEGORIES.map((cat) => (
          <div key={cat.slug} className="mb-12">
            <h2 className="text-xl font-semibold text-accent mb-6 uppercase tracking-brand">{cat.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourcePages.filter((p) => p.category === cat.name).map((page) => (
                <Link key={page.slug} href={`/learn/${page.slug}`} className="group rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/30 transition-colors">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">{page.title}</h3>
                  <p className="text-sm text-muted line-clamp-2 mb-3">{page.description}</p>
                  <span className="flex items-center gap-1 text-xs text-accent">Read more <ArrowRight className="h-3 w-3" /></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
