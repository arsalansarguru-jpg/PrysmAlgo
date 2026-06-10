import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

interface Props {
  label: string;
  title: string;
  description: string;
  breadcrumb: { name: string; path: string };
  cta?: { href: string; label: string };
}

export function IntelligenceHeader({ label, title, description, breadcrumb, cta }: Props) {
  return (
    <div className="mb-10">
      <Breadcrumbs items={[breadcrumb]} />
      <span className="text-xs font-medium uppercase tracking-brand text-accent">{label}</span>
      <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-4">{title}</h1>
      <p className="text-lg text-muted max-w-3xl">{description}</p>
      {cta && (
        <Link href={cta.href} className="inline-flex items-center gap-2 text-sm text-accent hover:underline mt-4">
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
