"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { useChartColors } from "@/lib/chart-theme";

interface BarChartProps {
  data: { month: string; return: number }[];
  height?: number;
}

export function MonthlyReturnsChart({ data, height = 300 }: BarChartProps) {
  const colors = useChartColors();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis
          dataKey="month"
          stroke={colors.muted}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: string) => v.slice(0, 3)}
        />
        <YAxis
          stroke={colors.muted}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            color: colors.foreground,
          }}
          formatter={(value: number) => [`${value}%`, "Return"]}
        />
        <Bar dataKey="return" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.return >= 0 ? colors.purpleLight : "#DC2626"}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
