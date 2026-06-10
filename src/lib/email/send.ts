import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { EMAIL_TEMPLATES, type EmailTemplateId } from "./templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.EMAIL_FROM ?? "PrysmAlgo <noreply@prysmalgo.com>";

export async function sendEmail(
  to: string,
  templateId: EmailTemplateId,
  vars: Record<string, string | undefined> = {}
): Promise<{ success: boolean; id?: string; error?: string }> {
  const template = EMAIL_TEMPLATES[templateId];
  const subject = template.subject(vars);
  const html = template.html(vars);

  const supabase = getSupabaseAdmin();

  if (resend) {
    const { data, error } = await resend.emails.send({ from: FROM_EMAIL, to, subject, html });
    if (supabase) {
      await supabase.from("email_messages").insert({
        to_email: to,
        template_id: templateId,
        subject,
        provider: "resend",
        external_id: data?.id,
        status: error ? "failed" : "sent",
        sent_at: error ? null : new Date().toISOString(),
        metadata: { vars, error: error?.message },
      });
    }
    if (error) return { success: false, error: error.message };
    return { success: true, id: data?.id };
  }

  // Fallback: SMTP webhook or automation webhook
  const webhook = process.env.EMAIL_AUTOMATION_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, templateId, subject, html, vars }),
    }).catch(() => null);
    return { success: true };
  }

  return { success: false, error: "No email provider configured" };
}
