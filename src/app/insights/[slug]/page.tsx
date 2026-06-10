import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { INSIGHTS, getInsight } from "@/data/intelligence/insights";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return { title: "Not Found" };
  return createMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, type: "article", publishedTime: a.date, author: a.author });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Insights", path: "/insights" }, { name: article.title, path: `/insights/${article.slug}` }]} />
        <p className="text-xs text-muted">{article.author} · {article.date}</p>
        <h1 className="font-display text-3xl font-bold text-foreground mt-2 mb-6">{article.title}</h1>
        <p className="text-lg text-muted leading-relaxed">{article.content}</p>
        <Button asChild variant="outline" className="mt-8"><Link href="/insights">← All Insights</Link></Button>
      </div>
    </article>
  );
}
