import { NextResponse } from "next/server";
import { INSTITUTE_REPORTS } from "@/data/intelligence/research-institute";

export async function GET() {
  return NextResponse.json({ reports: INSTITUTE_REPORTS });
}
