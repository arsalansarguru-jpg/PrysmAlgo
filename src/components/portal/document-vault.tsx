"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { InvestorDocument } from "@/types/production";

export function DocumentVault() {
  const [documents, setDocuments] = useState<InvestorDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/documents")
      .then((r) => (r.ok ? r.json() : { documents: [] }))
      .then((d) => setDocuments(d.documents ?? []))
      .finally(() => setLoading(false));
  }, []);

  const download = async (id: string) => {
    const res = await fetch(`/api/documents?download=${id}`);
    const json = await res.json();
    if (json.url) window.open(json.url, "_blank");
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/portal"><ArrowLeft className="h-4 w-4" /> Back to Portal</Link>
        </Button>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Document Vault</h1>
        <p className="text-sm text-muted mb-8">Agreements, statements, reports, tax documents, and KYC files.</p>

        {loading ? (
          <p className="text-muted">Loading documents...</p>
        ) : documents.length === 0 ? (
          <div className="rounded-xl border border-border p-8 text-center text-muted">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            No documents yet. Your monthly statements and agreements will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between rounded-xl border border-border bg-primary/20 p-4">
                <div>
                  <p className="font-medium text-foreground">{doc.title}</p>
                  <p className="text-xs text-muted capitalize">{doc.category} · {new Date(doc.createdAt).toLocaleDateString()}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => download(doc.id)}>
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
