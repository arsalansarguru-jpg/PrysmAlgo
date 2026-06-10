import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/crm/auth";
import { advanceOnboarding } from "@/lib/onboarding/workflow";
import type { OnboardingStage } from "@/types/production";

export async function PATCH(req: NextRequest) {
  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { workflowId, stage, notes } = (await req.json()) as {
    workflowId: string;
    stage: OnboardingStage;
    notes?: string;
  };

  if (!workflowId || !stage) {
    return NextResponse.json({ error: "workflowId and stage required" }, { status: 400 });
  }

  const workflow = await advanceOnboarding(workflowId, stage, notes);
  return NextResponse.json({ workflow });
}
