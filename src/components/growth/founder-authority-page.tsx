import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FounderProfile } from "@/components/shared/founder-profile";
import { Button } from "@/components/ui/button";
import { founderPageData } from "@/data/founder-page";
import { SITE_CONFIG } from "@/lib/constants";

export function FounderAuthorityPage() {
  const f = founderPageData;
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Founder", path: "/founder" }]} />
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <FounderProfile showBio showExperienceBadge />
          <div>
            <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">{f.name}</h1>
            <p className="text-accent font-medium mb-6">{f.title} · {f.experience} Experience</p>
            <p className="text-muted leading-relaxed mb-8">{f.journey}</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-brand text-accent mb-2">Mission</h3>
                <p className="text-muted text-sm leading-relaxed">{f.mission}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-brand text-accent mb-2">Vision</h3>
                <p className="text-muted text-sm leading-relaxed">{f.vision}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-8">Professional Timeline</h2>
          <div className="space-y-0 border-l border-border ml-4">
            {f.timeline.map((item) => (
              <div key={item.year} className="relative pl-8 pb-10">
                <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-accent" />
                <span className="text-xs font-bold text-accent">{item.year}</span>
                <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">Achievements</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {f.achievements.map((a) => (
              <li key={a} className="rounded-lg border border-border bg-primary/30 px-4 py-3 text-sm text-muted">{a}</li>
            ))}
          </ul>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">Thought Leadership</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {f.thoughtLeadership.map((t) => (
              <div key={t.title} className="rounded-xl border border-border bg-primary/30 p-5">
                <span className="text-[10px] uppercase tracking-brand text-accent">{t.type} · {t.date}</span>
                <h3 className="font-semibold text-foreground mt-1">{t.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">Speak with {f.name.split(" ")[0]}</h3>
          <p className="text-sm text-muted mb-6">Schedule a strategy consultation with our founder and leadership team.</p>
          <Button asChild>
            <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer">
              Book Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
