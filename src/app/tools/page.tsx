import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { SEO_TOOLS } from "@/data/seo-tools";

export const metadata: Metadata = createMetadata({
  title: "Free Trading Calculators & Tools",
  description: "Interactive drawdown, Sharpe ratio, position sizing, and portfolio allocation calculators for institutional investors.",
  path: "/tools",
  keywords: ["trading calculator", "sharpe ratio calculator", "drawdown calculator", "position sizing tool"],
});

export default function ToolsPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Tools", path: "/tools" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Interactive Tools</h1>
        <p className="text-lg text-muted max-w-3xl mb-4">Free institutional calculators designed for investors, analysts, and finance professionals.</p>
        <p className="text-sm text-muted mb-12">Embed-friendly · Shareable · Backlink-ready</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEO_TOOLS.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors">
              <Calculator className="h-6 w-6 text-accent mb-4" />
              <span className="text-[10px] uppercase tracking-brand text-accent">{t.category}</span>
              <h2 className="text-lg font-semibold text-foreground mt-2 mb-2">{t.title}</h2>
              <p className="text-sm text-muted">{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
