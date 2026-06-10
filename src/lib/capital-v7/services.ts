import { getSupabaseAdmin } from "@/lib/supabase/server";
import { IR_COMMUNICATIONS, getIrCommunication } from "@/data/capital-v7/ir-communications";
import { PIPELINE_DEALS, getPipelineSummary } from "@/data/capital-v7/pipeline";
import { DATA_ROOM_DOCUMENTS } from "@/data/capital-v7/data-room";
import { IR_EVENTS, getEvent } from "@/data/capital-v7/events";
import type {
  CapitalFlowSummary,
  ExecutiveDashboard,
  InvestorHealthScore,
  PlatformForecast,
} from "@/types/capital-v7";
import { getLivePerformance } from "@/lib/performance/service";

export async function getIrCommunications() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return IR_COMMUNICATIONS;

  const { data } = await supabase
    .from("ir_communications")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (!data?.length) return IR_COMMUNICATIONS;

  return data.map((r) => ({
    slug: r.slug,
    category: r.category,
    title: r.title,
    summary: r.summary ?? "",
    body: r.body ?? "",
    publishedAt: r.published_at,
    author: r.author ?? "Investor Relations",
  }));
}

export async function getIrBySlug(slug: string) {
  const comms = await getIrCommunications();
  return comms.find((c) => c.slug === slug) ?? getIrCommunication(slug);
}

export async function getCapitalPipeline() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { deals: PIPELINE_DEALS, summary: getPipelineSummary() };

  const { data } = await supabase.from("capital_pipeline").select("*").order("updated_at", { ascending: false });
  if (!data?.length) return { deals: PIPELINE_DEALS, summary: getPipelineSummary() };

  const deals = data.map((r) => ({
    id: r.id,
    investorName: r.investor_name,
    email: r.email,
    country: r.country,
    stage: r.stage,
    capitalCommitted: Number(r.capital_committed),
    capitalFunded: Number(r.capital_funded),
    expectedClose: r.expected_close,
  }));

  const committed = deals.reduce((s, d) => s + d.capitalCommitted, 0);
  const funded = deals.reduce((s, d) => s + d.capitalFunded, 0);
  return { deals, summary: { committed, funded, expectedAum: committed, deals: deals.length } };
}

export async function getDataRoomDocuments() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return DATA_ROOM_DOCUMENTS;

  const { data } = await supabase.from("data_room_documents").select("*").eq("published", true);
  if (!data?.length) return DATA_ROOM_DOCUMENTS;

  return data.map((r) => ({
    slug: r.slug,
    category: r.category,
    title: r.title,
    description: r.description ?? "",
    fileUrl: r.file_url,
    downloadCount: r.download_count ?? 0,
  }));
}

export async function trackDataRoomDownload(documentSlug: string, userEmail?: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { data: doc } = await supabase.from("data_room_documents").select("id").eq("slug", documentSlug).single();
  if (!doc) return;

  await supabase.from("data_room_downloads").insert({ document_id: doc.id, user_email: userEmail });
  const { data: current } = await supabase.from("data_room_documents").select("download_count").eq("id", doc.id).single();
  if (current) {
    await supabase.from("data_room_documents").update({ download_count: (current.download_count ?? 0) + 1 }).eq("id", doc.id);
  }
}

export async function getEvents() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return IR_EVENTS;

  const { data } = await supabase.from("ir_events").select("*").eq("published", true).order("scheduled_at", { ascending: true });
  if (!data?.length) return IR_EVENTS;

  return data.map((r) => ({
    slug: r.slug,
    title: r.title,
    eventType: r.event_type,
    description: r.description ?? "",
    scheduledAt: r.scheduled_at,
    durationMinutes: r.duration_minutes,
    replayUrl: r.replay_url,
    registrationCount: r.registration_count ?? 0,
  }));
}

export async function getEventBySlug(slug: string) {
  const events = await getEvents();
  return events.find((e) => e.slug === slug) ?? getEvent(slug);
}

