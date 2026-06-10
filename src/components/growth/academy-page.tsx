"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { blogArticles } from "@/data/blog-articles";
import { ACADEMY_CATEGORIES, ACADEMY_CATEGORY_MAP } from "@/data/academy";
import { NewsletterSignup } from "./newsletter-signup";
import { cn } from "@/lib/utils";

export function AcademyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return blogArticles.filter((a) => {
      const catMatch =
        category === "All" ||
        (ACADEMY_CATEGORY_MAP[category] ?? []).includes(a.category);
      const searchMatch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [search, category]);

  const featured = blogArticles.slice(0, 3);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Academy", path: "/academy" }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">Investor Academy</h1>
        <p className="text-lg text-muted max-w-3xl mb-8">Professional education on algorithmic trading, AI investing, risk management, and institutional finance.</p>

        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {["All", ...ACADEMY_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wide transition-colors",
                category === cat ? "bg-accent text-white dark:text-primary" : "bg-primary/50 text-muted border border-border hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Featured</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featured.map((a) => (
            <Link key={a.slug} href={`/academy/${a.slug}`} className="group rounded-xl border border-accent/20 bg-accent/5 p-6 hover:border-accent/40 transition-colors">
              <span className="text-[10px] uppercase tracking-brand text-accent">{a.category}</span>
              <h3 className="font-semibold text-foreground mt-2 group-hover:text-accent transition-colors line-clamp-2">{a.title}</h3>
              <p className="text-xs text-muted mt-2 line-clamp-2">{a.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {filtered.slice(0, 24).map((a) => (
            <Link key={a.slug} href={`/academy/${a.slug}`} className="group rounded-xl border border-border bg-primary/30 p-5 hover:border-accent/30 transition-colors">
              <span className="text-[10px] text-accent">{a.category}</span>
              <h3 className="text-sm font-semibold text-foreground mt-1 group-hover:text-accent line-clamp-2">{a.title}</h3>
              <span className="flex items-center gap-1 text-xs text-muted mt-2">Read <ArrowRight className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>

        <NewsletterSignup source="academy" />
      </div>
    </div>
  );
}
