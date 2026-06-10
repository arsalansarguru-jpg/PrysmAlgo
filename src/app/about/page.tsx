import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { GLOBAL_KEYWORDS } from "@/lib/seo/keywords";
import { AboutPage } from "@/components/pages/about-page";

export const metadata: Metadata = createMetadata({
  title: "About PrysmAlgo | Company, Mission & Leadership",
  description:
    "Learn about PrysmAlgo's mission, vision, investment philosophy, technology, founder Arsalan Sarguru, and leadership team.",
  path: "/about",
  keywords: [...GLOBAL_KEYWORDS, "about prysmalgo", "algorithmic trading company India"],
});

export default function About() {
  return <AboutPage />;
}
