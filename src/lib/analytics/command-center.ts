import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getDashboardMetrics } from "@/lib/crm/leads-service";
import type { AnalyticsCommandCenter } from "@/types/production";

export async function getAnalyticsCommandCenter(): Promise<AnalyticsCommandCenter> {
  const crmMetrics = await getDashboardMetrics();

  const supabase = getSupabaseAdmin();
  let investors = 0;
  let partnerRevenue = 0;
  let countryBreakdown: { country: string; count: number }[] = [];

  if (supabase) {
    const { count: investorCount } = await supabase
      .from("platform_users")
      .select("*", { count: "exact", head: true })
      .eq("role", "investor");

    investors = investorCount ?? 0;

    const { data: commissions } = await supabase
      .from("partner_commissions")
      .select("amount")
      .eq("status", "paid");

    partnerRevenue = (commissions ?? []).reduce((sum, c) => sum + Number(c.amount), 0);

    const { data: leads } = await supabase.from("leads").select("country");
    const map = new Map<string, number>();
    (leads ?? []).forEach((l) => {
      const c = (l.country as string) || "Unknown";
      map.set(c, (map.get(c) ?? 0) + 1);
    });
    countryBreakdown = [...map.entries()]
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  const leads = crmMetrics.leads;
  const applications = crmMetrics.applications;
  const calls = crmMetrics.meetings;

  return {
    traffic: 0, // Wire to GA4 Data API in production
    leads,
    applications,
    calls,
    investors,
    capitalInflow: 0,
    conversionRate: leads > 0 ? Math.round((applications / leads) * 1000) / 10 : 0,
    revenue: 0,
    partnerRevenue,
    countryBreakdown,
  };
}
