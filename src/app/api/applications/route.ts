import { NextRequest, NextResponse } from "next/server";
import { submitApplication } from "@/lib/crm/leads-service";
import { enqueueEmailSequence } from "@/lib/automation/email-sequences";
import { triggerWhatsAppFlow } from "@/lib/automation/whatsapp-flows";
import { createOnboardingWorkflow } from "@/lib/onboarding/workflow";
import { sendEmail } from "@/lib/email/send";
import type { ApplicationInput } from "@/types/crm";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ApplicationInput;

    if (!body.email?.trim()) return NextResponse.json({ error: "Email required" }, { status: 400 });
    if (!body.signature_name?.trim()) return NextResponse.json({ error: "Signature required" }, { status: 400 });
    if (!body.declarations_accepted || !body.risk_disclosure_accepted) {
      return NextResponse.json({ error: "All declarations must be accepted" }, { status: 400 });
    }

    const lead = await submitApplication(body);
    await createOnboardingWorkflow(lead.email, lead.id);
    await sendEmail(lead.email, "application_received", { name: body.full_name || body.signature_name });
    await enqueueEmailSequence(lead.email, "investor-followup", lead.id);
    if (body.phone) {
      await triggerWhatsAppFlow("investor_application", body.phone, { name: body.full_name || body.signature_name });
    }

    return NextResponse.json({
      ok: true,
      lead: { id: lead.id, score: lead.lead_score, tier: lead.lead_tier },
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
