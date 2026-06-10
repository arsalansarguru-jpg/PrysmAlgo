import { NextResponse } from "next/server";
import { getForecasts } from "@/lib/capital-v7/services";

export async function GET() {
  const forecasts = await getForecasts();
  return NextResponse.json({ forecasts });
}
