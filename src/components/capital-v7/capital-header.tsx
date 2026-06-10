import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CapitalHeaderProps {
  label: string;
  title: string;
  description: string;
  breadcrumb?: { name: string; path: string };
}

export function CapitalHeader({ label, title, description, breadcrumb }: CapitalHeaderProps) {
  return (
    <div className="mb-10">
      {breadcrumb && (
        <nav className="flex items-center gap-1 text-xs text-muted mb-4">
          <Link href="/ir" className="hover:text-accent">Capital Platform</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{breadcrumb.name}</span>
        </nav>
      )}
      <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">{label}</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">{title}</h1>
      <p className="text-muted max-w-3xl leading-relaxed">{description}</p>
    </div>
  );
}
