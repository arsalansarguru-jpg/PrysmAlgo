import Link from "next/link";
import { IntelligenceHeader } from "./intelligence-header";
import { INSIGHTS } from "@/data/intelligence/insights";

const TYPE_LABELS: Record<string, string> = {
  commentary: "Founder Commentary",
  letter: "Market Letter",
  note: "Investor Note",
  macro: "Macro Report",
  outlook: "Quarterly Outlook",
  video: "Video Update",
  podcast: "Podcast",
};

export function InsightsHub() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Executive Insights"
          title="Founder & Research Insights"
          description="Founder commentary, market letters, investor notes, macro reports, and quarterly outlooks."
          breadcrumb={{ name: "Insights", path: "/insights" }}
        />
        <div className="space-y-6">
          {INSIGHTS.map((a) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className="block rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors">
              <span className="text-[10px] uppercase tracking-brand text-accent">{TYPE_LABELS[a.type] ?? a.type}</span>
              <h2 className="text-xl font-semibold text-foreground mt-2 mb-2">{a.title}</h2>
              <p className="text-sm text-muted">{a.excerpt}</p>
              <p className="text-xs text-muted/60 mt-3">{a.author} · {a.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
