import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { guidePages } from "@/data/seo-guides";
import { ArrowRight } from "lucide-react";
import { LeadCaptureForm } from "@/components/seo/lead-capture-form";

export const metadata: Metadata = createMetadata({
  title: "Investor Guides & Whitepapers | Free Resources",
  description:
    "Free institutional investor guides, whitepapers, and performance reports from PrysmAlgo.",
  path: "/guides",
  keywords: ["investor guides", "trading whitepapers", "algorithmic trading resources"],
});

export default function GuidesPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-6">
          Investor Guides & Resources
        </h1>
        <p className="text-lg text-muted max-w-3xl mb-12">
          Free institutional resources for qualified investors evaluating algorithmic trading technology.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {guidePages.map((page) => (
            <Link
              key={page.slug}
              href={`/guides/${page.slug}`}
              className="group rounded-xl border border-border bg-primary/30 p-8 hover:border-accent/30 transition-colors"
            >
              <span className="text-xs uppercase tracking-brand text-accent">{page.category}</span>
              <h2 className="text-xl font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                {page.title}
              </h2>
              <p className="text-sm text-muted mt-3">{page.description}</p>
              <span className="flex items-center gap-1 text-xs text-accent mt-4">
                Read guide <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <LeadCaptureForm
            title="Request Full Whitepapers"
            description="Enter your email to receive downloadable PDF versions of our institutional guides and performance reports."
            resourceName="PrysmAlgo Institutional Whitepapers"
          />
        </div>
      </div>
    </div>
  );
}
