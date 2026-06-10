"use client";

import { useTheme } from "@/lib/theme-provider";

export function useChartColors() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return {
    purple: "#7B2CBF",
    purpleLight: isDark ? "#9D4EDD" : "#7B2CBF",
    pink: isDark ? "#E040FB" : "#9333EA",
    grid: isDark ? "rgba(157, 78, 221, 0.06)" : "rgba(123, 44, 191, 0.14)",
    muted: isDark ? "#9B8FB0" : "#5C4F6E",
    card: isDark ? "#0A0A0F" : "#FFFFFF",
    foreground: isDark ? "#FFFFFF" : "#1A1028",
    border: isDark ? "rgba(157, 78, 221, 0.15)" : "rgba(123, 44, 191, 0.2)",
  };
}
