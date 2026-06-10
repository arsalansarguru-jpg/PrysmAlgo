import Link from "next/link";
import { GraduationCap, Award } from "lucide-react";
import { IntelligenceHeader } from "./intelligence-header";
import { UNIVERSITY_COURSES } from "@/data/intelligence/university";

export function UniversityHub() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Investor Education"
          title="PrysmAlgo University"
          description="Structured courses on algorithmic trading, risk management, AI systems, and capital preservation with completion tracking and certificates."
          breadcrumb={{ name: "University", path: "/university" }}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSITY_COURSES.map((c) => (
            <Link key={c.slug} href={`/university/${c.slug}`} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/40 transition-colors group">
              <GraduationCap className="h-6 w-6 text-accent mb-4" />
              <span className="text-[10px] uppercase tracking-brand text-accent">{c.level}</span>
              <h2 className="text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-accent transition-colors">{c.title}</h2>
              <p className="text-sm text-muted line-clamp-2 mb-4">{c.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span>{c.modules} modules</span>
                <span>{c.duration}</span>
                {c.certificate && <span className="flex items-center gap-1 text-accent"><Award className="h-3 w-3" /> Certificate</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
