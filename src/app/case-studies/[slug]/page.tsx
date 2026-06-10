import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { CaseStudyPageView } from "@/components/authority/case-study-page";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study Not Found" };
  return createMetadata({
    title: study.title,
    description: study.excerpt,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyPageView study={study} />;
}
