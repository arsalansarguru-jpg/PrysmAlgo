import { NextRequest, NextResponse } from "next/server";
import { saveConversation } from "@/lib/crm/leads-service";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages, email } = await req.json();
    if (!sessionId || !messages) {
      return NextResponse.json({ error: "sessionId and messages required" }, { status: 400 });
    }
    await saveConversation(sessionId, messages, email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
