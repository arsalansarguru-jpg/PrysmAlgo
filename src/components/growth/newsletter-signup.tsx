"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/webhooks/submit-lead";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  source?: string;
  variant?: "inline" | "card";
  className?: string;
}

export function NewsletterSignup({
  title = "Weekly Market Intelligence",
  description = "Institutional research, market insights, and PrysmAlgo updates delivered to your inbox.",
  source = "newsletter",
  variant = "card",
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await submitLead({ source, email });
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className={cn("rounded-xl border border-accent/20 bg-accent/5 p-6 text-center", className)}>
        <Check className="h-8 w-8 text-accent mx-auto mb-3" />
        <p className="text-sm text-foreground font-medium">You&apos;re subscribed.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        variant === "card" && "rounded-xl border border-border bg-primary/30 p-8",
        className
      )}
    >
      <Mail className="h-8 w-8 text-accent mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
