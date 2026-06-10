import { getSupabaseAdmin } from "@/lib/supabase/server";

export type WhatsAppTemplateId =
  | "new_lead"
  | "new_application"
  | "booked_call"
  | "application_approved"
  | "monthly_update"
  | "investor_alert";

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function sendWhatsApp(
  toPhone: string,
  templateId: WhatsAppTemplateId,
  params: Record<string, string> = {}
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();

  if (WHATSAPP_API_URL && WHATSAPP_TOKEN && WHATSAPP_PHONE_ID) {
    try {
      const res = await fetch(`${WHATSAPP_API_URL}/${WHATSAPP_PHONE_ID}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: toPhone.replace(/\D/g, ""),
          type: "template",
          template: { name: templateId, language: { code: "en" }, components: [] },
        }),
      });

      const json = await res.json();
      if (supabase) {
        await supabase.from("whatsapp_messages").insert({
          to_phone: toPhone,
          template_id: templateId,
          provider: "meta",
          external_id: json.messages?.[0]?.id,
          status: res.ok ? "sent" : "failed",
          sent_at: res.ok ? new Date().toISOString() : null,
          metadata: { params, response: json },
        });
      }
      return res.ok ? { success: true } : { success: false, error: JSON.stringify(json) };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
    }
  }

  // Webhook fallback
  const webhook = process.env.WHATSAPP_AUTOMATION_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toPhone, templateId, params }),
    }).catch(() => null);
    return { success: true };
  }

  return { success: false, error: "No WhatsApp provider configured" };
}
