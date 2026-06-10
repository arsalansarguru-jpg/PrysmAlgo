import { NextRequest, NextResponse } from "next/server";
import { getLivePerformance } from "@/lib/performance/service";
import { getCapitalFlowSummary } from "@/lib/capital-v7/services";
import { logAudit } from "@/lib/security/audit";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") ?? "monthly_investor";
  const period = req.nextUrl.searchParams.get("period") ?? new Date().toISOString().slice(0, 7);

  const [perf, flows] = await Promise.all([getLivePerformance(), getCapitalFlowSummary()]);

  const report = {
    type,
    period,
    title: `${type.replace(/_/g, " ")} — ${period}`,
    performance: perf.metrics,
    flows,
    generatedAt: new Date().toISOString(),
  };

  await logAudit({ action: "report_generated", resourceType: "report", metadata: { type, period } });

  return NextResponse.json({ report });
}
