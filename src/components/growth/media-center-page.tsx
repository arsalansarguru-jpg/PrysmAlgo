import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { pressMentions, podcasts, events } from "@/data/media";
import { Mic, Newspaper, Calendar } from "lucide-react";

export function MediaCenterPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Media", path: "/media" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Media Center</h1>
        <p className="text-lg text-muted max-w-3xl mb-16">Press coverage, podcasts, and speaking engagements from PrysmAlgo.</p>

        <Section icon={Newspaper} title="Press Mentions" items={pressMentions.map((p) => ({ title: p.title, meta: `${p.outlet} · ${p.date}`, type: p.type }))} />
        <Section icon={Mic} title="Podcasts" items={podcasts.map((p) => ({ title: p.title, meta: `${p.show} · ${p.duration}`, type: "Podcast" }))} />
        <Section icon={Calendar} title="Events & Speaking" items={events.map((e) => ({ title: e.name, meta: `${e.location} · ${e.date}`, type: e.role }))} />
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, items }: { icon: typeof Newspaper; title: string; items: { title: string; meta: string; type: string }[] }) {
  return (
    <section className="mb-16">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground mb-6">
        <Icon className="h-5 w-5 text-accent" /> {title}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/20 transition-colors">
            <span className="text-[10px] uppercase tracking-brand text-accent">{item.type}</span>
            <h3 className="font-semibold text-foreground mt-2 mb-1">{item.title}</h3>
            <p className="text-xs text-muted">{item.meta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
