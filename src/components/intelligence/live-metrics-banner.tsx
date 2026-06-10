"use client";

import { usePerformance } from "@/hooks/use-performance";

export function LiveMetricsBanner() {
  const { data, isLive } = usePerformance();
  const m = data.metrics;

  return (
    <div className="rounded-xl border border-border bg-primary/30 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">PRYSM BLUE — Live Metrics</h2>
        {isLive && <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">Live · {m.provider}</span>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Return", value: `+${m.totalReturn}%` },
          { label: "Max Drawdown", value: `${m.maxDrawdown}%` },
          { label: "Win Rate", value: `${m.winRate}%` },
          { label: "Profit Factor", value: m.profitFactor.toFixed(2) },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted">{item.label}</p>
            <p className="text-xl font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
