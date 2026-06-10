import { NextResponse } from "next/server";
import { TRUST_SCORE, TRUST_DIMENSIONS } from "@/data/intelligence/trust-score";

export async function GET() {
  return NextResponse.json({ score: TRUST_SCORE, dimensions: TRUST_DIMENSIONS });
}
