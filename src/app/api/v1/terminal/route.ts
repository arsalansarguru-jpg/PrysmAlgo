import { NextResponse } from "next/server";
import { MARKET_WIDGETS, ECONOMIC_CALENDAR, AI_INSIGHTS, MACRO_ALERTS, MARKET_REGIME } from "@/data/intelligence/market-terminal";

export async function GET() {
  return NextResponse.json({ widgets: MARKET_WIDGETS, calendar: ECONOMIC_CALENDAR, insights: AI_INSIGHTS, alerts: MACRO_ALERTS, regime: MARKET_REGIME });
}
