import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/crm/auth";
import { getAnalyticsCommandCenter } from "@/lib/analytics/command-center";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const analytics = await getAnalyticsCommandCenter();
  return NextResponse.json({ analytics });
}
