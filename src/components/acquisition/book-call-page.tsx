"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Globe, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics/events";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || SITE_CONFIG.calendly;

export function BookCallPage() {
  const [timezone, setTimezone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    trackEvent("calendly_click", { event_category: "book-call", event_label: "page_view" });
  }, []);

  const handlePreRegister = async () => {
    if (!form.email) return;
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, country: timezone }),
    });
    setConfirmed(true);
    trackEvent("lead_capture", { event_category: "book-call", event_label: form.email });
  };

  if (confirmed) {
    return (
      <div className="pt-28 pb-24">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-6">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">You&apos;re All Set</h1>
          <p className="text-muted mb-6">Complete your booking in the Calendly widget below. A confirmation email will follow.</p>
          <Button asChild><Link href="/live-performance">View Live Performance</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Book Call", path: "/book-call" }]} />
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">Book Investor Strategy Call</h1>
        <p className="text-lg text-muted max-w-2xl mb-8">
          Schedule a confidential consultation with our investor relations team. For qualified investors in India, UAE, UK, Singapore, Canada, and Australia.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-primary/30 p-5 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Clock className="h-4 w-4 text-accent" /> 30-minute consultation
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Globe className="h-4 w-4 text-accent" /> {timezone || "Detecting timezone..."}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Calendar className="h-4 w-4 text-accent" /> Video or phone
              </div>
            </div>

            <div className="rounded-xl border border-border p-5 space-y-4">
              <h2 className="font-semibold text-foreground text-sm">Your Details</h2>
              <div className="space-y-3">
                <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <Button onClick={handlePreRegister} className="w-full" disabled={!form.email}>
                Continue to Calendar
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl border border-border overflow-hidden min-h-[600px]">
            <iframe
              src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0f&text_color=e5e5e5&primary_color=a855f7`}
              title="Schedule a call with PrysmAlgo"
              className="w-full h-[600px] border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
