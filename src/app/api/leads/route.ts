import { NextRequest, NextResponse } from "next/server";
import { createLead, logActivity } from "@/lib/crm/leads-service";
import { enqueueEmailSequence, getSequenceForTrigger } from "@/lib/automation/email-sequences";
import { triggerWhatsAppFlow } from "@/lib/automation/whatsapp-flows";
import type { LeadCreateInput } from "@/types/crm";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadCreateInput;
    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { lead, created } = await createLead(body);

    if (created) {
      const seq = getSequenceForTrigger("new_lead");
      await enqueueEmailSequence(lead.email, seq, lead.id);
      if (body.consent_whatsapp && body.phone) {
        await triggerWhatsAppFlow("new_lead", body.phone, { name: lead.full_name || "Investor" });
      }
    }

    return NextResponse.json({
      ok: true,
      lead: { id: lead.id, score: lead.lead_score, tier: lead.lead_tier, status: lead.status },
      created,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { leadId, activity_type, description } = await req.json();
    if (!leadId || !activity_type) {
      return NextResponse.json({ error: "leadId and activity_type required" }, { status: 400 });
    }
    await logActivity(leadId, activity_type, description);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
