import Link from "next/link";
import { Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapitalHeader } from "./capital-header";
import { DUE_DILIGENCE_SECTIONS } from "@/data/capital-v7/due-diligence";

export function DueDiligenceCenter() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Due Diligence"
          title="Institutional Due Diligence Center"
          description="Operations, technology, risk, compliance, research, performance, management, and security — institutional-grade presentation for qualified allocators."
          breadcrumb={{ name: "Due Diligence", path: "/due-diligence" }}
        />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {DUE_DILIGENCE_SECTIONS.map((s) => (
            <div key={s.section} className="rounded-xl border border-border bg-primary/30 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              </div>
              <p className="text-sm text-muted mb-4">{s.summary}</p>
              <ul className="space-y-2">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground">Request Full Due Diligence Pack</p>
            <p className="text-sm text-muted">Access complete documentation in the secure data room.</p>
          </div>
          <Button asChild><Link href="/data-room">Open Data Room</Link></Button>
        </div>
      </div>
    </div>
  );
}
