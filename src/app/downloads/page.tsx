import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LEAD_MAGNETS } from "@/data/lead-magnets";

export const metadata: Metadata = createMetadata({
  title: "Free Institutional Downloads",
  description: "Download algorithmic trading guides, risk handbooks, and investor due diligence checklists.",
  path: "/downloads",
  keywords: ["free trading guide", "algorithmic trading pdf", "investor resources"],
});

export default function DownloadsPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Downloads", path: "/downloads" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Free Downloads</h1>
        <p className="text-lg text-muted max-w-3xl mb-12">Institutional guides and checklists for qualified investors. Email required.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEAD_MAGNETS.map((m) => (
            <Link key={m.slug} href={`/downloads/${m.slug}`} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors group">
              <Download className="h-6 w-6 text-accent mb-4" />
              <span className="text-[10px] uppercase tracking-brand text-accent">{m.category}</span>
              <h2 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-accent transition-colors">{m.title}</h2>
              <p className="text-sm text-muted line-clamp-2">{m.description}</p>
              <p className="text-xs text-muted/60 mt-3">{m.fileType} · {m.pages} pages</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
