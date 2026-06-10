import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export interface PageSeoConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = "/og-image.svg",
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: PageSeoConfig): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = path === "/" ? `${SITE_CONFIG.name} | ${title}` : title;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: author ? [{ name: author }] : [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      locale: "en_US",
      url,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - ${title}`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@algoprysm",
      site: "@algoprysm",
    },
  };
}
