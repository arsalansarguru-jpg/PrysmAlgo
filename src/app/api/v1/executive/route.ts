import { NextResponse } from "next/server";
import { getExecutiveDashboard } from "@/lib/capital-v7/services";
import { verifyAdminRequest } from "@/lib/crm/auth";

export async function GET(req: Request) {
  const isAdmin = verifyAdminRequest(req as import("next/server").NextRequest);
  const dashboard = await getExecutiveDashboard();
  return NextResponse.json({ dashboard, restricted: !isAdmin });
}
