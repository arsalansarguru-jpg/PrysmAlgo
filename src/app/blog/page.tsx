import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { GLOBAL_KEYWORDS } from "@/lib/seo/keywords";
import { BlogPage } from "@/components/pages/blog-page";

export const metadata: Metadata = createMetadata({
  title: "Insights & Research | Algorithmic Trading Blog",
  description:
    "Expert analysis on algorithmic trading, AI investing, risk management, forex markets, and institutional finance from PrysmAlgo Research.",
  path: "/blog",
  keywords: [...GLOBAL_KEYWORDS, "algorithmic trading blog", "AI trading insights"],
});

export default function Blog() {
  return <BlogPage />;
}
