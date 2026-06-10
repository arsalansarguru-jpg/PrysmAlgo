import { trackEvent } from "@/lib/analytics/events";

export interface LeadPayload {
  source: string;
  email: string;
  name?: string;
  phone?: string;
  country?: string;
  capital_range?: string;
  experience_level?: string;
  risk_profile?: string;
  goals?: string;
  consent_marketing?: boolean;
  consent_whatsapp?: boolean;
  metadata?: Record<string, string | number | boolean>;
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string; lead?: { id: string; score: number; tier: string } }> {
  trackEvent("lead_capture", {
    event_category: payload.source,
    event_label: payload.email,
  });

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: payload.name,
        email: payload.email,
        phone: payload.phone,
        country: payload.country,
        source: payload.source,
        capital_range: payload.capital_range,
        experience_level: payload.experience_level,
        risk_profile: payload.risk_profile,
        goals: payload.goals,
        consent_marketing: payload.consent_marketing ?? true,
        consent_whatsapp: payload.consent_whatsapp ?? false,
        metadata: payload.metadata,
      }),
    });

    const data = await res.json();
    if (!res.ok) return { ok: false, error: data.error || "Submission failed" };
    return { ok: true, lead: data.lead };
  } catch {
    return { ok: false, error: "Network error" };
  }
}
