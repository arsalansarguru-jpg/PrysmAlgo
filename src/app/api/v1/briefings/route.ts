import { NextResponse } from "next/server";
import { DAILY_BRIEFINGS } from "@/data/intelligence/daily-briefings";

export async function GET() {
  return NextResponse.json({ briefings: DAILY_BRIEFINGS });
}
