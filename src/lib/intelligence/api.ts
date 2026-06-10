/**
 * Mobile-ready API layer (V5.0)
 * Shared by PWA, iOS, Android clients
 */

export const API_V1 = {
  briefings: "/api/v1/briefings",
  briefing: (slug: string) => `/api/v1/briefings/${slug}`,
  terminal: "/api/v1/terminal",
  trustScore: "/api/v1/trust-score",
  portal: "/api/v1/portal",
  institute: "/api/v1/institute",
  university: "/api/v1/university",
  insights: "/api/v1/insights",
  community: "/api/v1/community",
  membership: "/api/v1/membership",
} as const;

export const PWA_MANIFEST = {
  name: "PrysmAlgo Intelligence",
  short_name: "PrysmAlgo",
  description: "Investor Intelligence Platform",
  start_url: "/terminal",
  display: "standalone",
  background_color: "#0a0a0f",
  theme_color: "#a855f7",
};
