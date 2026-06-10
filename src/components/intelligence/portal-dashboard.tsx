"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, FileText, Download, DollarSign, PieChart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EquityCurveChart } from "@/components/charts/lazy-charts";
import { usePerformance } from "@/hooks/use-performance";
import { createClient, isAuthEnabled } from "@/lib/supabase/client";
import { DEMO_PORTFOLIO } from "@/data/intelligence/portal-demo";
import { HealthScoreWidget } from "@/components/capital-v7/health-score-widget";

export function PortalDashboard() {
  const router = useRouter();
  const { data: perf, isLive } = usePerformance();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const m = perf.metrics;
  const p = {
    totalValue: DEMO_PORTFOLIO.totalValue,
    ytdReturn: m.ytdReturn,
    monthlyReturn: m.monthlyReturn,
    maxDrawdown: m.maxDrawdown,
    equityCurve: perf.equityCurve.length ? perf.equityCurve : DEMO_PORTFOLIO.equityCurve,
    allocations: DEMO_PORTFOLIO.allocation.map((a) => ({ strategy: a.strategy, percent: a.pct })),
    profitShareHistory: DEMO_PORTFOLIO.profitShare,
    withdrawals: DEMO_PORTFOLIO.withdrawals,
  };

  useEffect(() => {
    if (!isAuthEnabled()) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth/login?redirect=/portal");
        return;
      }
      setEmail(user.email ?? null);
      setLoading(false);
    });
  }, [router]);

  const signOut = async () => {
    if (isAuthEnabled()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="pt-28 pb-24 text-center text-muted">Loading portal...</div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Portfolio Overview</h1>
            <p className="text-sm text-muted">
              {email ? `Welcome back, ${email}` : "Investor Portal"}
              {isLive && <span className="ml-2 text-success">· Live data</span>}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 sm:justify-end">
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link href="/portal/documents"><FileText className="h-4 w-4 shrink-0" /> Documents</Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link href="/portal/kyc"><Shield className="h-4 w-4 shrink-0" /> KYC</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Portfolio Value", value: `$${(p.totalValue / 1e6).toFixed(2)}M`, icon: DollarSign },
            { label: "YTD Return", value: `+${p.ytdReturn}%`, icon: TrendingUp },
            { label: "Monthly Return", value: `+${p.monthlyReturn}%`, icon: TrendingUp },
            { label: "Max Drawdown", value: `${p.maxDrawdown}%`, icon: PieChart },
          ].map((item) => (
            <Card key={item.label}><CardContent className="p-4"><item.icon className="h-4 w-4 text-accent mb-2" /><p className="text-[10px] text-muted uppercase">{item.label}</p><p className="text-xl font-bold text-foreground">{item.value}</p></CardContent></Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-4">Equity Curve</h2>
              <EquityCurveChart data={p.equityCurve.map((e) => ({ month: e.month, value: e.value }))} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-4">Capital Allocation</h2>
              <div className="space-y-3">
                {p.allocations.map((a) => (
                  <div key={a.strategy}>
                    <div className="flex justify-between text-sm mb-1"><span>{a.strategy}</span><span>{a.percent}%</span></div>
                    <div className="h-2 rounded-full bg-border"><div className="h-2 rounded-full bg-accent" style={{ width: `${a.percent}%` }} /></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <HealthScoreWidget email={email ?? undefined} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-4">Profit Share History</h2>
              <div className="space-y-2">
                {p.profitShareHistory.map((h) => (
                  <div key={h.period} className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted">{h.period}</span>
                    <span className="text-success font-medium">+${h.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-foreground mb-4">Withdrawals</h2>
              <div className="space-y-2">
                {p.withdrawals.map((w) => (
                  <div key={w.date} className="flex justify-between text-sm border-b border-border pb-2">
                    <span className="text-muted">{w.date}</span>
                    <span className="font-medium">${w.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/portal/documents"><Download className="h-4 w-4" /> Download Statements</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
