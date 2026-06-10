import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { getCountryLanding } from "@/data/country-landings";
import { CountryLandingPage } from "./country-landing-page";

interface Props {
  slug: string;
}

export function getCountryMetadata(slug: string): Metadata {
  const page = getCountryLanding(slug);
  if (!page) return { title: "Not Found" };
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${slug}`,
    keywords: page.keywords,
  });
}

export function CountryLandingRoute({ slug }: Props) {
  const page = getCountryLanding(slug);
  if (!page) notFound();
  return <CountryLandingPage page={page} />;
}
