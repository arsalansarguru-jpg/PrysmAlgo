"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

function ChartSkeleton({ height = 300 }: { height?: number }) {
  return <Skeleton className="w-full rounded-xl" style={{ height }} />;
}

export const EquityCurveChart = dynamic(
  () => import("./equity-curve-chart").then((m) => m.EquityCurveChart),
  { loading: () => <ChartSkeleton height={320} />, ssr: false }
);

export const MonthlyReturnsChart = dynamic(
  () => import("./bar-chart").then((m) => m.MonthlyReturnsChart),
  { loading: () => <ChartSkeleton height={280} />, ssr: false }
);
