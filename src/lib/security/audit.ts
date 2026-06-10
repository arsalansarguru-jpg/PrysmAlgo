import { getSupabaseAdmin } from "@/lib/supabase/server";

export interface AuditEntry {
  actorId?: string;
  actorEmail?: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  await supabase.from("audit_logs").insert({
    actor_id: entry.actorId,
    actor_email: entry.actorEmail,
    action: entry.action,
    resource_type: entry.resourceType,
    resource_id: entry.resourceId,
    metadata: entry.metadata ?? {},
    ip_address: entry.ipAddress,
    user_agent: entry.userAgent,
  });
}
