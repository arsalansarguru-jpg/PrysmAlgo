"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/lib/webhooks/submit-lead";

interface LeadCaptureFormProps {
  title?: string;
  description?: string;
  resourceName: string;
  variant?: "inline" | "card";
}

export function LeadCaptureForm({
  title = "Download Free Resource",
  description = "Enter your email to receive this guide and related institutional research from PrysmAlgo.",
  resourceName,
  variant = "card",
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const res = await submitLead({
      source: resourceName,
      email: email.trim(),
      consent_marketing: true,
    });
    setLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Submission failed");
      return;
    }
    setSubmitted(true);
  };

  const wrapperClass =
    variant === "card"
      ? "rounded-xl border border-accent/20 bg-accent/5 p-8"
      : "w-full max-w-md";

  if (submitted) {
    return (
      <div className={`${wrapperClass} text-center`}>
        <Check className="h-8 w-8 text-accent mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Request Received</h3>
        <p className="text-sm text-muted">
          Thank you. Our team will send <strong className="text-foreground">{resourceName}</strong> to{" "}
          <strong className="text-foreground">{email}</strong> shortly.
        </p>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Download className="h-8 w-8 text-accent mb-4" />
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted mb-6">{description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor={`lead-email-${resourceName}`} className="sr-only">
            Email address
          </Label>
          <Input
            id={`lead-email-${resourceName}`}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={!!error}
          />
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? "Submitting..." : "Get Free Access"}
        </Button>
        <p className="text-xs text-muted/60">
          By submitting, you agree to receive institutional research from PrysmAlgo. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
