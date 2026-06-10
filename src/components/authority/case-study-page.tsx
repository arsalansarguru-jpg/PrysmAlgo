import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import { getRelatedContent } from "@/lib/seo/internal-linking";
import { RelatedContent } from "./related-content";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { CaseStudy } from "@/types/content";

interface Props {
  study: CaseStudy;
}

export function CaseStudyPageView({ study }: Props) {
  const related = getRelatedContent({ slug: study.slug, category: study.category, type: "case-study" });

  return (
    <article className="pt-28 pb-24">
      <JsonLd data={faqSchema(study.faqs)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Case Studies", path: "/case-studies" }, { name: study.title, path: `/case-studies/${study.slug}` }]} />
        <span className="text-xs font-medium uppercase tracking-brand text-accent">{study.category}</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">{study.title}</h1>
        <p className="text-muted mb-2">{study.investorProfile} · {study.capitalRange}</p>
        <p className="text-lg text-muted leading-relaxed mb-10">{study.excerpt}</p>

        {[
          { title: "Problem", content: study.problem },
          { title: "Solution", content: study.solution },
          { title: "Risk Framework", content: study.riskFramework },
          { title: "Capital Allocation", content: study.capitalAllocation },
        ].map((s) => (
          <section key={s.title} className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">{s.title}</h2>
            <p className="text-muted leading-relaxed">{s.content}</p>
          </section>
        ))}

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {study.results.map((r) => (
              <div key={r.label} className="rounded-lg border border-border p-4 text-center">
                <p className="text-xs text-muted uppercase">{r.label}</p>
                <p className="text-lg font-bold text-foreground mt-1">{r.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">Lessons Learned</h2>
          <ul className="space-y-2">
            {study.lessonsLearned.map((l) => (
              <li key={l} className="text-muted leading-relaxed flex gap-2">
                <span className="text-accent">•</span> {l}
              </li>
            ))}
          </ul>
        </section>

        {study.faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">FAQ</h2>
            <Accordion type="single" collapsible>
              {study.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center mb-8">
          <Button asChild size="lg"><Link href="/apply">Apply Now</Link></Button>
        </div>

        <RelatedContent related={related} />
      </div>
    </article>
  );
}
