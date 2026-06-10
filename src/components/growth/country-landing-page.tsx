import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewsletterSignup } from "./newsletter-signup";
import type { CountryLanding } from "@/data/country-landings";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  page: CountryLanding;
}

export function CountryLandingPage({ page }: Props) {
  return (
    <article className="pt-28 pb-24">
      <JsonLd data={faqSchema(page.faqs)} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: page.title, path: `/${page.slug}` }]} />

        <span className="text-xs font-medium uppercase tracking-brand text-accent">{page.category}</span>
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-4">{page.title}</h1>
        <p className="text-lg text-muted leading-relaxed mb-10">{page.heroSubtitle}</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {page.benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-primary/30 p-5">
              <CheckCircle className="h-5 w-5 text-accent mb-2" />
              <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-none space-y-10 mb-16 text-muted">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-muted leading-relaxed mb-3">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {page.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 mb-12 text-center">
          <h2 className="text-xl font-bold text-foreground mb-3">Ready to Explore PrysmAlgo?</h2>
          <p className="text-sm text-muted mb-6 max-w-lg mx-auto">
            Schedule a consultation with our investor relations team or take our qualification assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer">
                Book Strategy Call <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/investor-assessment">Investor Assessment</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>

        <NewsletterSignup source={`country-${page.slug}`} />
      </div>
    </article>
  );
}
