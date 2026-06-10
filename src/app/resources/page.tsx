import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ResourceLibraryPage } from "@/components/growth/resource-library-page";

export const metadata: Metadata = createMetadata({
  title: "Resource Library | Investor Guides & Handbooks",
  description: "Download institutional investor guides, risk management handbooks, and algorithmic trading frameworks from PrysmAlgo.",
  path: "/resources",
  keywords: ["investor guide PDF", "trading handbook", "algorithmic trading resources"],
});

export default function ResourcesPage() {
  return <ResourceLibraryPage />;
}
