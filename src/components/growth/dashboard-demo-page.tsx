"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { EquityCurveChart } from "@/components/charts/lazy-charts";
import {
  demoPortfolio,
  openTrades,
  closedTrades,
  demoRiskMetrics,
  demoEquityCurve,
} from "@/data/dashboard-demo";
import { formatCurrency } from "@/lib/utils";

export function DashboardDemoPage() {
  const p = demoPortfolio;
  return (
    <div className="pt-28 pb-24 bg-primary/10 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Dashboard Demo", path: "/dashboard-demo" }]} />
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Investor Dashboard</h1>
            <p className="text-sm text-muted">Demo preview · Sample data</p>
          </div>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">DEMO MODE</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Portfolio Value" value={formatCurrency(p.totalValue)} />
          <StatCard label="Daily P&L" value={`+${formatCurrency(p.dailyPnl)}`} positive />
          <StatCard label="Monthly Return" value={`+${p.monthlyReturn}%`} positive />
          <StatCard label="YTD Return" value={`+${p.ytdReturn}%`} positive />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6">
            <CardTitle className="text-base mb-4">Equity Curve</CardTitle>
            <EquityCurveChart
              data={demoEquityCurve.map((d) => ({ month: d.month, value: d.value, benchmark: d.value * 0.85 }))}
              height={280}
            />
          </Card>
          <Card className="p-6">
            <CardTitle className="text-base mb-4">Allocation</CardTitle>
            {p.allocation.map((a) => (
              <div key={a.name} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted">{a.name}</span>
                  <span className="text-foreground font-medium">{a.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${a.value}%`, backgroundColor: a.color }} />
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="text-base">Open Trades</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-muted text-left border-b border-border"><th className="py-2">Pair</th><th>Dir</th><th className="text-right">P&L</th></tr></thead>
                <tbody>
                  {openTrades.map((t) => (
                    <tr key={t.pair + t.entry} className="border-b border-border/50">
                      <td className="py-2 text-foreground">{t.pair}</td>
                      <td className="text-muted">{t.direction}</td>
                      <td className="text-right text-success">{t.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Closed Trades</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="text-muted text-left border-b border-border"><th className="py-2">Pair</th><th>Date</th><th className="text-right">P&L</th></tr></thead>
                <tbody>
                  {closedTrades.map((t) => (
                    <tr key={t.pair + t.date} className="border-b border-border/50">
                      <td className="py-2 text-foreground">{t.pair}</td>
                      <td className="text-muted">{t.date}</td>
                      <td className={`text-right ${t.pnl.startsWith("+") ? "text-success" : "text-red-400"}`}>{t.pnl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6">
          <CardTitle className="text-base mb-4">Risk Metrics</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {demoRiskMetrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-border bg-primary/30 p-3 text-center">
                <p className="text-[10px] text-muted">{m.label}</p>
                <p className="text-lg font-bold text-foreground">{m.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-[10px] text-muted uppercase tracking-wider">{label}</p>
        <p className={`text-xl font-bold mt-1 ${positive ? "text-success" : "text-foreground"}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
