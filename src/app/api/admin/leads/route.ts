import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/crm/auth";
import { getAllLeads, updatePipelineStage } from "@/lib/crm/leads-service";
import type { PipelineStage } from "@/types/crm";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const leads = await getAllLeads();
  return NextResponse.json({ leads });
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { leadId, pipeline_stage } = await req.json();
  if (!leadId || !pipeline_stage) {
    return NextResponse.json({ error: "leadId and pipeline_stage required" }, { status: 400 });
  }
  const lead = await updatePipelineStage(leadId, pipeline_stage as PipelineStage);
  return NextResponse.json({ lead });
}
