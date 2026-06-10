import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { logAudit } from "@/lib/security/audit";
import type { KycStatus, KycSubmission } from "@/types/production";

export async function submitKyc(
  userId: string,
  files: { identity?: string; passport?: string; pan?: string; address?: string }
): Promise<KycSubmission | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const auditTrail = [{ action: "submitted", at: new Date().toISOString() }];

  const { data: existing } = await supabase
    .from("kyc_submissions")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  const payload = {
    user_id: userId,
    status: "submitted" as const,
    identity_doc_path: files.identity,
    passport_doc_path: files.passport,
    pan_doc_path: files.pan,
    address_doc_path: files.address,
    submitted_at: new Date().toISOString(),
    audit_trail: auditTrail,
  };

  const { data, error } = existing
    ? await supabase.from("kyc_submissions").update(payload).eq("id", existing.id).select().single()
    : await supabase.from("kyc_submissions").insert(payload).select().single();

  if (error || !data) return null;

  await supabase.from("platform_users").update({ kyc_status: "submitted" }).eq("id", userId);
  await logAudit({ action: "kyc_submitted", resourceType: "kyc", resourceId: data.id, metadata: { userId } });

  return mapKyc(data);
}

export async function reviewKyc(
  submissionId: string,
  status: "approved" | "rejected",
  reviewerId: string,
  notes?: string
): Promise<KycSubmission | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data: existing } = await supabase.from("kyc_submissions").select("*").eq("id", submissionId).single();
  if (!existing) return null;

  const auditTrail = [
    ...(existing.audit_trail as KycSubmission["auditTrail"]),
    { action: status, at: new Date().toISOString(), by: reviewerId },
  ];

  const { data, error } = await supabase
    .from("kyc_submissions")
    .update({
      status,
      reviewer_id: reviewerId,
      review_notes: notes,
      reviewed_at: new Date().toISOString(),
      audit_trail: auditTrail,
    })
    .eq("id", submissionId)
    .select()
    .single();

  if (error || !data) return null;

  if (existing.user_id) {
    await supabase.from("platform_users").update({ kyc_status: status }).eq("id", existing.user_id);
  }

  if (status === "approved") {
    const { data: user } = await supabase.from("platform_users").select("email").eq("id", existing.user_id).single();
    if (user?.email) await sendEmail(user.email, "kyc_approved");
  }

  await logAudit({ action: `kyc_${status}`, resourceType: "kyc", resourceId: submissionId, actorId: reviewerId });

  return mapKyc(data);
}

export async function listKycSubmissions(status?: KycStatus): Promise<KycSubmission[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase.from("kyc_submissions").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data } = await query;
  return (data ?? []).map(mapKyc);
}

function mapKyc(row: Record<string, unknown>): KycSubmission {
  return {
    id: row.id as string,
    userId: row.user_id as string | undefined,
    status: row.status as KycStatus,
    submittedAt: row.submitted_at as string | undefined,
    reviewedAt: row.reviewed_at as string | undefined,
    auditTrail: (row.audit_trail as KycSubmission["auditTrail"]) ?? [],
  };
}
