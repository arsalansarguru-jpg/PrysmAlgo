import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { logAudit } from "@/lib/security/audit";
import type { OnboardingStage, OnboardingWorkflow } from "@/types/production";
import { ONBOARDING_STAGES } from "@/types/production";

export async function createOnboardingWorkflow(email: string, leadId?: string): Promise<OnboardingWorkflow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const stages = [{ stage: "application" as OnboardingStage, completedAt: new Date().toISOString() }];

  const { data, error } = await supabase
    .from("onboarding_workflows")
    .insert({ email, lead_id: leadId, current_stage: "application", stages })
    .select()
    .single();

  if (error || !data) return null;

  await sendEmail(email, "application_received", { name: email.split("@")[0] });
  await logAudit({ action: "onboarding_created", resourceType: "onboarding", resourceId: data.id, metadata: { email } });

  return mapWorkflow(data);
}

export async function advanceOnboarding(
  workflowId: string,
  nextStage: OnboardingStage,
  notes?: string
): Promise<OnboardingWorkflow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data: existing } = await supabase
    .from("onboarding_workflows")
    .select("*")
    .eq("id", workflowId)
    .single();

  if (!existing) return null;

  const stages = [
    ...(existing.stages as OnboardingWorkflow["stages"]),
    { stage: nextStage, completedAt: new Date().toISOString(), notes },
  ];

  const { data, error } = await supabase
    .from("onboarding_workflows")
    .update({ current_stage: nextStage, stages, updated_at: new Date().toISOString() })
    .eq("id", workflowId)
    .select()
    .single();

  if (error || !data) return null;

  const email = data.email as string;

  if (nextStage === "approval") {
    await sendEmail(email, "application_approved", { name: email.split("@")[0] });
  }
  if (nextStage === "portal_access") {
    await sendEmail(email, "portal_activated", { name: email.split("@")[0] });
  }

  await logAudit({
    action: "onboarding_advanced",
    resourceType: "onboarding",
    resourceId: workflowId,
    metadata: { nextStage, notes },
  });

  return mapWorkflow(data);
}

export async function getOnboardingByEmail(email: string): Promise<OnboardingWorkflow | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data } = await supabase
    .from("onboarding_workflows")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data ? mapWorkflow(data) : null;
}

export async function listOnboardingWorkflows(): Promise<OnboardingWorkflow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data } = await supabase
    .from("onboarding_workflows")
    .select("*")
    .order("updated_at", { ascending: false });

  return (data ?? []).map(mapWorkflow);
}

function mapWorkflow(row: Record<string, unknown>): OnboardingWorkflow {
  return {
    id: row.id as string,
    email: row.email as string,
    currentStage: row.current_stage as OnboardingStage,
    stages: row.stages as OnboardingWorkflow["stages"],
    leadId: row.lead_id as string | undefined,
    userId: row.user_id as string | undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export { ONBOARDING_STAGES };
