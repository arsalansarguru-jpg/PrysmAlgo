import { NextRequest, NextResponse } from "next/server";
import { getOnboardingByEmail, listOnboardingWorkflows } from "@/lib/onboarding/workflow";
import { verifyAdminRequest } from "@/lib/crm/auth";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (email) {
    const workflow = await getOnboardingByEmail(email);
    return NextResponse.json({ workflow });
  }

  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const workflows = await listOnboardingWorkflows();
  return NextResponse.json({ workflows });
}
