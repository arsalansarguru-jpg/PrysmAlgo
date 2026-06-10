/** WhatsApp automation architecture — Twilio / Meta Business API */

export type WhatsAppTrigger = "new_lead" | "booked_call" | "missed_call" | "investor_application";

export interface WhatsAppMessage {
  trigger: WhatsAppTrigger;
  template: string;
  body: string;
}

export const WHATSAPP_FLOWS: Record<WhatsAppTrigger, WhatsAppMessage> = {
  new_lead: {
    trigger: "new_lead",
    template: "new_lead_welcome",
    body: "Hello {{name}}, thank you for your interest in PrysmAlgo. We provide institutional-grade algorithmic trading for qualified investors in India and UAE. Reply INFO for our investor overview or CALL to schedule a consultation.",
  },
  booked_call: {
    trigger: "booked_call",
    template: "call_confirmed",
    body: "Hi {{name}}, your PrysmAlgo strategy consultation is confirmed for {{date}}. Please review our risk framework at prysmalgo.com/risk-framework before the call.",
  },
  missed_call: {
    trigger: "missed_call",
    template: "missed_call_followup",
    body: "Hi {{name}}, we missed you on our scheduled call. Would you like to reschedule? Visit prysmalgo.com/book-call or reply RESCHEDULE.",
  },
  investor_application: {
    trigger: "investor_application",
    template: "application_received",
    body: "Thank you {{name}}. Your PrysmAlgo investor application has been received and is under review. Our team will contact you within 2–3 business days.",
  },
};

export async function triggerWhatsAppFlow(
  trigger: WhatsAppTrigger,
  phone: string,
  vars: Record<string, string>
) {
  if (!phone) return;

  const templateMap: Record<WhatsAppTrigger, import("@/lib/whatsapp/send").WhatsAppTemplateId> = {
    new_lead: "new_lead",
    booked_call: "booked_call",
    missed_call: "investor_alert",
    investor_application: "new_application",
  };
  const { sendWhatsApp } = await import("@/lib/whatsapp/send");
  await sendWhatsApp(phone, templateMap[trigger], vars);

  const webhook = process.env.WHATSAPP_AUTOMATION_WEBHOOK_URL;
  if (!webhook) return;
  const flow = WHATSAPP_FLOWS[trigger];
  let body = flow.body;
  for (const [k, v] of Object.entries(vars)) {
    body = body.replace(`{{${k}}}`, v);
  }
  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trigger, phone, template: flow.template, body, sentAt: new Date().toISOString() }),
  }).catch(() => null);
}
