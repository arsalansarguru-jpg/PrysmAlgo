import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { SeoContentPageView } from "@/components/seo/seo-content-page";
import { RelatedContent } from "./related-content";
import { getRelatedContent } from "@/lib/seo/internal-linking";
import { getCityRoute, type ProgrammaticVertical } from "@/data/programmatic-cities";

export function getCityMetadata(vertical: ProgrammaticVertical, citySlug: string): Metadata {
  const route = getCityRoute(vertical, citySlug);
  if (!route) return { title: "Not Found" };
  return createMetadata({
    title: route.page.title,
    description: route.page.description,
    path: `/${vertical}/${citySlug}`,
    keywords: route.page.keywords,
  });
}

export function ProgrammaticCityRoute({ vertical, citySlug }: { vertical: ProgrammaticVertical; citySlug: string }) {
  const route = getCityRoute(vertical, citySlug);
  if (!route) notFound();
  const related = getRelatedContent({ slug: `${vertical}-${citySlug}`, category: vertical, keywords: route.page.keywords });

  const verticalLabel = vertical.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <SeoContentPageView
        page={route.page}
        basePath={`/${vertical}`}
        breadcrumbPrefix={{ name: verticalLabel, path: `/${vertical}/${citySlug}` }}
        showLeadCapture
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <RelatedContent related={related} />
      </div>
    </>
  );
}
