"use client";

import { useEffect, useState } from "react";
import { Download, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapitalHeader } from "./capital-header";
import type { DataRoomDocument } from "@/types/capital-v7";

const CATEGORY_LABELS: Record<string, string> = {
  performance: "Performance Reports",
  due_diligence: "Due Diligence Packs",
  risk: "Risk Framework",
  methodology: "Investment Methodology",
  research: "Research Reports",
  operational: "Operational Documents",
  presentation: "Investor Presentations",
};

export function DataRoomHub() {
  const [docs, setDocs] = useState<DataRoomDocument[]>([]);

  useEffect(() => {
    fetch("/api/v1/data-room").then((r) => r.json()).then((d) => setDocs(d.documents ?? []));
  }, []);

  const handleDownload = async (slug: string, url?: string) => {
    await fetch(`/api/v1/data-room?download=${slug}`, { method: "POST" });
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Secure Access"
          title="Investor Data Room"
          description="Performance reports, due diligence packs, risk framework, research, and operational documents with access controls and download tracking."
          breadcrumb={{ name: "Data Room", path: "/data-room" }}
        />

        <div className="flex items-center gap-2 mb-8 rounded-lg border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-muted">
          <Lock className="h-4 w-4 text-accent shrink-0" />
          Qualified investors only. All downloads are logged for compliance.
        </div>

        <div className="space-y-6">
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => {
            const items = docs.filter((d) => d.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat}>
                <h2 className="text-lg font-semibold text-foreground mb-3">{label}</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {items.map((doc) => (
                    <div key={doc.slug} className="flex items-center justify-between rounded-xl border border-border bg-primary/30 p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">{doc.title}</p>
                          <p className="text-xs text-muted mt-1">{doc.description}</p>
                          <p className="text-[10px] text-muted/60 mt-1">{doc.downloadCount} downloads</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(doc.slug, doc.fileUrl)} className="gap-2 shrink-0">
                        <Download className="h-3.5 w-3.5" /> PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
