import { NextResponse } from "next/server";
import { isCrmEnabled } from "@/lib/supabase/server";
export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    services: {
      crm: isCrmEnabled(),
      auth: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      performance: Boolean(process.env.FXBLUE_API_URL || process.env.MYFXBOOK_SESSION || process.env.BROKER_API_URL),
      email: Boolean(process.env.RESEND_API_KEY || process.env.EMAIL_AUTOMATION_WEBHOOK_URL),
      whatsapp: Boolean(process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_AUTOMATION_WEBHOOK_URL),
    },
  });
}
