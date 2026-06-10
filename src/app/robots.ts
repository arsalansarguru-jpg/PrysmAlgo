import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { DISALLOWED_ROUTES } from "@/lib/seo/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog/", "/resources/", "/locations/", "/guides/"],
        disallow: DISALLOWED_ROUTES,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: DISALLOWED_ROUTES,
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
