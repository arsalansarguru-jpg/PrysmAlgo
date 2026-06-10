"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { BLOG_CATEGORIES, getArticlesByCategory } from "@/data/blog-articles";
import { cn } from "@/lib/utils";

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = getArticlesByCategory(activeCategory);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Blog"
          title="Insights & Research"
          description="Expert analysis on algorithmic trading, AI investing, risk management, and institutional finance."
          align="left"
        />

        <div className="flex flex-wrap gap-2 mb-12">
          {["All", ...BLOG_CATEGORIES].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium uppercase tracking-brand transition-all",
                activeCategory === category
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "text-muted hover:text-foreground border border-transparent hover:border-border"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted mb-8">{filtered.length} articles</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.slice(0, 24).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.5) }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full group hover:border-accent/30 transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-primary rounded-t-xl flex items-center justify-center">
                      <span className="text-accent/30 text-2xl font-bold uppercase tracking-brand">
                        {post.category.charAt(0)}
                      </span>
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-medium uppercase tracking-brand text-accent">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>{post.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length > 24 && (
          <p className="text-center text-sm text-muted mt-12">
            Showing 24 of {filtered.length} articles. Use category filters to explore more.
          </p>
        )}
      </div>
    </div>
  );
}
