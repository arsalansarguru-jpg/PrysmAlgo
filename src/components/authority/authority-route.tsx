import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { AuthorityPageView } from "./authority-page-view";
import { getAuthorityPage } from "@/data/authority-pages";

export function getAuthorityMetadata(slug: string): Metadata {
  const page = getAuthorityPage(slug);
  if (!page) return { title: "Not Found" };
  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${slug}`,
    keywords: page.keywords,
  });
}

export function AuthorityRoute({ slug }: { slug: string }) {
  const page = getAuthorityPage(slug);
  if (!page) notFound();
  return <AuthorityPageView page={page} basePath="" />;
}
