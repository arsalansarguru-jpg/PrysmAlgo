import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { researchCategories, researchReports, economicEvents } from "@/data/research";
import { NewsletterSignup } from "./newsletter-signup";
import { Calendar, TrendingUp } from "lucide-react";

export function ResearchHubPage() {
  const featured = researchReports.filter((r) => r.featured);
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Research", path: "/research" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Weekly Research Hub</h1>
        <p className="text-lg text-muted max-w-3xl mb-12">Institutional market insights, forex outlook, gold analysis, and AI trading research.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {researchCategories.map((cat) => (
            <div key={cat.slug} className="rounded-xl border border-border bg-primary/30 p-5">
              <TrendingUp className="h-5 w-5 text-accent mb-2" />
              <h3 className="font-semibold text-foreground text-sm">{cat.name}</h3>
              <p className="text-xs text-muted mt-1">{cat.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6">Featured Reports</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {featured.map((r) => (
            <Link key={r.slug} href={`/research/${r.slug}`} className="rounded-xl border border-accent/20 bg-accent/5 p-6 hover:border-accent/40 transition-colors">
              <span className="text-[10px] uppercase tracking-brand text-accent">{r.category}</span>
              <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{r.title}</h3>
              <p className="text-sm text-muted mb-3">{r.excerpt}</p>
              <p className="text-xs text-muted/60">{r.date}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6">All Reports</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {researchReports.map((r) => (
            <Link key={r.slug} href={`/research/${r.slug}`} className="rounded-xl border border-border bg-primary/30 p-5 hover:border-accent/30 transition-colors">
              <span className="text-[10px] text-accent">{r.category}</span>
              <h3 className="font-semibold text-foreground text-sm mt-1 mb-2">{r.title}</h3>
              <p className="text-xs text-muted line-clamp-2">{r.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="rounded-xl border border-border bg-primary/30 p-6">
            <h3 className="flex items-center gap-2 font-semibold text-foreground mb-4">
              <Calendar className="h-5 w-5 text-accent" /> Economic Calendar
            </h3>
            <div className="space-y-3">
              {economicEvents.map((e) => (
                <div key={e.event} className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                  <div>
                    <p className="text-foreground">{e.event}</p>
                    <p className="text-xs text-muted">{e.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${e.impact === "High" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>
                    {e.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <NewsletterSignup title="Weekly Market Report" source="research-hub" />
        </div>
      </div>
    </div>
  );
}
