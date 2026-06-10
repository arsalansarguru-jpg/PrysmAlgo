import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { DailyBriefingDetail } from "@/components/intelligence/daily-briefing-detail";
import { DAILY_BRIEFINGS, getBriefing } from "@/data/intelligence/daily-briefings";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DAILY_BRIEFINGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBriefing(slug);
  if (!b) return { title: "Not Found" };
  return createMetadata({ title: b.title, description: b.marketSummary, path: `/daily-briefing/${b.slug}`, type: "article", publishedTime: b.date });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const briefing = getBriefing(slug);
  if (!briefing) notFound();
  return <DailyBriefingDetail briefing={briefing} />;
}
