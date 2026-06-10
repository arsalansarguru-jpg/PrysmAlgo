"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Calendar } from "lucide-react";
import { CapitalHeader } from "./capital-header";
import { IR_CATEGORY_LABELS, type IrCategory, type IrCommunication } from "@/types/capital-v7";

export function IrCenter() {
  const [comms, setComms] = useState<IrCommunication[]>([]);
  const [filter, setFilter] = useState<IrCategory | "all">("all");

  useEffect(() => {
    fetch("/api/v1/ir").then((r) => r.json()).then((d) => setComms(d.communications ?? []));
  }, []);

  const filtered = filter === "all" ? comms : comms.filter((c) => c.category === filter);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Investor Relations"
          title="Investor Relations Center"
          description="Quarterly letters, monthly updates, performance commentary, CEO letters, and archived investor communications."
          breadcrumb={{ name: "IR Center", path: "/ir" }}
        />

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setFilter("all")} className={`px-3 py-1.5 rounded-full text-xs border ${filter === "all" ? "border-accent bg-accent/10 text-accent" : "border-border text-muted"}`}>All</button>
          {(Object.keys(IR_CATEGORY_LABELS) as IrCategory[]).map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-full text-xs border ${filter === cat ? "border-accent bg-accent/10 text-accent" : "border-border text-muted"}`}>
              {IR_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <Link key={c.slug} href={`/ir/${c.slug}`} className="rounded-xl border border-border bg-primary/30 p-6 hover:border-accent/30 transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-accent">{IR_CATEGORY_LABELS[c.category]}</span>
                  <h3 className="font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">{c.title}</h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{c.summary}</p>
                </div>
                <FileText className="h-5 w-5 text-muted shrink-0" />
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted">
                <Calendar className="h-3 w-3" />
                {new Date(c.publishedAt).toLocaleDateString()} · {c.author}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