export async function getCapitalFlowSummary(): Promise<CapitalFlowSummary> {
  const supabase = getSupabaseAdmin();
  const perf = await getLivePerformance();

  if (!supabase) {
    return {
      deposits: 2_400_000,
      withdrawals: 350_000,
      profitShare: 428_000,
      netFlows: 2_050_000,
      monthlyGrowth: perf.metrics.monthlyReturn,
      aumGrowth: perf.metrics.ytdReturn,
      investorCount: 24,
      aum: 12_400_000,
      countryBreakdown: [
        { country: "India", amount: 5_200_000 },
        { country: "UAE", amount: 3_800_000 },
        { country: "Singapore", amount: 1_600_000 },
        { country: "UK", amount: 1_200_000 },
        { country: "USA", amount: 600_000 },
      ],
    };
  }

  const { data: flows } = await supabase.from("capital_flows").select("*");
  const deposits = (flows ?? []).filter((f) => f.flow_type === "deposit").reduce((s, f) => s + Number(f.amount), 0);
  const withdrawals = (flows ?? []).filter((f) => f.flow_type === "withdrawal").reduce((s, f) => s + Number(f.amount), 0);
  const profitShare = (flows ?? []).filter((f) => f.flow_type === "profit_share").reduce((s, f) => s + Number(f.amount), 0);

  const { count } = await supabase.from("platform_users").select("*", { count: "exact", head: true }).eq("role", "investor");

  return {
    deposits,
    withdrawals,
    profitShare,
    netFlows: deposits - withdrawals,
    monthlyGrowth: perf.metrics.monthlyReturn,
    aumGrowth: perf.metrics.ytdReturn,
    investorCount: count ?? 0,
    aum: deposits - withdrawals + profitShare,
    countryBreakdown: [],
  };
}

export async function getInvestorHealthScore(email: string): Promise<InvestorHealthScore> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { email, engagementScore: 78, portalUsageScore: 82, emailOpensScore: 65, referralScore: 40, retentionRisk: "low", overallScore: 74 };
  }

  const { data } = await supabase.from("investor_health_scores").select("*").eq("email", email).maybeSingle();
  if (!data) {
    return { email, engagementScore: 50, portalUsageScore: 50, emailOpensScore: 50, referralScore: 0, retentionRisk: "medium", overallScore: 50 };
  }

  return {
    email,
    engagementScore: data.engagement_score,
    portalUsageScore: data.portal_usage_score,
    emailOpensScore: data.email_opens_score,
    referralScore: data.referral_score,
    retentionRisk: data.retention_risk,
    overallScore: data.overall_score,
  };
}

export async function getExecutiveDashboard(): Promise<ExecutiveDashboard> {
  const [pipeline, flows] = await Promise.all([getCapitalPipeline(), getCapitalFlowSummary()]);

  const forecasts: PlatformForecast[] = [
    { type: "aum_growth", period: "Q2 2026", predictedValue: flows.aum * 1.12, confidence: 0.78 },
    { type: "lead_conversion", period: "Q2 2026", predictedValue: 18, confidence: 0.72 },
    { type: "revenue", period: "Q2 2026", predictedValue: 485000, confidence: 0.75 },
    { type: "retention", period: "Q2 2026", predictedValue: 94, confidence: 0.85 },
    { type: "partner_growth", period: "Q2 2026", predictedValue: 8, confidence: 0.7 },
    { type: "pipeline_value", period: "Q2 2026", predictedValue: pipeline.summary.committed, confidence: 0.68 },
  ];

  return {
    aum: flows.aum,
    monthlyGrowth: flows.monthlyGrowth,
    investorCount: flows.investorCount,
    retentionRate: 94.2,
    pipelineValue: pipeline.summary.committed,
    capitalCommitted: pipeline.summary.committed,
    capitalFunded: pipeline.summary.funded,
    conversionRate: 12.4,
    revenue: 485000,
    partnerCapital: 2_100_000,
    countryPerformance: flows.countryBreakdown.map((c) => ({
      country: c.country,
      aum: c.amount,
      investors: Math.max(1, Math.round(c.amount / 500000)),
    })),
    forecasts: forecasts.map((f) => ({ label: f.type.replace(/_/g, " "), value: f.predictedValue, period: f.period })),
  };
}

export async function getForecasts(): Promise<PlatformForecast[]> {
  const dashboard = await getExecutiveDashboard();
  return dashboard.forecasts.map((f, i) => ({
    type: ["aum_growth", "lead_conversion", "revenue", "retention", "partner_growth", "pipeline_value"][i] ?? "aum_growth",
    period: f.period,
    predictedValue: f.value,
    confidence: 0.75,
  }));
}
