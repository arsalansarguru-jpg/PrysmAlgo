import { NextRequest, NextResponse } from "next/server";
import { createLead, logActivity } from "@/lib/crm/leads-service";
import { enqueueEmailSequence } from "@/lib/automation/email-sequences";
import { triggerWhatsAppFlow } from "@/lib/automation/whatsapp-flows";

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone, country, calendly_event_id, meeting_date } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const { lead } = await createLead({
      email,
      full_name: name,
      phone,
      country,
      source: "book-call",
      status: "booked_call",
      pipeline_stage: "meeting_scheduled",
    });

    await logActivity(lead.id, "call_booked", `Calendly: ${calendly_event_id ?? "embed"}`);
    await enqueueEmailSequence(email, "booked-call", lead.id);
    if (phone) {
      await triggerWhatsAppFlow("booked_call", phone, {
        name: name || "Investor",
        date: meeting_date || "your scheduled time",
      });
    }

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
