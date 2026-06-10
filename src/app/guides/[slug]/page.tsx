import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { SeoContentPageView } from "@/components/seo/seo-content-page";
import { guidePages } from "@/data/seo-guides";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guidePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = guidePages.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/guides/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = guidePages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <SeoContentPageView
      page={page}
      basePath="/guides"
      breadcrumbPrefix={{ name: "Guides", path: "/guides" }}
      showLeadCapture
    />
  );
}
