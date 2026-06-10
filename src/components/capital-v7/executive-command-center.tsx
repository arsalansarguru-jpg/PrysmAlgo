"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, Users, TrendingUp, Target, Globe, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapitalHeader } from "./capital-header";
import type { ExecutiveDashboard } from "@/types/capital-v7";

export function ExecutiveCommandCenter() {
  const [data, setData] = useState<ExecutiveDashboard | null>(null);

  useEffect(() => {
    fetch("/api/v1/executive").then((r) => r.json()).then((d) => setData(d.dashboard));
  }, []);

  if (!data) return <div className="pt-28 text-center text-muted">Loading executive dashboard...</div>;

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <CapitalHeader
            label="Executive"
            title="CEO Command Center"
            description="AUM, growth, investor count, retention, capital pipeline, revenue, partner performance, and forecasts."
            breadcrumb={{ name: "Executive", path: "/executive" }}
          />
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button variant="outline" size="sm" asChild><Link href="/capital-raising">Pipeline</Link></Button>
            <Button variant="outline" size="sm" asChild><Link href="/admin/operations">Operations</Link></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "AUM", value: `$${(data.aum / 1e6).toFixed(1)}M`, icon: DollarSign },
            { label: "Monthly Growth", value: `+${data.monthlyGrowth}%`, icon: TrendingUp },
            { label: "Investors", value: data.investorCount, icon: Users },
            { label: "Retention", value: `${data.retentionRate}%`, icon: Target },
            { label: "Pipeline Value", value: `$${(data.pipelineValue / 1e6).toFixed(1)}M`, icon: BarChart3 },
            { label: "Capital Funded", value: `$${(data.capitalFunded / 1e6).toFixed(1)}M`, icon: DollarSign },
            { label: "Conversion", value: `${data.conversionRate}%`, icon: TrendingUp },
            { label: "Revenue", value: `$${(data.revenue / 1000).toFixed(0)}K`, icon: DollarSign },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-primary/30 p-5">
              <m.icon className="h-4 w-4 text-accent mb-2" />
              <p className="text-[10px] text-muted uppercase">{m.label}</p>
              <p className="text-xl font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Forecasts</h3>
            <div className="space-y-3">
              {data.forecasts.map((f) => (
                <div key={f.label} className="flex justify-between text-sm border-b border-border/50 pb-2">
                  <span className="text-muted capitalize">{f.label}</span>
                  <span className="font-medium text-foreground">
                    {f.value > 1000 ? `$${(f.value / 1000).toFixed(0)}K` : `${f.value}%`} · {f.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Globe className="h-4 w-4 text-accent" /> Country Performance</h3>
            <div className="space-y-3">
              {data.countryPerformance.map((c) => (
                <div key={c.country} className="flex justify-between text-sm">
                  <span className="text-muted">{c.country} ({c.investors})</span>
                  <span className="font-medium text-foreground">${(c.aum / 1e6).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
