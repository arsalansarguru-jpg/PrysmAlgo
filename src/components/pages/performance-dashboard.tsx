"use client";

import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Shield, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { StrategyCard } from "@/components/shared/strategy-card";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { EquityCurveChart, MonthlyReturnsChart } from "@/components/charts/lazy-charts";
import { PRYSM_STRATEGIES } from "@/data/strategies";
import { SITE_CONFIG } from "@/lib/constants";
import {
  performanceOverview,
  equityCurveData,
  monthlyReturns,
  riskMetrics,
  benchmarkComparison,
} from "@/data/performance";
import { formatPercent } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function PerformanceDashboard() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Performance"
          title="Live Strategy Performance"
          description="Prysm Blue, Gold, and Green — institutional algorithmic systems with verified tear sheets and transparent reporting."
          align="left"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mb-16">
          {PRYSM_STRATEGIES.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              className="h-full min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StrategyCard strategy={strategy} featured={strategy.id === "green"} />
            </motion.div>
          ))}
        </div>

        <Card className="mb-16 border-green-500/20 bg-green-500/5">
          <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-brand text-green-400">
                Prysm Green · Live Dashboard
              </span>
              <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">
                Real-Time US Equity Performance
              </h3>
              <p className="text-sm text-muted max-w-xl">
                Full equity curve, drawdown profile, daily returns distribution, monthly returns,
                and complete trade log — updated every session at{" "}
                <strong className="text-foreground">green.prysmalgo.com</strong>.
              </p>
            </div>
            <Button asChild>
              <a href={SITE_CONFIG.greenPerformance} target="_blank" rel="noopener noreferrer">
                Open Live Dashboard
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <SectionHeader
          label="Prysm Blue"
          title="Aggregate Analytics Overview"
          description="Illustrative portfolio analytics based on Prysm Blue live track record metrics."
          align="left"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {Object.entries(performanceOverview).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs text-muted uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    <AnimatedCounter
                      value={Math.abs(value)}
                      decimals={key.includes("Ratio") || key.includes("Factor") ? 2 : 1}
                      suffix={key.includes("Ratio") || key.includes("Factor") ? "" : "%"}
                      prefix={key === "maxDrawdown" ? "-" : key !== "riskRewardRatio" && key !== "profitFactor" ? "+" : ""}
                    />
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Equity Curve
              </CardTitle>
            </CardHeader>
            <EquityCurveChart data={equityCurveData} height={350} />
          </Card>

          <Card className="p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-accent" />
                Monthly Returns
              </CardTitle>
            </CardHeader>
            <MonthlyReturnsChart
              data={monthlyReturns.map((m) => ({ month: m.month, return: m.return }))}
              height={350}
            />
          </Card>
        </div>

        <Card className="mb-12 overflow-hidden">
          <CardHeader>
            <CardTitle>Monthly Returns Table</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted font-medium">Month</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Return</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Benchmark</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Alpha</th>
                </tr>
              </thead>
              <tbody>
                {monthlyReturns.map((row) => (
                  <tr key={row.month} className="border-b border-border/50 hover:bg-foreground/5">
                    <td className="py-3 px-4 text-foreground">{row.month}</td>
                    <td className="py-3 px-4 text-right text-success font-medium">
                      {formatPercent(row.return)}
                    </td>
                    <td className="py-3 px-4 text-right text-muted">
                      {formatPercent(row.benchmark)}
                    </td>
                    <td className="py-3 px-4 text-right text-accent font-medium">
                      {formatPercent(row.return - row.benchmark)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {riskMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Shield className="h-5 w-5 text-accent mb-3" />
                  <p className="text-xs text-muted uppercase tracking-wider">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                  <p className="text-xs text-muted mt-2">{metric.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Benchmark Comparison</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted font-medium">Strategy</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Return</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Monthly Avg</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Sharpe</th>
                  <th className="text-right py-3 px-4 text-muted font-medium">Max DD</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkComparison.map((row) => (
                  <tr
                    key={row.name}
                    className={`border-b border-border/50 hover:bg-foreground/5 ${
                      row.isPrysm ? "bg-accent/5" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{row.name}</td>
                    <td className="py-3 px-4 text-right text-success">
                      {row.isPrysm
                        ? `+${row.totalReturn}%`
                        : formatPercent(row.annualReturn!)}
                    </td>
                    <td className="py-3 px-4 text-right text-muted">
                      {row.isPrysm ? `+${row.monthlyReturn}%` : "—"}
                    </td>
                    <td className="py-3 px-4 text-right text-foreground">{row.sharpe}</td>
                    <td className="py-3 px-4 text-right text-muted">{row.maxDD}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-accent shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Investor Reporting Dashboard
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Qualified investors receive access to a comprehensive reporting portal featuring
                  real-time portfolio analytics, trade attribution, risk decomposition, and
                  downloadable monthly statements. Contact our team to request access.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {PRYSM_STRATEGIES.map((s) => (
                    <Button key={s.id} asChild variant="outline" size="sm">
                      <a href={s.tearSheetPath} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-3 w-3" />
                        {s.name} Tear Sheet
                      </a>
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted/60">
                  Past performance is not indicative of future results. Prysm Green live data at{" "}
                  <a
                    href={SITE_CONFIG.greenPerformance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    green.prysmalgo.com
                  </a>
                  . Download institutional tear sheets for Blue, Gold, and Green above.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
