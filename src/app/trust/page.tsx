import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { GLOBAL_KEYWORDS } from "@/lib/seo/keywords";
import { TrustPage } from "@/components/pages/trust-page";

export const metadata: Metadata = createMetadata({
  title: "Why Trust PrysmAlgo | Institutional Trust & Transparency",
  description:
    "Discover why institutional investors trust PrysmAlgo. Risk philosophy, methodology, technology transparency, and performance integrity for serious investors.",
  path: "/trust",
  keywords: [...GLOBAL_KEYWORDS, "why trust prysmalgo", "institutional trust"],
});

export default function Trust() {
  return <TrustPage />;
}
