import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CASE_STUDIES } from "@/data/case-studies";

export const metadata: Metadata = createMetadata({
  title: "Investor Case Studies",
  description: "Real allocation frameworks and outcomes from qualified investors using PrysmAlgo systematic strategies.",
  path: "/case-studies",
  keywords: ["trading case studies", "algorithmic trading results", "investor outcomes"],
});

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Case Studies", path: "/case-studies" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Investor Case Studies</h1>
        <p className="text-lg text-muted max-w-3xl mb-12">Allocation frameworks, risk controls, and lessons from qualified investors across India and UAE.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((s) => (
            <Link key={s.slug} href={`/case-studies/${s.slug}`} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors">
              <span className="text-[10px] uppercase tracking-brand text-accent">{s.category}</span>
              <h2 className="text-lg font-semibold text-foreground mt-2 mb-2">{s.title}</h2>
              <p className="text-sm text-muted line-clamp-3">{s.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
