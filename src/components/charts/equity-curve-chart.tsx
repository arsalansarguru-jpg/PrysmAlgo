"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { useChartColors } from "@/lib/chart-theme";

interface EquityCurveChartProps {
  data: { month: string; value: number; benchmark?: number }[];
  height?: number;
}

export function EquityCurveChart({ data, height = 300 }: EquityCurveChartProps) {
  const colors = useChartColors();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.purpleLight} stopOpacity={0.35} />
            <stop offset="95%" stopColor={colors.purpleLight} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.muted} stopOpacity={0.15} />
            <stop offset="95%" stopColor={colors.muted} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis
          dataKey="month"
          stroke={colors.muted}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={colors.muted}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            color: colors.foreground,
          }}
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name === "value" ? "PrysmAlgo" : "Benchmark",
          ]}
        />
        {data[0]?.benchmark !== undefined && (
          <Area
            type="monotone"
            dataKey="benchmark"
            stroke={colors.muted}
            strokeWidth={1.5}
            fill="url(#benchmarkGradient)"
            strokeDasharray="4 4"
            connectNulls
            isAnimationActive={false}
          />
        )}
        <Area
          type="monotone"
          dataKey="value"
          stroke={colors.purpleLight}
          strokeWidth={2}
          fill="url(#equityGradient)"
          connectNulls
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
