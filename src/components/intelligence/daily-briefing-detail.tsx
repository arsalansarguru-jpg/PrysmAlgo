import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import type { DailyBriefing } from "@/types/intelligence";

export function DailyBriefingDetail({ briefing }: { briefing: DailyBriefing }) {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Daily Briefing", path: "/daily-briefing" }, { name: briefing.title, path: `/daily-briefing/${briefing.slug}` }]} />
        <span className="text-xs text-accent uppercase tracking-brand">Regime: {briefing.regime}</span>
        <h1 className="font-display text-3xl font-bold text-foreground mt-3 mb-6">{briefing.title}</h1>

        {[
          { title: "Market Summary", content: briefing.marketSummary },
          { title: "Gold Outlook", content: briefing.goldOutlook },
          { title: "Forex Outlook", content: briefing.forexOutlook },
          { title: "Algorithm Positioning", content: briefing.algorithmPositioning },
        ].map((s) => (
          <section key={s.title} className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">{s.title}</h2>
            <p className="text-muted leading-relaxed">{s.content}</p>
          </section>
        ))}

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Economic Events</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            {briefing.economicEvents.map((e) => (
              <div key={e.event} className="flex justify-between px-4 py-3 border-b border-border/50 text-sm">
                <span className="text-foreground">{e.time} — {e.event}</span>
                <span className={e.impact === "High" ? "text-red-400" : "text-muted"}>{e.impact}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Risk Alerts</h2>
          <ul className="space-y-2">
            {briefing.riskAlerts.map((a) => (
              <li key={a} className="text-sm text-muted flex gap-2"><span className="text-red-400">⚠</span>{a}</li>
            ))}
          </ul>
        </section>

        <Button asChild variant="outline"><Link href="/daily-briefing">← All Briefings</Link></Button>
      </div>
    </article>
  );
}
