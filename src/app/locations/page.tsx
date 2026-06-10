import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { locationPages } from "@/data/seo-locations";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "Algorithmic Trading by Location | India, UAE, USA, UK",
  description:
    "PrysmAlgo serves institutional investors in India, UAE, USA, UK, Mumbai, Dubai, London, and New York with AI-powered algorithmic trading technology.",
  path: "/locations",
  keywords: ["algorithmic trading India", "algorithmic trading UAE", "algorithmic trading USA", "algorithmic trading UK", "AI trading London", "AI trading New York"],
});

export default function LocationsPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Locations", path: "/locations" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
          Algorithmic Trading by Location
        </h1>
        <p className="text-lg text-muted max-w-3xl mb-12">
          Institutional algorithmic trading services for investors in India, UAE, USA, UK, and global markets.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {locationPages.map((page) => (
            <Link
              key={page.slug}
              href={`/locations/${page.slug}`}
              className="group rounded-xl border border-border bg-primary/30 p-8 hover:border-accent/30 transition-colors"
            >
              <span className="text-xs uppercase tracking-brand text-accent">{page.category}</span>
              <h2 className="text-xl font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                {page.title}
              </h2>
              <p className="text-sm text-muted mt-3 line-clamp-2">{page.description}</p>
              <span className="flex items-center gap-1 text-xs text-accent mt-4">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
