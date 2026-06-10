"use client";

import { useState } from "react";
import { Link2, Copy, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CapitalHeader } from "./capital-header";

export function ReferralProgram() {
  const [code] = useState("PRYSM-REF-2026");
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://prysmalgo.com/apply?ref=${code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Referral Program"
          title="Investor Referral Program"
          description="Refer qualified investors and earn rewards. Track referrals, conversions, and rewards through your dashboard."
          breadcrumb={{ name: "Referrals", path: "/referrals" }}
        />

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Referrals Sent", value: "3", icon: Users },
            { label: "Converted", value: "1", icon: Link2 },
            { label: "Rewards Earned", value: "$2,500", icon: DollarSign },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-primary/30 p-5 text-center">
              <m.icon className="h-5 w-5 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-primary/30 p-6 mb-8">
          <h3 className="font-semibold text-foreground mb-4">Your Referral Link</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input readOnly value={`https://prysmalgo.com/apply?ref=${code}`} className="flex-1" />
            <Button onClick={copyLink} className="gap-2 shrink-0">
              <Copy className="h-4 w-4" /> {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
          <p className="text-xs text-muted mt-3">Code: <span className="text-accent font-mono">{code}</span></p>
        </div>

        <div className="rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Referral History</h3>
          <div className="space-y-3">
            {[
              { name: "Referral — Dubai", status: "Converted", reward: "$2,500" },
              { name: "Referral — Mumbai", status: "Qualified", reward: "Pending" },
              { name: "Referral — Singapore", status: "Pending", reward: "—" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between border-b border-border/50 pb-3 text-sm">
                <span className="text-foreground">{r.name}</span>
                <span className="text-muted">{r.status}</span>
                <span className="text-success font-medium">{r.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
