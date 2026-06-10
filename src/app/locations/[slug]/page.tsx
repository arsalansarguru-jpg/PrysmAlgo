import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { SeoContentPageView } from "@/components/seo/seo-content-page";
import { locationPages } from "@/data/seo-locations";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locationPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = locationPages.find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/locations/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = locationPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <SeoContentPageView
      page={page}
      basePath="/locations"
      breadcrumbPrefix={{ name: "Locations", path: "/locations" }}
    />
  );
}
