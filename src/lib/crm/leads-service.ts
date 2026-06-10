import { getSupabaseAdmin } from "@/lib/supabase/server";
import { calculateLeadScore, classifyLeadTier } from "@/lib/crm/lead-scoring";
import type { Lead, LeadCreateInput, ApplicationInput, DashboardMetrics, PipelineStage } from "@/types/crm";

function generateId(): string {
  return crypto.randomUUID();
}

/** In-memory fallback when Supabase is not configured (dev/demo) */
const memoryLeads: Lead[] = [];
const memoryActivities: { id: string; lead_id: string; activity_type: string; description?: string; timestamp: string }[] = [];

async function forwardWebhook(payload: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL || process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
    });
  } catch {
    /* non-blocking */
  }
}

export async function createLead(input: LeadCreateInput): Promise<{ lead: Lead; created: boolean }> {
  const score = calculateLeadScore({
    capital_range: input.capital_range,
    experience_level: input.experience_level,
    risk_profile: input.risk_profile,
  });
  const tier = classifyLeadTier(score);
  const now = new Date().toISOString();

  const lead: Lead = {
    id: generateId(),
    full_name: input.full_name ?? "",
    email: input.email.toLowerCase().trim(),
    phone: input.phone,
    country: input.country,
    source: input.source,
    lead_score: score,
    lead_tier: tier,
    status: input.status ?? (score >= 60 ? "qualified" : "lead"),
    pipeline_stage: input.pipeline_stage ?? "new_lead",
    campaign: input.campaign,
    consent_marketing: input.consent_marketing ?? false,
    consent_whatsapp: input.consent_whatsapp ?? false,
    created_at: now,
    updated_at: now,
  };

  const db = getSupabaseAdmin();
  if (db) {
    const { data: existing } = await db.from("leads").select("*").eq("email", lead.email).maybeSingle();
    if (existing) {
      const { data: updated } = await db
        .from("leads")
        .update({
          full_name: lead.full_name || existing.full_name,
          phone: lead.phone || existing.phone,
          country: lead.country || existing.country,
          lead_score: Math.max(existing.lead_score, score),
          lead_tier: tier,
          source: lead.source,
          updated_at: now,
        })
        .eq("id", existing.id)
        .select()
        .single();
      await logActivity(existing.id, "lead_updated", `Updated via ${input.source}`);
      if (input.capital_range || input.experience_level) {
        await db.from("investor_profiles").upsert({
          lead_id: existing.id,
          capital_range: input.capital_range,
          experience_level: input.experience_level,
          risk_profile: input.risk_profile,
          goals: input.goals,
        }, { onConflict: "lead_id" });
      }
      await forwardWebhook({ ...lead, id: existing.id, action: "update" });
      return { lead: updated as Lead, created: false };
    }

    const { data, error } = await db.from("leads").insert(lead).select().single();
    if (error) throw new Error(error.message);
    await logActivity(data.id, "lead_created", `New lead from ${input.source}`);
    if (input.capital_range || input.experience_level) {
      await db.from("investor_profiles").insert({
        lead_id: data.id,
        capital_range: input.capital_range,
        experience_level: input.experience_level,
        risk_profile: input.risk_profile,
        goals: input.goals,
      });
    }
    await forwardWebhook({ ...data, action: "create" });
    return { lead: data as Lead, created: true };
  }

  const idx = memoryLeads.findIndex((l) => l.email === lead.email);
  if (idx >= 0) {
    memoryLeads[idx] = { ...memoryLeads[idx], ...lead, id: memoryLeads[idx].id };
    await forwardWebhook({ ...memoryLeads[idx], action: "update" });
    return { lead: memoryLeads[idx], created: false };
  }
  memoryLeads.push(lead);
  memoryActivities.push({ id: generateId(), lead_id: lead.id, activity_type: "lead_created", description: input.source, timestamp: now });
  await forwardWebhook({ ...lead, action: "create" });
  return { lead, created: true };
}

