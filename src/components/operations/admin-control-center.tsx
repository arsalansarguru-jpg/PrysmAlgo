"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Users, FileText, Shield, TrendingUp, BarChart3, Kanban,
  DollarSign, Globe, LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AnalyticsCommandCenter } from "@/types/production";
import type { OnboardingWorkflow } from "@/types/production";
import type { KycSubmission } from "@/types/production";
import { ONBOARDING_STAGES } from "@/types/production";

function MetricCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border border-border bg-primary/30 p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
        <Icon className="h-4 w-4 text-accent" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

export function AdminControlCenter() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsCommandCenter | null>(null);
  const [workflows, setWorkflows] = useState<OnboardingWorkflow[]>([]);
  const [kycList, setKycList] = useState<KycSubmission[]>([]);
  const [tab, setTab] = useState<"overview" | "onboarding" | "kyc" | "performance">("overview");

  const headers = useCallback(() => ({ "x-admin-key": adminKey }), [adminKey]);

  const fetchAll = useCallback(async () => {
    const [aRes, oRes, kRes] = await Promise.all([
      fetch("/api/admin/analytics", { headers: headers() }),
      fetch("/api/onboarding", { headers: headers() }),
      fetch("/api/admin/kyc", { headers: headers() }),
    ]);
    if (aRes.ok) setAnalytics((await aRes.json()).analytics);
    if (oRes.ok) setWorkflows((await oRes.json()).workflows ?? []);
    if (kRes.ok) setKycList((await kRes.json()).submissions ?? []);
    if (aRes.ok) setAuthenticated(true);
  }, [headers]);

  useEffect(() => {
    if (authenticated) fetchAll();
  }, [authenticated, fetchAll]);

  const advanceStage = async (workflowId: string, stage: string) => {
    await fetch("/api/admin/onboarding", {
      method: "PATCH",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ workflowId, stage }),
    });
    fetchAll();
  };

  const reviewKyc = async (submissionId: string, status: "approved" | "rejected") => {
    await fetch("/api/admin/kyc", {
      method: "PATCH",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId, status }),
    });
    fetchAll();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border border-border p-6">
          <h1 className="text-xl font-bold text-foreground mb-2">Operations Control Center</h1>
          <Input type="password" placeholder="Admin API Key" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} className="mb-4" />
          <Button onClick={fetchAll} className="w-full">Enter</Button>
          {process.env.NODE_ENV === "development" && (
            <Button variant="ghost" onClick={() => { setAuthenticated(true); }} className="w-full mt-2 text-xs">Dev: Skip Auth</Button>
          )}
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "onboarding" as const, label: "Onboarding", icon: Kanban },
    { id: "kyc" as const, label: "KYC", icon: Shield },
    { id: "performance" as const, label: "Performance", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">Operations Control Center</h1>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button variant="outline" size="sm" asChild><Link href="/admin/leads">CRM Leads</Link></Button>
            <Button variant="outline" size="sm" asChild><Link href="/admin/pipeline">Pipeline</Link></Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {tabs.map((t) => (
            <Button key={t.id} variant={tab === t.id ? "default" : "outline"} size="sm" onClick={() => setTab(t.id)} className="gap-2">
              <t.icon className="h-4 w-4 shrink-0" />
              {t.label}
            </Button>
          ))}
        </div>

        {tab === "overview" && analytics && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard label="Leads" value={analytics.leads} icon={Users} />
              <MetricCard label="Applications" value={analytics.applications} icon={FileText} />
              <MetricCard label="Calls Booked" value={analytics.calls} icon={BarChart3} />
              <MetricCard label="Investors" value={analytics.investors} icon={Users} />
              <MetricCard label="Conversion Rate" value={`${analytics.conversionRate}%`} icon={TrendingUp} />
              <MetricCard label="Partner Revenue" value={`$${analytics.partnerRevenue.toLocaleString()}`} icon={DollarSign} />
            </div>
            <h2 className="text-lg font-semibold mb-4">Country Breakdown</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {analytics.countryBreakdown.map((c) => (
                <div key={c.country} className="rounded-lg border border-border p-3 flex justify-between">
                  <span className="flex items-center gap-2 text-sm"><Globe className="h-3 w-3" />{c.country}</span>
                  <span className="font-bold">{c.count}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "onboarding" && (
          <div className="space-y-3">
            {workflows.length === 0 ? (
              <p className="text-muted">No onboarding workflows yet.</p>
            ) : workflows.map((w) => (
              <div key={w.id} className="rounded-xl border border-border p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{w.email}</p>
                  <p className="text-xs text-muted">Stage: {w.currentStage.replace(/_/g, " ")}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {ONBOARDING_STAGES.filter((s) => s !== w.currentStage).slice(0, 3).map((s) => (
                    <Button key={s} size="sm" variant="outline" onClick={() => advanceStage(w.id, s)}>
                      → {s.replace(/_/g, " ")}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "kyc" && (
          <div className="space-y-3">
            {kycList.length === 0 ? (
              <p className="text-muted">No KYC submissions yet.</p>
            ) : kycList.map((k) => (
              <div key={k.id} className="rounded-xl border border-border p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Submission {k.id.slice(0, 8)}</p>
                  <p className="text-xs text-muted capitalize">Status: {k.status}</p>
                </div>
                {k.status === "submitted" && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => reviewKyc(k.id, "approved")}>Approve</Button>
                    <Button size="sm" variant="outline" onClick={() => reviewKyc(k.id, "rejected")}>Reject</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "performance" && (
          <div className="rounded-xl border border-border p-6">
            <p className="text-muted mb-4">Performance syncs every 15 minutes via cron job.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link href="/api/cron/sync-performance">Trigger Manual Sync</Link></Button>
              <Button variant="outline" asChild><Link href="/live-performance">View Live Performance</Link></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
