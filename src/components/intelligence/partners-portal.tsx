"use client";

import { useState } from "react";
import { Users, DollarSign, TrendingUp, Link2 } from "lucide-react";
import { IntelligenceHeader } from "./intelligence-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEMO_STATS = {
  referrals: 24,
  conversions: 8,
  commission: 12400,
  pendingPayout: 3200,
  tier: "Gold Partner",
};

export function PartnersPortal() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return (
      <div className="pt-28 pb-24">
        <div className="mx-auto max-w-md px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Partner Portal</h1>
          <p className="text-muted mb-8">Refer qualified investors and earn commissions.</p>
          <Button onClick={() => setLoggedIn(true)}>Access Partner Dashboard (Demo)</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Partners"
          title="Referral Dashboard"
          description="Track referrals, commissions, conversions, and affiliate performance."
          breadcrumb={{ name: "Partners", path: "/partners" }}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Referrals", value: DEMO_STATS.referrals, icon: Users },
            { label: "Conversions", value: DEMO_STATS.conversions, icon: TrendingUp },
            { label: "Total Commission", value: `$${DEMO_STATS.commission.toLocaleString()}`, icon: DollarSign },
            { label: "Pending Payout", value: `$${DEMO_STATS.pendingPayout.toLocaleString()}`, icon: DollarSign },
          ].map((m) => (
            <Card key={m.label}><CardContent className="p-4"><m.icon className="h-4 w-4 text-accent mb-2" /><p className="text-[10px] text-muted uppercase">{m.label}</p><p className="text-xl font-bold text-foreground">{m.value}</p></CardContent></Card>
          ))}
        </div>
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Link2 className="h-4 w-4 text-accent" /> Your Referral Link</h3>
          <div className="flex gap-2">
            <Input readOnly value="https://prysmalgo.com/?ref=PARTNER-DEMO" className="font-mono text-sm" />
            <Button variant="outline">Copy</Button>
          </div>
          <p className="text-xs text-muted mt-3">Tier: {DEMO_STATS.tier} · Commission: 15% on qualified conversions</p>
        </Card>
      </div>
    </div>
  );
}
