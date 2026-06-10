import { IntelligenceHeader } from "./intelligence-header";
import { PRESERVATION_PILLARS } from "@/data/intelligence/capital-preservation-hub";
import { Shield } from "lucide-react";

export function CapitalPreservationHub() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Capital Preservation"
          title="Capital Preservation Hub"
          description="How PrysmAlgo protects investor capital through drawdown control, position sizing, regime detection, and emergency protocols."
          breadcrumb={{ name: "Capital Preservation", path: "/capital-preservation" }}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {PRESERVATION_PILLARS.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-primary/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold text-foreground">{p.title}</h2>
              </div>
              <p className="text-sm text-muted mb-4 leading-relaxed">{p.description}</p>
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 font-mono text-xs text-accent">
                {p.diagram}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
