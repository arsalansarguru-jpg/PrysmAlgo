import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { GlossaryTermPage } from "@/components/authority/glossary-term-page";
import { GLOSSARY_TERMS, getGlossaryTerm } from "@/data/glossary";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY_TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) return { title: "Term Not Found" };
  return createMetadata({
    title: `${term.term} — Definition & Guide`,
    description: term.definition,
    path: `/glossary/${term.slug}`,
    keywords: term.keywords,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const term = getGlossaryTerm(slug);
  if (!term) notFound();
  return <GlossaryTermPage term={term} />;
}
