"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BarChart3, Users, Phone, FileText, TrendingUp, Flame, LayoutDashboard, Kanban } from "lucide-react";
import { PIPELINE_COLUMNS, type Lead, type DashboardMetrics, type PipelineStage } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export function AdminDashboard({ view }: { view: "executive" | "pipeline" | "leads" }) {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const headers = useCallback(() => ({ "x-admin-key": adminKey }), [adminKey]);

  const fetchData = useCallback(async () => {
    if (!adminKey && process.env.NODE_ENV === "production") return;
    setLoading(true);
    try {
      const [mRes, lRes] = await Promise.all([
        fetch("/api/admin/metrics", { headers: headers() }),
        fetch("/api/admin/leads", { headers: headers() }),
      ]);
      if (mRes.ok) setMetrics((await mRes.json()).metrics);
      if (lRes.ok) setLeads((await lRes.json()).leads);
      if (mRes.ok || lRes.ok) setAuthenticated(true);
    } finally {
      setLoading(false);
    }
  }, [adminKey, headers]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const moveLead = async (leadId: string, stage: PipelineStage) => {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { ...headers(), "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, pipeline_stage: stage }),
    });
    fetchData();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-sm rounded-xl border border-border p-6">
          <h1 className="text-xl font-bold text-foreground mb-2">Admin Access</h1>
          <p className="text-sm text-muted mb-4">Enter your admin API key to access the CRM dashboard.</p>
          <Input type="password" placeholder="Admin API Key" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} className="mb-4" />
          <Button onClick={fetchData} className="w-full" disabled={loading}>
            {loading ? "Authenticating..." : "Enter Dashboard"}
          </Button>
          {process.env.NODE_ENV === "development" && (
            <Button variant="ghost" onClick={() => { setAuthenticated(true); fetchData(); }} className="w-full mt-2 text-xs">
              Dev: Skip Auth
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-primary/50 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-lg font-bold text-foreground">PrysmAlgo CRM</h1>
          <nav className="flex gap-2">
            <Link href="/admin"><Button variant={view === "executive" ? "default" : "ghost"} size="sm"><LayoutDashboard className="h-4 w-4" /> Executive</Button></Link>
            <Link href="/admin/pipeline"><Button variant={view === "pipeline" ? "default" : "ghost"} size="sm"><Kanban className="h-4 w-4" /> Pipeline</Button></Link>
            <Link href="/admin/leads"><Button variant={view === "leads" ? "default" : "ghost"} size="sm"><Users className="h-4 w-4" /> Leads</Button></Link>
            <Link href="/admin/operations"><Button variant="ghost" size="sm"><BarChart3 className="h-4 w-4" /> Operations</Button></Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {view === "executive" && metrics && (
          <>
            <h2 className="text-lg font-semibold text-foreground mb-6">CEO Dashboard — Today</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard label="Visitors (est.)" value={metrics.visitors} icon={TrendingUp} />
              <MetricCard label="Leads" value={metrics.leads} icon={Users} />
              <MetricCard label="Calls Scheduled" value={metrics.meetings} icon={Phone} />
              <MetricCard label="Applications" value={metrics.applications} icon={FileText} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <MetricCard label="Hot Leads" value={metrics.hot_leads} icon={Flame} />
              <MetricCard label="Warm Leads" value={metrics.warm_leads} icon={Users} />
              <MetricCard label="Conversion Rate" value={`${metrics.conversion_rate}%`} icon={BarChart3} />
              <MetricCard label="Pipeline Value" value={`$${(metrics.pipeline_value / 1e6).toFixed(1)}M`} icon={TrendingUp} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Funnel Conversion</h3>
                {metrics.funnel.map((f) => (
                  <div key={f.stage} className="flex items-center justify-between py-2 border-b border-border/50 text-sm">
                    <span className="text-muted capitalize">{f.stage.replace(/_/g, " ")}</span>
                    <span className="text-foreground font-medium">{f.count} ({f.rate}%)</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-4">Top Countries</h3>
                {Object.entries(metrics.by_country).slice(0, 8).map(([c, n]) => (
                  <div key={c} className="flex justify-between py-2 border-b border-border/50 text-sm">
                    <span className="text-muted">{c}</span><span className="text-foreground">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {view === "pipeline" && (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {PIPELINE_COLUMNS.map((col) => (
                <div key={col.id} className={`w-64 rounded-xl border ${col.color} bg-primary/20 p-3`}>
                  <h3 className="text-sm font-semibold text-foreground mb-3">{col.label}</h3>
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {leads.filter((l) => l.pipeline_stage === col.id).map((lead) => (
                      <div key={lead.id} className="rounded-lg border border-border bg-background/80 p-3 text-sm">
                        <p className="font-medium text-foreground truncate">{lead.full_name || lead.email}</p>
                        <p className="text-xs text-muted">{lead.lead_tier} · {lead.lead_score}</p>
                        <select
                          className="mt-2 w-full text-xs rounded border border-border bg-background px-2 py-1"
                          value={lead.pipeline_stage}
                          onChange={(e) => moveLead(lead.id, e.target.value as PipelineStage)}
                        >
                          {PIPELINE_COLUMNS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "leads" && (
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-primary/50">
                <tr>
                  <th className="text-left p-3 text-muted font-medium">Name</th>
                  <th className="text-left p-3 text-muted font-medium">Email</th>
                  <th className="text-left p-3 text-muted font-medium">Score</th>
                  <th className="text-left p-3 text-muted font-medium">Tier</th>
                  <th className="text-left p-3 text-muted font-medium">Source</th>
                  <th className="text-left p-3 text-muted font-medium">Stage</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-border/50 hover:bg-foreground/5">
                    <td className="p-3 text-foreground">{l.full_name || "—"}</td>
                    <td className="p-3 text-muted">{l.email}</td>
                    <td className="p-3 text-foreground">{l.lead_score}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${l.lead_tier === "hot" ? "bg-red-500/20 text-red-400" : l.lead_tier === "warm" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>{l.lead_tier}</span></td>
                    <td className="p-3 text-muted">{l.source}</td>
                    <td className="p-3 text-muted capitalize">{l.pipeline_stage.replace(/_/g, " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
