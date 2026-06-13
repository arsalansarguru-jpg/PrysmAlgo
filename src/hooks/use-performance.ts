"use client";

import { useEffect, useState } from "react";
import type { PerformanceSnapshot } from "@/types/production";
import {
  livePerformanceMetrics,
  equityCurveSeries,
  monthlyReturnsSeries,
  drawdownSeries,
} from "@/data/live-performance";

const FALLBACK: PerformanceSnapshot = {
  strategyId: "prysm-blue",
  metrics: { ...livePerformanceMetrics, source: "static" },
  equityCurve: equityCurveSeries,
  monthlyReturns: monthlyReturnsSeries,
  drawdownSeries: drawdownSeries,
};

export function usePerformance(initialData?: PerformanceSnapshot) {
  const [data, setData] = useState<PerformanceSnapshot>(initialData ?? FALLBACK);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    fetch("/api/performance")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.metrics) {
          setData({
            strategyId: json.strategyId,
            metrics: json.metrics,
            equityCurve: json.equityCurve ?? FALLBACK.equityCurve,
            monthlyReturns: json.monthlyReturns ?? FALLBACK.monthlyReturns,
            drawdownSeries: json.drawdownSeries ?? FALLBACK.drawdownSeries,
          });
        }
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, isLive: data.metrics.source === "live" };
}
