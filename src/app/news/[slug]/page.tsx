import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { newsArticleSchema } from "@/lib/seo/schemas";
import { getRelatedContent } from "@/lib/seo/internal-linking";
import { RelatedContent } from "@/components/authority/related-content";
import { NEWS_ARTICLES, getNewsArticle } from "@/data/news";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return { title: "Article Not Found" };
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    author: article.author,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();
  const related = getRelatedContent({ slug, category: article.category, type: "news" });

  return (
    <article className="pt-28 pb-24">
      <JsonLd data={newsArticleSchema({ title: article.title, description: article.excerpt, slug: article.slug, date: article.date, author: article.author })} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "News", path: "/news" }, { name: article.title, path: `/news/${article.slug}` }]} />
        <span className="text-xs font-medium uppercase tracking-brand text-accent">{article.category}</span>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">{article.title}</h1>
        <p className="text-sm text-muted mb-8">{article.author} · {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <div className="max-w-none space-y-8 text-muted">
          {article.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-3">{s.heading}</h2>
              {s.paragraphs.map((p, i) => <p key={i} className="text-muted leading-relaxed mb-3">{p}</p>)}
            </section>
          ))}
        </div>
        <RelatedContent related={related} />
      </div>
    </article>
  );
}
