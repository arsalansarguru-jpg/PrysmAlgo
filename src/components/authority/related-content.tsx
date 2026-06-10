import Link from "next/link";
import { ArrowRight, BookOpen, FileText, BarChart3, Calculator, Wrench } from "lucide-react";
import type { RelatedContentBundle } from "@/types/content";

interface Props {
  related: RelatedContentBundle;
  title?: string;
}

function LinkGroup({ icon: Icon, label, links }: { icon: React.ElementType; label: string; links: { href: string; label: string }[] }) {
  if (links.length === 0) return null;
  return (
    <div>
      <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-brand text-accent mb-3">
        <Icon className="h-4 w-4" /> {label}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors">
              <ArrowRight className="h-3 w-3 shrink-0" />
              <span className="line-clamp-1">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RelatedContent({ related, title = "Related Content" }: Props) {
  const hasContent = Object.values(related).some((arr) => arr.length > 0);
  if (!hasContent) return null;

  return (
    <aside className="mt-12 rounded-xl border border-border bg-primary/30 p-6 lg:p-8">
      <h3 className="font-display text-lg font-bold text-foreground mb-6">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <LinkGroup icon={BookOpen} label="Articles" links={related.articles} />
        <LinkGroup icon={FileText} label="Resources" links={related.resources} />
        <LinkGroup icon={BarChart3} label="Research" links={related.research} />
        <LinkGroup icon={BookOpen} label="Glossary" links={related.glossary} />
        <LinkGroup icon={Calculator} label="Tools" links={related.tools} />
        <LinkGroup icon={Wrench} label="Services" links={related.services} />
      </div>
    </aside>
  );
}
