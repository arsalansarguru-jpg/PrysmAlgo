import { NextRequest, NextResponse } from "next/server";
import { getInvestorHealthScore } from "@/lib/capital-v7/services";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") ?? "investor@example.com";
  const score = await getInvestorHealthScore(email);
  return NextResponse.json({ score });
}
