import { NextResponse } from "next/server";
import { getLivePerformance, getPerformanceMeta } from "@/lib/performance/service";

export const revalidate = 900; // 15 minutes

export async function GET() {
  const [snapshot, meta] = await Promise.all([getLivePerformance(), getPerformanceMeta()]);
  return NextResponse.json({ ...snapshot, meta });
}
