import type { PerformanceMetrics } from "@/types/production";

const MYFXBOOK_SESSION = process.env.MYFXBOOK_SESSION;
const MYFXBOOK_ACCOUNT_ID = process.env.MYFXBOOK_ACCOUNT_ID;

export function isMyfxbookConfigured(): boolean {
  return Boolean(MYFXBOOK_SESSION && MYFXBOOK_ACCOUNT_ID);
}

interface MyfxbookAccount {
  gain?: number;
  monthly?: number;
  drawdown?: number;
  profitablePercent?: number;
  profitFactor?: number;
  sharpeRatio?: number;
  days?: number;
}

export async function fetchMyfxbookPerformance(strategyId = "prysm-blue"): Promise<{
  strategyId: string;
  metrics: PerformanceMetrics;
  equityCurve: { month: string; value: number }[];
  monthlyReturns: { month: string; return: number }[];
  drawdownSeries: { month: string; drawdown: number }[];
} | null> {
  if (!isMyfxbookConfigured()) return null;

  try {
    const url = `https://www.myfxbook.com/api/get-account-info.json?session=${MYFXBOOK_SESSION}&id=${MYFXBOOK_ACCOUNT_ID}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) return null;

    const json = await res.json();
    if (!json.error && json.account) {
      const data = json.account as MyfxbookAccount;
      const syncedAt = new Date().toISOString();

      const metrics: PerformanceMetrics = {
        annualReturn: Number(data.gain) || 0,
        monthlyReturn: Number(data.monthly) || 0,
        ytdReturn: Number(data.gain) || 0,
        maxDrawdown: Number(data.drawdown) || 0,
        winRate: Number(data.profitablePercent) || 0,
        profitFactor: Number(data.profitFactor) || 0,
        sharpeRatio: Number(data.sharpeRatio) || 0,
        totalReturn: Number(data.gain) || 0,
        liveDays: Number(data.days) || 0,
        source: "live",
        syncedAt,
        provider: "myfxbook",
      };

      return {
        strategyId,
        metrics,
        equityCurve: [],
        monthlyReturns: [],
        drawdownSeries: [],
      };
    }
    return null;
  } catch {
    return null;
  }
}
