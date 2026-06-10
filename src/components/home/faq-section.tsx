"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/shared/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo/schemas";
import { faqs } from "@/data/content";

export function FaqSection() {
  return (
    <section className="py-24 lg:py-32">
      <JsonLd data={faqSchema(faqs)} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="FAQ"
          title="Investor Questions"
          description="Comprehensive answers to the questions institutional and high-net-worth investors ask most frequently."
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
