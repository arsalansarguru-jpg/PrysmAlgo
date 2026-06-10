"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES } from "@/data/glossary";
import { NewsletterSignup } from "@/components/growth/newsletter-signup";

export function GlossaryIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchCat = category === "All" || t.category === category;
      const q = query.toLowerCase();
      const matchQuery = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, category]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const t of filtered) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-medium uppercase tracking-brand text-accent">Investor Glossary</span>
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
          500+ Institutional Trading Terms
        </h1>
        <p className="text-lg text-muted max-w-3xl mb-8">
          SEO-optimized definitions for algorithmic trading, risk management, forex, gold, and quantitative investing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input placeholder="Search terms..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10" />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
          >
            <option value="All">All Categories</option>
            {GLOSSARY_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-muted mb-6">{filtered.length} terms</p>

        <div className="space-y-10">
          {grouped.map(([letter, terms]) => (
            <section key={letter}>
              <h2 className="text-2xl font-bold text-accent mb-4 border-b border-border pb-2">{letter}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {terms.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/glossary/${t.slug}`}
                    className="rounded-lg border border-border p-4 hover:border-accent/40 transition-colors"
                  >
                    <p className="font-medium text-foreground">{t.term}</p>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{t.definition}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <NewsletterSignup source="glossary" title="Weekly Market Insights" />
        </div>
      </div>
    </div>
  );
}
