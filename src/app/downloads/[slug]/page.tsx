import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { LeadMagnetPageView } from "@/components/authority/lead-magnet-page";
import { LEAD_MAGNETS, getLeadMagnet } from "@/data/lead-magnets";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LEAD_MAGNETS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) return { title: "Download Not Found" };
  return createMetadata({
    title: `Free Download: ${magnet.title}`,
    description: magnet.description,
    path: `/downloads/${magnet.slug}`,
    keywords: magnet.keywords,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) notFound();
  return <LeadMagnetPageView magnet={magnet} />;
}
