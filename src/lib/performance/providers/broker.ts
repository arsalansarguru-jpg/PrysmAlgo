import type { PerformanceMetrics } from "@/types/production";

const BROKER_API_URL = process.env.BROKER_API_URL;
const BROKER_API_KEY = process.env.BROKER_API_KEY;
const BROKER_ACCOUNT_ID = process.env.BROKER_ACCOUNT_ID;

export function isBrokerConfigured(): boolean {
  return Boolean(BROKER_API_URL && BROKER_API_KEY);
}

interface BrokerPerformanceResponse {
  metrics?: Partial<PerformanceMetrics>;
  equityCurve?: { month: string; value: number }[];
  monthlyReturns?: { month: string; return: number }[];
  drawdownSeries?: { month: string; drawdown: number }[];
}

export async function fetchBrokerPerformance(strategyId = "prysm-blue"): Promise<{
  strategyId: string;
  metrics: PerformanceMetrics;
  equityCurve: { month: string; value: number }[];
  monthlyReturns: { month: string; return: number }[];
  drawdownSeries: { month: string; drawdown: number }[];
} | null> {
  if (!isBrokerConfigured()) return null;

  try {
    const url = `${BROKER_API_URL}/accounts/${BROKER_ACCOUNT_ID ?? "default"}/performance`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BROKER_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as BrokerPerformanceResponse;
    const m = data.metrics ?? {};
    const syncedAt = new Date().toISOString();

    const metrics: PerformanceMetrics = {
      annualReturn: m.annualReturn ?? 0,
      monthlyReturn: m.monthlyReturn ?? 0,
      ytdReturn: m.ytdReturn ?? 0,
      maxDrawdown: m.maxDrawdown ?? 0,
      winRate: m.winRate ?? 0,
      profitFactor: m.profitFactor ?? 0,
      sharpeRatio: m.sharpeRatio ?? 0,
      totalReturn: m.totalReturn ?? 0,
      liveDays: m.liveDays ?? 0,
      source: "live",
      syncedAt,
      provider: "broker",
    };

    return {
      strategyId,
      metrics,
      equityCurve: data.equityCurve ?? [],
      monthlyReturns: data.monthlyReturns ?? [],
      drawdownSeries: data.drawdownSeries ?? [],
    };
  } catch {
    return null;
  }
}
