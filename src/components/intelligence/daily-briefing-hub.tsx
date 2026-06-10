"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IntelligenceHeader } from "./intelligence-header";
import { DAILY_BRIEFINGS, getLatestBriefing } from "@/data/intelligence/daily-briefings";

export function DailyBriefingHub() {
  const [query, setQuery] = useState("");
  const latest = getLatestBriefing();

  const filtered = useMemo(() => {
    if (!query) return DAILY_BRIEFINGS;
    const q = query.toLowerCase();
    return DAILY_BRIEFINGS.filter((b) => b.title.toLowerCase().includes(q) || b.marketSummary.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Daily Intelligence"
          title="Investor First Daily Briefing"
          description="Market summary, gold & forex outlook, economic events, and algorithm positioning — published every trading day."
          breadcrumb={{ name: "Daily Briefing", path: "/daily-briefing" }}
        />

        {latest && (
          <Link href={`/daily-briefing/${latest.slug}`} className="block rounded-xl border border-accent/30 bg-accent/5 p-6 mb-10 hover:border-accent/50 transition-colors">
            <span className="text-[10px] uppercase tracking-brand text-accent">Today&apos;s Briefing</span>
            <h2 className="text-xl font-bold text-foreground mt-2 mb-2">{latest.title}</h2>
            <p className="text-sm text-muted line-clamp-2">{latest.marketSummary}</p>
          </Link>
        )}

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input placeholder="Search briefing archive..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
        </div>

        <div className="space-y-3">
          {filtered.map((b) => (
            <Link key={b.slug} href={`/daily-briefing/${b.slug}`} className="block rounded-lg border border-border bg-primary/30 p-4 hover:border-accent/30 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">{b.title}</p>
                  <p className="text-xs text-muted mt-1">Regime: {b.regime}</p>
                </div>
                <span className="text-xs text-muted">{b.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
