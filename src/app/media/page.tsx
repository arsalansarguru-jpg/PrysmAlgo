import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { MediaCenterPage } from "@/components/growth/media-center-page";

export const metadata: Metadata = createMetadata({
  title: "Media Center | Press & Publications",
  description: "PrysmAlgo press mentions, podcasts, and speaking engagements.",
  path: "/media",
  keywords: ["PrysmAlgo press", "algorithmic trading media", "fintech news"],
});

export default function MediaPage() {
  return <MediaCenterPage />;
}
