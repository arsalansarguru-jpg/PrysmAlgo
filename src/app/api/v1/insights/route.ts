import { NextResponse } from "next/server";
import { INSIGHTS } from "@/data/intelligence/insights";

export async function GET() {
  return NextResponse.json({ insights: INSIGHTS });
}
