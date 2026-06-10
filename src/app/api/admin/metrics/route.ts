import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/crm/auth";
import { getDashboardMetrics } from "@/lib/crm/leads-service";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const metrics = await getDashboardMetrics();
  return NextResponse.json({ metrics });
}
