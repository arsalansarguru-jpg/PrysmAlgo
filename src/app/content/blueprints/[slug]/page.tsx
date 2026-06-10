import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getBlueprintBySlug } from "@/data/article-blueprints";
import { ARTICLE_BLUEPRINTS } from "@/data/article-blueprints";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLE_BLUEPRINTS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bp = getBlueprintBySlug(slug);
  if (!bp) return { title: "Blueprint Not Found" };
  return createMetadata({
    title: `Blueprint: ${bp.seoTitle}`,
    description: bp.seoDescription,
    path: `/content/blueprints/${bp.slug}`,
    noIndex: true,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const bp = getBlueprintBySlug(slug);
  if (!bp) notFound();

  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Content Hub", path: "/content" }, { name: "Blueprints", path: "/content/blueprints" }, { name: bp.h1, path: `/content/blueprints/${bp.slug}` }]} />
        <span className="text-xs font-medium uppercase tracking-brand text-accent">{bp.category} · Blueprint</span>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-3 mb-6">{bp.h1}</h1>

        <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
          <div className="rounded-lg border border-border p-4"><p className="text-muted">SEO Title</p><p className="text-foreground">{bp.seoTitle}</p></div>
          <div className="rounded-lg border border-border p-4"><p className="text-muted">Target Keyword</p><p className="text-foreground">{bp.targetKeyword}</p></div>
          <div className="rounded-lg border border-border p-4"><p className="text-muted">Search Intent</p><p className="text-foreground capitalize">{bp.searchIntent}</p></div>
          <div className="rounded-lg border border-border p-4"><p className="text-muted">URL Slug</p><p className="text-foreground">/blog/{bp.slug}</p></div>
        </div>

        <p className="text-muted mb-8">{bp.seoDescription}</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">H2 Structure</h2>
          <ol className="list-decimal list-inside space-y-1 text-muted">
            {bp.h2Structure.map((h) => <li key={h}>{h}</li>)}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Secondary Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {bp.secondaryKeywords.map((k) => <span key={k} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{k}</span>)}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">FAQ Section</h2>
          {bp.faqs.map((f) => (
            <div key={f.question} className="mb-4">
              <p className="font-medium text-foreground text-sm">{f.question}</p>
              <p className="text-sm text-muted">{f.answer}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Internal Linking</h2>
          <ul className="space-y-1">
            {bp.internalLinks.map((l) => <li key={l.href} className="text-sm text-muted">{l.label} → {l.href}</li>)}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">CTA Placement</h2>
          <ul className="space-y-1">
            {bp.ctaPlacement.map((c) => <li key={c} className="text-sm text-muted">• {c}</li>)}
          </ul>
        </section>

        <Button asChild><Link href="/content/blueprints">← All Blueprints</Link></Button>
      </div>
    </article>
  );
}
