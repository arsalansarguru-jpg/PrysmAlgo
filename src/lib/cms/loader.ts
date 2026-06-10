import { getSupabaseAdmin } from "@/lib/supabase/server";
import { DAILY_BRIEFINGS } from "@/data/intelligence/daily-briefings";
import type { DailyBriefing } from "@/types/intelligence";

/** CMS loader — Supabase cms_content overrides static data when published */
export async function getPublishedBriefings(): Promise<DailyBriefing[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return DAILY_BRIEFINGS;

  const { data } = await supabase
    .from("cms_content")
    .select("*")
    .eq("content_type", "briefing")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (!data?.length) return DAILY_BRIEFINGS;

  const cmsBriefings: DailyBriefing[] = data.map((row) => {
    const fm = row.frontmatter as Record<string, unknown>;
    return {
      slug: row.slug as string,
      date: (fm.date as string) ?? (row.published_at as string)?.split("T")[0] ?? "",
      title: row.title as string,
      marketSummary: (fm.marketSummary as string) ?? "",
      goldOutlook: (fm.goldOutlook as string) ?? "",
      forexOutlook: (fm.forexOutlook as string) ?? "",
      economicEvents: (fm.economicEvents as DailyBriefing["economicEvents"]) ?? [],
      algorithmPositioning: (fm.algorithmPositioning as string) ?? "",
      riskAlerts: (fm.riskAlerts as string[]) ?? [],
      regime: (fm.regime as string) ?? "neutral",
    };
  });

  const staticSlugs = new Set(cmsBriefings.map((b) => b.slug));
  const merged = [...cmsBriefings, ...DAILY_BRIEFINGS.filter((b) => !staticSlugs.has(b.slug))];
  return merged.sort((a, b) => b.date.localeCompare(a.date));
}

export async function upsertCmsContent(input: {
  slug: string;
  contentType: string;
  title: string;
  body?: string;
  frontmatter?: Record<string, unknown>;
  published?: boolean;
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cms_content")
    .upsert(
      {
        slug: input.slug,
        content_type: input.contentType,
        title: input.title,
        body: input.body,
        frontmatter: input.frontmatter ?? {},
        published: input.published ?? false,
        published_at: input.published ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  return error ? null : data;
}
