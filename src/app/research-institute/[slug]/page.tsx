import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";
import { INSTITUTE_REPORTS, getInstituteReport } from "@/data/intelligence/research-institute";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSTITUTE_REPORTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = getInstituteReport(slug);
  if (!r) return { title: "Not Found" };
  return createMetadata({ title: r.title, description: r.excerpt, path: `/research-institute/${r.slug}`, type: "article", publishedTime: r.date });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const report = getInstituteReport(slug);
  if (!report) notFound();

  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Research Institute", path: "/research-institute" }, { name: report.title, path: `/research-institute/${report.slug}` }]} />
        <span className="text-xs text-accent uppercase tracking-brand">{report.category}</span>
        <h1 className="font-display text-3xl font-bold text-foreground mt-3 mb-6">{report.title}</h1>
        <p className="text-muted mb-8">{report.excerpt}</p>
        {report.sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-3">{s.heading}</h2>
            {s.paragraphs.map((p, i) => <p key={i} className="text-muted leading-relaxed mb-3">{p}</p>)}
          </section>
        ))}
        <div className="flex gap-3">
          <Button asChild variant="outline"><Link href="/research-institute">← All Reports</Link></Button>
          {report.pdfReady && <Button>Download PDF ({report.tier} tier)</Button>}
        </div>
      </div>
    </article>
  );
}
