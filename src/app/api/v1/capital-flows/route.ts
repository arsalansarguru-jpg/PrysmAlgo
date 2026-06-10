import { NextResponse } from "next/server";
import { getCapitalFlowSummary } from "@/lib/capital-v7/services";

export async function GET() {
  const flows = await getCapitalFlowSummary();
  return NextResponse.json({ flows });
}
