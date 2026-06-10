import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { SeoContentPageView } from "@/components/seo/seo-content-page";
import { resourcePages } from "@/data/seo-silos";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resourcePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = resourcePages.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/learn/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function LearnArticlePage({ params }: Props) {
  const { slug } = await params;
  const page = resourcePages.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <SeoContentPageView
      page={page}
      basePath="/learn"
      breadcrumbPrefix={{ name: "Learn", path: "/learn" }}
    />
  );
}
