import { getSupabaseAdmin } from "@/lib/supabase/server";
import { fetchFxBluePerformance } from "./providers/fxblue";
import { fetchMyfxbookPerformance } from "./providers/myfxbook";
import { fetchBrokerPerformance } from "./providers/broker";

export interface SyncResult {
  provider: string;
  status: "success" | "error" | "partial";
  recordsSynced: number;
  error?: string;
}

export async function syncAllPerformanceProviders(): Promise<SyncResult[]> {
  const providers = [
    { name: "fxblue", fetch: fetchFxBluePerformance },
    { name: "myfxbook", fetch: fetchMyfxbookPerformance },
    { name: "broker", fetch: fetchBrokerPerformance },
  ];

  const results: SyncResult[] = [];
  const supabase = getSupabaseAdmin();

  for (const { name, fetch } of providers) {
    try {
      const data = await fetch();
      if (!data) {
        results.push({ provider: name, status: "partial", recordsSynced: 0, error: "Not configured or no data" });
        continue;
      }

      if (supabase) {
        await supabase.from("performance_snapshots").insert({
          strategy_id: data.strategyId,
          provider: name,
          metrics: data.metrics,
          equity_curve: data.equityCurve,
          monthly_returns: data.monthlyReturns,
          drawdown_series: data.drawdownSeries,
        });

        await supabase.from("performance_sync_log").insert({
          provider: name,
          status: "success",
          records_synced: 1,
        });
      }

      results.push({ provider: name, status: "success", recordsSynced: 1 });
    } catch (err) {
      const error = err instanceof Error ? err.message : "Unknown error";
      if (supabase) {
        await supabase.from("performance_sync_log").insert({
          provider: name,
          status: "error",
          records_synced: 0,
          error_message: error,
        });
      }
      results.push({ provider: name, status: "error", recordsSynced: 0, error });
    }
  }

  return results;
}
