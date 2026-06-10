import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, faqSchema } from "@/lib/seo/schemas";
import { getRelatedContent } from "@/lib/seo/internal-linking";
import { RelatedContent } from "@/components/authority/related-content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { RESEARCH_REPORTS, getResearchReport } from "@/data/research-reports";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return RESEARCH_REPORTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const report = getResearchReport(slug);
  if (!report) return { title: "Report Not Found" };
  return createMetadata({
    title: report.title,
    description: report.excerpt,
    path: `/research/${report.slug}`,
    type: "article",
    publishedTime: report.date,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const report = getResearchReport(slug);
  if (!report) notFound();
  const related = getRelatedContent({ slug, category: report.category, type: "research" });

  return (
    <article className="pt-28 pb-24">
      <JsonLd data={[articleSchema({ title: report.title, description: report.excerpt, slug: report.slug, date: report.date, author: "PrysmAlgo Research", category: report.category, pathPrefix: "/research" }), faqSchema(report.faqs)]} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Research", path: "/research" }, { name: report.title, path: `/research/${report.slug}` }]} />
        <span className="text-xs font-medium uppercase tracking-brand text-accent">{report.category}</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">{report.title}</h1>
        <p className="text-lg text-muted mb-6">{report.excerpt}</p>
        <div className="rounded-lg border border-border bg-primary/30 p-4 mb-10">
          <h2 className="text-sm font-semibold text-foreground mb-2">Key Takeaways</h2>
          <ul className="space-y-1">
            {report.keyTakeaways.map((t) => <li key={t} className="text-sm text-muted">• {t}</li>)}
          </ul>
        </div>
        <div className="space-y-8 mb-10">
          {report.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{s.heading}</h2>
              {s.paragraphs.map((p, i) => <p key={i} className="text-muted leading-relaxed mb-3">{p}</p>)}
            </section>
          ))}
        </div>
        <Accordion type="single" collapsible className="mb-10">
          {report.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mb-10">
          <Button asChild><Link href="/investor-assessment">Take Investor Assessment</Link></Button>
        </div>
        <RelatedContent related={related} />
      </div>
    </article>
  );
}
