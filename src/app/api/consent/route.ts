import { NextRequest, NextResponse } from "next/server";
import { logConsent } from "@/lib/crm/leads-service";

export async function POST(req: NextRequest) {
  try {
    const { email, consent_type, granted } = await req.json();
    if (!consent_type) return NextResponse.json({ error: "consent_type required" }, { status: 400 });

    await logConsent(email ?? "anonymous", consent_type, Boolean(granted), {
      ip: req.headers.get("x-forwarded-for") ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
