import Link from "next/link";
import { FileText } from "lucide-react";
import { IntelligenceHeader } from "./intelligence-header";
import { INSTITUTE_CATEGORIES, INSTITUTE_REPORTS } from "@/data/intelligence/research-institute";

export function ResearchInstituteHub() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Prysm Research Institute"
          title="Institutional Research"
          description="Macro research, market structure, AI trading, risk, quantitative analysis, and economic intelligence. PDF-ready reports."
          breadcrumb={{ name: "Research Institute", path: "/research-institute" }}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {INSTITUTE_CATEGORIES.map((cat) => (
            <div key={cat.slug} className="rounded-xl border border-border bg-primary/30 p-5">
              <h3 className="font-semibold text-foreground">{cat.name}</h3>
              <p className="text-xs text-muted mt-1">{INSTITUTE_REPORTS.filter((r) => r.categorySlug === cat.slug).length} reports</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTITUTE_REPORTS.map((r) => (
            <Link key={r.slug} href={`/research-institute/${r.slug}`} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors group">
              <FileText className="h-5 w-5 text-accent mb-3" />
              <span className="text-[10px] uppercase tracking-brand text-accent">{r.category}</span>
              <h2 className="text-base font-semibold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">{r.title}</h2>
              <p className="text-xs text-muted line-clamp-2">{r.excerpt}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">{r.tier}</span>
                {r.pdfReady && <span className="text-[10px] text-muted">PDF Ready</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
