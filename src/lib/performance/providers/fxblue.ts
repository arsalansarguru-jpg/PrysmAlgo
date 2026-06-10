import type { PerformanceMetrics } from "@/types/production";

const FXBLUE_API_URL = process.env.FXBLUE_API_URL;
const FXBLUE_ACCOUNT_ID = process.env.FXBLUE_ACCOUNT_ID;
const FXBLUE_API_TOKEN = process.env.FXBLUE_API_TOKEN;

export function isFxBlueConfigured(): boolean {
  return Boolean(FXBLUE_API_URL && FXBLUE_ACCOUNT_ID);
}

interface FxBlueRawStats {
  gain?: number;
  monthly?: number;
  drawdown?: number;
  winRate?: number;
  profitFactor?: number;
  sharpe?: number;
  days?: number;
  equity?: { date: string; value: number }[];
  monthlyReturns?: { month: string; return: number }[];
}

export async function fetchFxBluePerformance(strategyId = "prysm-blue"): Promise<{
  strategyId: string;
  metrics: PerformanceMetrics;
  equityCurve: { month: string; value: number }[];
  monthlyReturns: { month: string; return: number }[];
  drawdownSeries: { month: string; drawdown: number }[];
} | null> {
  if (!isFxBlueConfigured()) return null;

  try {
    const url = `${FXBLUE_API_URL}/accounts/${FXBLUE_ACCOUNT_ID}/stats`;
    const res = await fetch(url, {
      headers: FXBLUE_API_TOKEN ? { Authorization: `Bearer ${FXBLUE_API_TOKEN}` } : {},
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as FxBlueRawStats;
    const syncedAt = new Date().toISOString();

    const metrics: PerformanceMetrics = {
      annualReturn: data.gain ?? 0,
      monthlyReturn: data.monthly ?? 0,
      ytdReturn: data.gain ?? 0,
      maxDrawdown: data.drawdown ?? 0,
      winRate: data.winRate ?? 0,
      profitFactor: data.profitFactor ?? 0,
      sharpeRatio: data.sharpe ?? 0,
      totalReturn: data.gain ?? 0,
      liveDays: data.days ?? 0,
      source: "live",
      syncedAt,
      provider: "fxblue",
    };

    const equityCurve = (data.equity ?? []).map((p) => ({
      month: p.date,
      value: p.value,
    }));

    const monthlyReturns = (data.monthlyReturns ?? []).map((p) => ({
      month: p.month,
      return: p.return,
    }));

    const drawdownSeries = equityCurve.map((p, i) => ({
      month: p.month,
      drawdown: i === 0 ? 0 : Math.min(0, p.value - Math.max(...equityCurve.slice(0, i + 1).map((e) => e.value))),
    }));

    return { strategyId, metrics, equityCurve, monthlyReturns, drawdownSeries };
  } catch {
    return null;
  }
}
