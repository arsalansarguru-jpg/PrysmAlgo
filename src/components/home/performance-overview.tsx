"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, Percent, Scale, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { EquityCurveChart } from "@/components/charts/lazy-charts";
import { performanceOverview, equityCurveData } from "@/data/performance";

const metrics = [
  { key: "totalReturn", label: "Total Return", icon: TrendingUp, suffix: "%", positive: true },
  { key: "monthlyReturn", label: "Monthly Average", icon: Percent, suffix: "%", positive: true },
  { key: "maxDrawdown", label: "Maximum Drawdown", icon: TrendingDown, suffix: "%", positive: false },
  { key: "winRate", label: "Win Rate", icon: Target, suffix: "%", positive: true },
  { key: "riskRewardRatio", label: "Risk Reward Ratio", icon: Scale, suffix: "", positive: true },
  { key: "profitFactor", label: "Profit Factor", icon: BarChart, suffix: "", positive: true },
] as const;

export function PerformanceOverview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Performance"
          title="Institutional Performance Metrics"
          description="Prysm Blue live track record — 844 days of verified EUR/USD execution with institutional risk controls."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const value = performanceOverview[metric.key];
            return (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="h-full hover:border-accent/30 transition-colors">
                  <CardContent className="p-5">
                    <Icon className="h-5 w-5 text-accent mb-3" />
                    <p className="text-xs text-muted uppercase tracking-wider">{metric.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${metric.positive ? "text-success" : "text-foreground"}`}>
                      {metric.key === "maxDrawdown" ? "" : metric.key === "riskRewardRatio" || metric.key === "profitFactor" ? "" : "+"}
                      <AnimatedCounter
                        value={Math.abs(value)}
                        decimals={metric.key === "riskRewardRatio" || metric.key === "profitFactor" ? 2 : 1}
                        suffix={metric.suffix}
                      />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Equity Curve</h3>
                <p className="text-sm text-muted">12-month portfolio performance vs benchmark</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-6 rounded bg-gradient-brand" /> Prysm Blue
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-6 border-t-2 border-dashed border-muted" /> Benchmark
                </span>
              </div>
            </div>
            <EquityCurveChart data={equityCurveData} height={350} />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
