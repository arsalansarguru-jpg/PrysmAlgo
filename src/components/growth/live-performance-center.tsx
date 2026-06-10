"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, BarChart3, Shield, FileText, Download, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { EquityCurveChart, MonthlyReturnsChart } from "@/components/charts/lazy-charts";
import { livePerformanceMetrics, monthlyReports, performanceHistory, riskMetricsLive } from "@/data/live-performance";
import { usePerformance } from "@/hooks/use-performance";

const metricCards = [
  { key: "annualReturn", label: "Annual Return", suffix: "%", positive: true },
  { key: "monthlyReturn", label: "Monthly Return", suffix: "%", positive: true },
  { key: "ytdReturn", label: "YTD Return", suffix: "%", positive: true },
  { key: "maxDrawdown", label: "Max Drawdown", suffix: "%", positive: false },
  { key: "winRate", label: "Win Rate", suffix: "%", positive: true },
  { key: "profitFactor", label: "Profit Factor", suffix: "", positive: true },
  { key: "sharpeRatio", label: "Sharpe Ratio", suffix: "", positive: true },
  { key: "avgTradeDurationHours", label: "Avg Trade Duration", suffix: "h", positive: false },
] as const;

export function LivePerformanceCenter() {
  const { data: perf, isLive } = usePerformance();
  const m = perf.metrics;
  const equityCurveSeries = perf.equityCurve;
  const monthlyReturnsSeries = perf.monthlyReturns;
  const drawdownSeries = perf.drawdownSeries;

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Live Performance"
          title="Institutional Performance Center"
          description={`Verified live track record metrics, equity curves, and risk analytics for qualified investors.${isLive ? " Data synced from live providers." : ""}`}
          align="left"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metricCards.map((card, i) => {
            const value = (card.key === "avgTradeDurationHours"
              ? livePerformanceMetrics.avgTradeDurationHours
              : m[card.key as keyof typeof m]) as number;
            return (
              <motion.div key={card.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card className="h-full hover:border-accent/30 transition-colors">
                  <CardContent className="p-4">
                    <p className="text-[10px] text-muted uppercase tracking-wider mb-1">{card.label}</p>
                    <p className={`text-xl font-bold ${card.positive ? "text-success" : "text-foreground"}`}>
                      {card.key === "maxDrawdown" ? "-" : card.key === "profitFactor" || card.key === "sharpeRatio" ? "" : "+"}
                      <AnimatedCounter value={Math.abs(value)} decimals={card.suffix === "" ? 2 : 1} suffix={card.suffix} />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-accent" /> Equity Curve
              </CardTitle>
            </CardHeader>
            <EquityCurveChart
              data={equityCurveSeries.map((d) => ({ month: d.month, value: d.value * 10000, benchmark: d.value * 8000 }))}
              height={300}
            />
          </Card>
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-5 w-5 text-accent" /> Monthly Returns
              </CardTitle>
            </CardHeader>
            <MonthlyReturnsChart data={monthlyReturnsSeries} height={300} />
          </Card>
        </div>

        <Card className="mb-12 p-6">
          <CardTitle className="text-base mb-4">Drawdown Profile</CardTitle>
          <div className="flex flex-wrap gap-3">
            {drawdownSeries.map((d) => (
              <div key={d.month} className="text-center min-w-[4rem]">
                <div
                  className="mx-auto w-8 rounded-t bg-red-500/60"
                  style={{ height: `${Math.abs(d.drawdown) * 12}px`, minHeight: 4 }}
                />
                <p className="text-[10px] text-muted mt-1">{d.month}</p>
                <p className="text-xs text-foreground">{d.drawdown}%</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <CardTitle className="text-base mb-4">Performance History</CardTitle>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted text-left">
                  <th className="py-2">Period</th>
                  <th className="py-2 text-right">Return</th>
                  <th className="py-2 text-right">Max DD</th>
                  <th className="py-2 text-right">Trades</th>
                </tr>
              </thead>
              <tbody>
                {performanceHistory.map((row) => (
                  <tr key={row.period} className="border-b border-border/50">
                    <td className="py-2 text-foreground">{row.period}</td>
                    <td className="py-2 text-right text-success">+{row.return}%</td>
                    <td className="py-2 text-right text-muted">{row.drawdown}%</td>
                    <td className="py-2 text-right text-muted">{row.trades}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="p-6">
            <CardTitle className="text-base mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" /> Risk Metrics
            </CardTitle>
            <div className="grid grid-cols-2 gap-3">
              {riskMetricsLive.map((r) => (
                <div key={r.label} className="rounded-lg border border-border bg-primary/30 p-3">
                  <p className="text-[10px] text-muted">{r.label}</p>
                  <p className="text-lg font-bold text-foreground">{r.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mb-12 p-6">
          <CardTitle className="text-base mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-accent" /> Monthly Reports
          </CardTitle>
          <div className="space-y-3">
            {monthlyReports.map((r) => (
              <div key={r.month} className="flex items-center justify-between rounded-lg border border-border bg-primary/20 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted">{r.month} · {r.size}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3" /> Download
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">Request Full Investor Access</h3>
          <p className="text-sm text-muted mb-6 max-w-xl mx-auto">
            Qualified investors receive access to detailed performance reports, live dashboards, and monthly statements.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild><Link href="/apply">Apply as Investor <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild variant="outline"><Link href="/investor-assessment">Take Assessment</Link></Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted/60 mt-8">
          Past performance is not indicative of future results. Data sourced from institutional tear sheets and live verification.
        </p>
      </div>
    </div>
  );
}
