"use client";

import { useEffect, useState } from "react";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import { CapitalHeader } from "./capital-header";
import { PIPELINE_STAGE_LABELS, type PipelineDeal, type PipelineStage } from "@/types/capital-v7";

export function CapitalPipelineHub() {
  const [deals, setDeals] = useState<PipelineDeal[]>([]);
  const [summary, setSummary] = useState({ committed: 0, funded: 0, expectedAum: 0, deals: 0 });

  useEffect(() => {
    fetch("/api/v1/capital-pipeline").then((r) => r.json()).then((d) => {
      setDeals(d.deals ?? []);
      if (d.summary) setSummary(d.summary);
    });
  }, []);

  const byStage = (stage: PipelineStage) => deals.filter((d) => d.stage === stage);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Capital Raising"
          title="Capital Raise Pipeline"
          description="Track prospects, qualified investors, due diligence, pending funding, and funded capital through to AUM growth."
          breadcrumb={{ name: "Pipeline", path: "/capital-raising" }}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Capital Committed", value: `$${(summary.committed / 1e6).toFixed(2)}M`, icon: DollarSign },
            { label: "Capital Funded", value: `$${(summary.funded / 1e6).toFixed(2)}M`, icon: TrendingUp },
            { label: "Expected AUM", value: `$${(summary.expectedAum / 1e6).toFixed(2)}M`, icon: TrendingUp },
            { label: "Active Deals", value: summary.deals, icon: Users },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-primary/30 p-5">
              <m.icon className="h-4 w-4 text-accent mb-2" />
              <p className="text-[10px] text-muted uppercase">{m.label}</p>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {(Object.keys(PIPELINE_STAGE_LABELS) as PipelineStage[]).map((stage) => (
            <div key={stage} className="rounded-xl border border-border bg-primary/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">{PIPELINE_STAGE_LABELS[stage]}</h3>
              <div className="space-y-2">
                {byStage(stage).map((d) => (
                  <div key={d.id} className="rounded-lg border border-border/50 bg-background/30 p-3">
                    <p className="text-sm font-medium text-foreground">{d.investorName}</p>
                    <p className="text-xs text-muted">{d.country} · ${(d.capitalCommitted / 1000).toFixed(0)}K committed</p>
                  </div>
                ))}
                {byStage(stage).length === 0 && <p className="text-xs text-muted">No deals</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
