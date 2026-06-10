"use client";

import { MARKET_WIDGETS, ECONOMIC_CALENDAR, MARKET_COMMENTARY, AI_INSIGHTS, MACRO_ALERTS, MARKET_REGIME } from "@/data/intelligence/market-terminal";
import { IntelligenceHeader } from "./intelligence-header";
import { TrustScoreWidget } from "./trust-score-widget";

export function MarketTerminal() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Market Intelligence"
          title="PrysmAlgo Terminal"
          description="Bloomberg-style market intelligence with AI insights, macro alerts, and regime detection."
          breadcrumb={{ name: "Terminal", path: "/terminal" }}
        />

        <div className="rounded-xl border border-accent/20 bg-primary p-4 mb-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-mono text-accent uppercase tracking-widest">PRYSM TERMINAL v5.0</span>
            <span className="text-xs text-muted font-mono">{new Date().toUTCString()}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {MARKET_WIDGETS.map((w) => (
              <div key={w.id} className="rounded-lg border border-border/60 bg-primary/40 p-3 font-mono">
                <p className="text-[10px] text-muted uppercase">{w.symbol}</p>
                <p className="text-lg font-bold text-foreground">{w.price.toLocaleString()}</p>
                <p className={`text-xs ${w.changePct >= 0 ? "text-success" : "text-red-400"}`}>
                  {w.changePct >= 0 ? "+" : ""}{w.changePct.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 rounded-xl border border-border bg-primary/30 p-6">
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Market Commentary</h2>
            <p className="text-sm text-muted leading-relaxed">{MARKET_COMMENTARY}</p>
            <div className="mt-6 rounded-lg border border-border/50 bg-background/30 p-4">
              <h3 className="text-xs font-semibold text-foreground mb-2">Regime Detection</h3>
              <p className="text-lg font-bold text-accent">{MARKET_REGIME.current}</p>
              <p className="text-xs text-muted mt-1">{MARKET_REGIME.description}</p>
              <p className="text-[10px] text-muted mt-2">Confidence: {MARKET_REGIME.confidence}%</p>
            </div>
          </div>
          <TrustScoreWidget compact />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-border bg-primary/30 p-6">
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">AI Generated Insights</h2>
            {AI_INSIGHTS.map((ins) => (
              <div key={ins.title} className="mb-4 pb-4 border-b border-border/50 last:border-0">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{ins.title}</p>
                  <span className="text-[10px] text-accent">{ins.confidence}% conf.</span>
                </div>
                <p className="text-xs text-muted">{ins.body}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-primary/30 p-6">
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">Macro Alerts</h2>
            {MACRO_ALERTS.map((a) => (
              <div key={a.message} className={`mb-3 rounded-lg p-3 text-xs ${
                a.level === "high" ? "bg-red-500/10 border border-red-500/20 text-red-300" :
                a.level === "medium" ? "bg-amber-500/10 border border-amber-500/20 text-amber-300" :
                "bg-blue-500/10 border border-blue-500/20 text-blue-300"
              }`}>
                <span className="font-semibold uppercase">{a.level}</span> — {a.message}
              </div>
            ))}
            <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">Economic Calendar</h3>
            {ECONOMIC_CALENDAR.map((e) => (
              <div key={e.event} className="flex justify-between py-2 border-b border-border/50 text-xs">
                <div><span className="text-muted">{e.time}</span> <span className="text-foreground">{e.event}</span></div>
                <span className={e.impact === "High" ? "text-red-400" : "text-muted"}>{e.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
