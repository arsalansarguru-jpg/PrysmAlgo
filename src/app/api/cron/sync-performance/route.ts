import { NextRequest, NextResponse } from "next/server";
import { syncAllPerformanceProviders } from "@/lib/performance/sync";
import { logAudit } from "@/lib/security/audit";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await syncAllPerformanceProviders();

  await logAudit({
    action: "performance_sync",
    resourceType: "cron",
    metadata: { results },
  });

  return NextResponse.json({ syncedAt: new Date().toISOString(), results });
}
