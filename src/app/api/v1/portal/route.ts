import { NextResponse } from "next/server";
import { getLivePerformance } from "@/lib/performance/service";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const performance = await getLivePerformance();
  const supabase = getSupabaseAdmin();

  let portfolio = null;
  if (supabase) {
    const { data } = await supabase
      .from("investor_portfolios")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (data) {
      portfolio = {
        totalValue: Number(data.total_value),
        ytdReturn: Number(data.ytd_return),
        allocation: data.allocation,
        equityCurve: data.equity_curve,
      };
    }
  }

  return NextResponse.json({ performance, portfolio });
}
