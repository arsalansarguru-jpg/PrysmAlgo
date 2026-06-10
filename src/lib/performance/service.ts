import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  livePerformanceMetrics,
  equityCurveSeries,
  monthlyReturnsSeries,
  drawdownSeries,
} from "@/data/live-performance";
import type { PerformanceMetrics, PerformanceSnapshot } from "@/types/production";

function staticSnapshot(): PerformanceSnapshot {
  return {
    strategyId: "prysm-blue",
    metrics: { ...livePerformanceMetrics, source: "static" },
    equityCurve: equityCurveSeries,
    monthlyReturns: monthlyReturnsSeries,
    drawdownSeries: drawdownSeries,
  };
}

export async function getLivePerformance(strategyId = "prysm-blue"): Promise<PerformanceSnapshot> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return staticSnapshot();

  const { data } = await supabase
    .from("performance_snapshots")
    .select("*")
    .eq("strategy_id", strategyId)
    .order("snapshot_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!data) return staticSnapshot();

  const metrics = data.metrics as PerformanceMetrics;
  return {
    strategyId: data.strategy_id,
    metrics: { ...metrics, source: "live" },
    equityCurve: (data.equity_curve as PerformanceSnapshot["equityCurve"]) ?? [],
    monthlyReturns: (data.monthly_returns as PerformanceSnapshot["monthlyReturns"]) ?? [],
    drawdownSeries: (data.drawdown_series as PerformanceSnapshot["drawdownSeries"]) ?? [],
  };
}

export async function getPerformanceMeta() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { lastSync: null, providers: [] as string[] };

  const { data: logs } = await supabase
    .from("performance_sync_log")
    .select("provider, synced_at, status")
    .order("synced_at", { ascending: false })
    .limit(10);

  return {
    lastSync: logs?.[0]?.synced_at ?? null,
    providers: [...new Set((logs ?? []).map((l) => l.provider as string))],
  };
}
