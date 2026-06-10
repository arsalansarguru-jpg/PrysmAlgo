"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const FIELDS = [
  { key: "identity", label: "Government ID" },
  { key: "passport", label: "Passport" },
  { key: "pan", label: "PAN Card" },
  { key: "address", label: "Proof of Address" },
] as const;

export function KycUpload() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    await fetch("/api/kyc", { method: "POST", body: form });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-24 text-center px-4">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">KYC Submitted</h1>
        <p className="text-muted mb-6">Our compliance team will review your documents within 2 business days.</p>
        <Button asChild><Link href="/portal">Return to Portal</Link></Button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-lg px-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/portal"><ArrowLeft className="h-4 w-4" /> Back to Portal</Link>
        </Button>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Identity Verification</h1>
        <p className="text-sm text-muted mb-8">Upload your KYC documents for compliance review.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              <input type="file" name={f.key} accept=".pdf,.jpg,.jpeg,.png" className="mt-1 block w-full text-sm text-muted file:mr-4 file:rounded file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:text-white" />
            </div>
          ))}
          <Button type="submit" className="w-full" disabled={loading}>
            <Upload className="h-4 w-4" /> {loading ? "Submitting..." : "Submit for Review"}
          </Button>
        </form>
      </div>
    </div>
  );
}
