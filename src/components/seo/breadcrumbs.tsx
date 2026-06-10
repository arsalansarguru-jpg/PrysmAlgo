import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./json-ld";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schemas";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(allItems)} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-muted uppercase tracking-brand">
          {allItems.map((item, index) => (
            <li key={item.path} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3 w-3 text-muted/50" />}
              {index === allItems.length - 1 ? (
                <span className="text-accent">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-accent transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
