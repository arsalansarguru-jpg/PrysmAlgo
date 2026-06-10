import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/crm/auth";
import { listKycSubmissions, reviewKyc } from "@/lib/kyc/service";
import type { KycStatus } from "@/types/production";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = req.nextUrl.searchParams.get("status") as KycStatus | null;
  const submissions = await listKycSubmissions(status ?? undefined);
  return NextResponse.json({ submissions });
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { submissionId, status, notes } = (await req.json()) as {
    submissionId: string;
    status: "approved" | "rejected";
    notes?: string;
  };

  const result = await reviewKyc(submissionId, status, "admin", notes);
  return NextResponse.json({ submission: result });
}
