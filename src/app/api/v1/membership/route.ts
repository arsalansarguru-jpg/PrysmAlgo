import { NextResponse } from "next/server";
import { MEMBERSHIP_PLANS } from "@/data/intelligence/membership";

export async function GET() {
  return NextResponse.json({ tiers: MEMBERSHIP_PLANS });
}
