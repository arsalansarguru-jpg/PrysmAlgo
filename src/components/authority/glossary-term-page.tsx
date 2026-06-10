import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { definedTermSchema } from "@/lib/seo/schemas";
import { getGlossaryRelatedTerms, getRelatedContent } from "@/lib/seo/internal-linking";
import { RelatedContent } from "./related-content";
import { Button } from "@/components/ui/button";
import type { GlossaryTerm } from "@/types/content";

interface Props {
  term: GlossaryTerm;
}

export function GlossaryTermPage({ term }: Props) {
  const relatedTerms = getGlossaryRelatedTerms(term.slug, term.relatedTerms);
  const related = getRelatedContent({ slug: term.slug, category: term.category, keywords: term.keywords, type: "glossary" });

  return (
    <article className="pt-28 pb-24">
      <JsonLd data={definedTermSchema(term)} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Glossary", path: "/glossary" }, { name: term.term, path: `/glossary/${term.slug}` }]} />
        <span className="text-xs font-medium uppercase tracking-brand text-accent">{term.category}</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">{term.term}</h1>
        <p className="text-lg text-muted leading-relaxed mb-8">{term.definition}</p>

        {relatedTerms.length > 0 && (
          <div className="rounded-xl border border-border p-6 mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-brand text-accent mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((t) => (
                <Link key={t.href} href={t.href} className="rounded-full border border-border px-3 py-1 text-sm text-muted hover:text-accent hover:border-accent/40 transition-colors">
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
          <p className="text-foreground font-medium mb-4">Apply this knowledge to your portfolio</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild><Link href="/investor-assessment">Take Assessment</Link></Button>
            <Button asChild variant="outline"><Link href="/live-performance">View Performance</Link></Button>
          </div>
        </div>

        <RelatedContent related={related} />
      </div>
    </article>
  );
}
