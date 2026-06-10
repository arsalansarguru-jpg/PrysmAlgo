"use client";

import { Users, DollarSign, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapitalHeader } from "./capital-header";

const PARTNER_TYPES = [
  { type: "Introducing Brokers", count: 4, capital: "$1.2M" },
  { type: "Financial Advisors", count: 6, capital: "$800K" },
  { type: "Wealth Managers", count: 3, capital: "$600K" },
  { type: "Family Offices", count: 2, capital: "$500K" },
];

export function PartnerNetworkHub() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Partner Network"
          title="Partner Network"
          description="Introducing brokers, financial advisors, wealth managers, and family offices — dashboard, tracking, commission reporting, and marketing assets."
          breadcrumb={{ name: "Partner Network", path: "/partner-network" }}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Partners", value: "15", icon: Users },
            { label: "Capital Introduced", value: "$3.1M", icon: TrendingUp },
            { label: "Commissions Paid", value: "$48K", icon: DollarSign },
            { label: "Conversion Rate", value: "18%", icon: TrendingUp },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-primary/30 p-5">
              <m.icon className="h-4 w-4 text-accent mb-2" />
              <p className="text-[10px] text-muted uppercase">{m.label}</p>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {PARTNER_TYPES.map((p) => (
            <div key={p.type} className="rounded-xl border border-border bg-primary/30 p-5 flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground">{p.type}</p>
                <p className="text-sm text-muted">{p.count} partners · {p.capital} introduced</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Marketing Assets</h3>
          <div className="flex flex-wrap gap-3">
            {["Investor Presentation", "Tear Sheets", "One-Pager", "Email Templates"].map((a) => (
              <Button key={a} variant="outline" size="sm" className="gap-2">
                <Download className="h-3.5 w-3.5" /> {a}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
