import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, faqSchema } from "@/lib/seo/schemas";
import { blogArticles } from "@/data/blog-articles";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/growth/newsletter-signup";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogArticles.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return createMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: `/academy/${post.slug}`,
    keywords: post.keywords,
    type: "article",
    publishedTime: post.date,
    author: post.author,
  });
}

export default async function AcademyArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogArticles.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogArticles.filter((a) => a.category === post.category && a.slug !== post.slug).slice(0, 3);

  return (
    <article className="pt-28 pb-24">
      <JsonLd data={[articleSchema({ title: post.title, description: post.metaDescription, slug: post.slug, pathPrefix: "/academy", date: post.date, author: post.author, category: post.category }), faqSchema(post.faqs)]} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Academy", path: "/academy" }, { name: post.title, path: `/academy/${post.slug}` }]} />
        <span className="text-xs font-medium uppercase tracking-brand text-accent">{post.category}</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted mb-8 pb-8 border-b border-border">
          <span>{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readTime}</span>
        </div>
        <div className="max-w-none space-y-8 text-muted">
          <p className="text-lg text-foreground leading-relaxed">{post.excerpt}</p>
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-muted leading-relaxed mb-3">{p}</p>
              ))}
            </section>
          ))}
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">FAQ</h2>
          <Accordion type="single" collapsible>
            {post.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {related.length > 0 && (
          <div className="mt-12 rounded-xl border border-border bg-primary/30 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-brand text-accent mb-4">Related Articles</h3>
            <div className="space-y-2">
              {related.map((link) => (
                <Link key={link.slug} href={`/academy/${link.slug}`} className="flex items-center gap-2 text-sm text-muted hover:text-accent">
                  <ArrowRight className="h-4 w-4" />{link.title}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="mt-12"><NewsletterSignup source={`academy-${post.slug}`} variant="inline" /></div>
        <div className="mt-8 flex gap-3">
          <Button asChild><Link href="/apply">Apply as Investor</Link></Button>
          <Button asChild variant="outline"><Link href="/investor-assessment">Take Assessment</Link></Button>
        </div>
      </div>
    </article>
  );
}
