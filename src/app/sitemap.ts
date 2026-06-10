import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllSitemapEntries } from "@/lib/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSitemapEntries().map((entry) => ({
    url: `${SITE_CONFIG.url}${entry.path}`,
    lastModified: entry.lastModified || new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
