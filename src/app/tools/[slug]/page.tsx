import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import { getRelatedContent } from "@/lib/seo/internal-linking";
import { RelatedContent } from "@/components/authority/related-content";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEO_TOOLS, getSeoTool } from "@/data/seo-tools";

const CALC_HASH: Record<string, string> = {
  compound: "compound",
  drawdown: "drawdown",
  position: "position",
  rr: "rr",
  allocation: "allocation",
  sharpe: "compound",
  "profit-factor": "compound",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getSeoTool(slug);
  if (!tool) return { title: "Tool Not Found" };
  return createMetadata({
    title: tool.title,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tool = getSeoTool(slug);
  if (!tool) notFound();
  const related = getRelatedContent({ slug, category: tool.category, keywords: tool.keywords });
  const hash = CALC_HASH[tool.calculatorId] ?? "compound";

  return (
    <article className="pt-28 pb-24">
      <JsonLd data={faqSchema(tool.faqs)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Tools", path: "/tools" }, { name: tool.title, path: `/tools/${tool.slug}` }]} />
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">{tool.title}</h1>
        <p className="text-lg text-muted mb-8">{tool.description}</p>
        <div className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center mb-10">
          <p className="text-foreground mb-4">Use our interactive calculator with real-time results and export.</p>
          <Button asChild size="lg">
            <Link href={`/calculators#${hash}`}>Open Calculator</Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="mb-10">
          {tool.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <RelatedContent related={related} />
      </div>
    </article>
  );
}
