import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";
import { JsonLd } from "./json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "./lead-capture-form";
import type { SeoContentPage } from "@/types/seo";

interface SeoContentPageProps {
  page: SeoContentPage;
  basePath: string;
  breadcrumbPrefix: { name: string; path: string };
  showLeadCapture?: boolean;
}

export function SeoContentPageView({
  page,
  basePath,
  breadcrumbPrefix,
  showLeadCapture = false,
}: SeoContentPageProps) {
  return (
    <article className="pt-28 pb-24">
      <JsonLd data={faqSchema(page.faqs)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            breadcrumbPrefix,
            { name: page.title, path: `${basePath}/${page.slug}` },
          ]}
        />

        <span className="text-xs font-medium uppercase tracking-brand text-accent">
          {page.category}
        </span>
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
          {page.title}
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-10">{page.description}</p>

        <div className="max-w-none space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-muted leading-relaxed mb-3">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {page.internalLinks.length > 0 && (
          <div className="mt-12 rounded-xl border border-border bg-primary/30 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-brand text-accent mb-4">
              Related Resources
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {page.internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                >
                  <ArrowRight className="h-4 w-4 shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {showLeadCapture && (
          <div className="mt-12">
            <LeadCaptureForm resourceName={page.title} />
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {page.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button asChild>
            <Link href="/apply">Apply as Investor <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
