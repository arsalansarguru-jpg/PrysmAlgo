import Link from "next/link";
import { Check, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { LeadCaptureForm } from "@/components/seo/lead-capture-form";
import type { LeadMagnet } from "@/types/content";

interface Props {
  magnet: LeadMagnet;
}

export function LeadMagnetPageView({ magnet }: Props) {
  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Downloads", path: "/downloads" }, { name: magnet.title, path: `/downloads/${magnet.slug}` }]} />
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-medium uppercase tracking-brand text-accent">{magnet.category}</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">{magnet.title}</h1>
            <p className="text-lg text-muted leading-relaxed mb-6">{magnet.description}</p>
            <p className="text-sm text-muted mb-6">{magnet.fileType} · {magnet.pages} pages</p>
            <ul className="space-y-3 mb-8">
              {magnet.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
            <Link href="/resources" className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
              <Download className="h-4 w-4" /> Browse all resources
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-primary/30 p-6 lg:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-2">Download Free</h2>
            <p className="text-sm text-muted mb-6">Enter your email to receive this institutional guide.</p>
            <LeadCaptureForm title="Download Free" resourceName={magnet.formSource} description={`Enter your email to receive ${magnet.title}.`} />
          </div>
        </div>
      </div>
    </article>
  );
}