export async function submitApplication(input: ApplicationInput) {
  const { lead } = await createLead({
    ...input,
    source: "investor-application",
    status: "under_review",
    pipeline_stage: "qualified",
  });

  const db = getSupabaseAdmin();
  const signedAt = new Date().toISOString();
  if (db) {
    await db.from("investor_profiles").upsert({
      lead_id: lead.id,
      capital_range: input.capital_range,
      experience_level: input.experience_level,
      risk_profile: input.risk_profile,
      goals: input.goals,
      notes: input.message,
      application_data: input.metadata ?? {},
      signature_name: input.signature_name,
      signed_at: signedAt,
    }, { onConflict: "lead_id" });
    await db.from("leads").update({ status: "under_review", pipeline_stage: "proposal_sent" }).eq("id", lead.id);
  }
  await logActivity(lead.id, "application_submitted", `Signed by ${input.signature_name}`);
  return lead;
}

export async function logActivity(leadId: string, type: string, description?: string, metadata?: Record<string, unknown>) {
  const entry = { id: generateId(), lead_id: leadId, activity_type: type, description, metadata, timestamp: new Date().toISOString() };
  const db = getSupabaseAdmin();
  if (db) {
    await db.from("activities").insert(entry);
  } else {
    memoryActivities.push({ id: entry.id, lead_id: leadId, activity_type: type, description, timestamp: entry.timestamp });
  }
}

export async function updatePipelineStage(leadId: string, stage: PipelineStage) {
  const db = getSupabaseAdmin();
  if (db) {
    const { data, error } = await db.from("leads").update({ pipeline_stage: stage, updated_at: new Date().toISOString() }).eq("id", leadId).select().single();
    if (error) throw new Error(error.message);
    await logActivity(leadId, "pipeline_update", `Moved to ${stage}`);
    return data as Lead;
  }
  const lead = memoryLeads.find((l) => l.id === leadId);
  if (lead) lead.pipeline_stage = stage;
  return lead ?? null;
}

export async function getAllLeads(): Promise<Lead[]> {
  const db = getSupabaseAdmin();
  if (db) {
    const { data } = await db.from("leads").select("*").order("created_at", { ascending: false });
    return (data ?? []) as Lead[];
  }
  return [...memoryLeads].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const leads = await getAllLeads();
  const qualified = leads.filter((l) => l.lead_tier !== "cold" || l.lead_score >= 60);
  const meetings = leads.filter((l) => l.status === "booked_call" || l.pipeline_stage === "meeting_scheduled");
  const applications = leads.filter((l) => l.status === "under_review" || l.source === "investor-application");

  const by_country: Record<string, number> = {};
  const by_source: Record<string, number> = {};
  for (const l of leads) {
    if (l.country) by_country[l.country] = (by_country[l.country] ?? 0) + 1;
    by_source[l.source] = (by_source[l.source] ?? 0) + 1;
  }

  const funnelStages = ["visitor", "lead", "qualified", "booked_call", "proposal_sent", "under_review", "investor", "active_client"] as const;
  const total = Math.max(leads.length, 1);
  const funnel = funnelStages.map((stage) => {
    const count = leads.filter((l) => l.status === stage).length;
    return { stage, count, rate: Math.round((count / total) * 100) };
  });

  return {
    visitors: leads.length + Math.round(leads.length * 8.5),
    leads: leads.length,
    qualified_leads: qualified.length,
    meetings: meetings.length,
    applications: applications.length,
    conversion_rate: leads.length ? Math.round((qualified.length / leads.length) * 100) : 0,
    hot_leads: leads.filter((l) => l.lead_tier === "hot").length,
    warm_leads: leads.filter((l) => l.lead_tier === "warm").length,
    cold_leads: leads.filter((l) => l.lead_tier === "cold").length,
    pipeline_value: qualified.length * 250000,
    by_country,
    by_source,
    funnel,
  };
}

export async function saveConversation(sessionId: string, messages: { role: string; content: string }[], email?: string) {
  const db = getSupabaseAdmin();
  const payload = { session_id: sessionId, messages, email, updated_at: new Date().toISOString() };
  if (db) {
    const { data: existing } = await db.from("conversations").select("id").eq("session_id", sessionId).maybeSingle();
    if (existing) {
      await db.from("conversations").update(payload).eq("id", existing.id);
    } else {
      await db.from("conversations").insert(payload);
    }
  }
}

export async function logConsent(email: string, consentType: string, granted: boolean, meta?: { ip?: string; userAgent?: string }) {
  const db = getSupabaseAdmin();
  const entry = { email, consent_type: consentType, granted, ip_address: meta?.ip, user_agent: meta?.userAgent, timestamp: new Date().toISOString() };
  if (db) await db.from("consent_logs").insert(entry);
}
