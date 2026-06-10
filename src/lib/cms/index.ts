export { CMS_COLLECTIONS, CONTENT_HUB_ROUTES, getCollection } from "./collections";

/**
 * MDX migration path (Phase 15):
 * 1. Add content/{collection}/*.mdx with frontmatter
 * 2. Use contentlayer or next-mdx-remote to compile
 * 3. Point collection `source` to "mdx" and load from filesystem
 *
 * Sanity migration path:
 * 1. Mirror CmsCollectionMeta ids as Sanity document types
 * 2. Replace data imports with GROQ fetch in generateStaticParams
 */

export const CMS_DEPLOYMENT_STRATEGY = {
  phase1: "TypeScript data modules (current) — zero infra, full SSG",
  phase2: "MDX in /content — git-based publishing for editors",
  phase3: "Sanity Studio — non-technical CMS with preview",
  caching: "ISR revalidate 3600 on dynamic collections",
  webhooks: "NEXT_PUBLIC_LEAD_WEBHOOK_URL for all lead forms",
} as const;
