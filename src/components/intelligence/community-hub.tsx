"use client";

import { useState } from "react";
import { MessageSquare, Users } from "lucide-react";
import { IntelligenceHeader } from "./intelligence-header";
import { COMMUNITY_POSTS, COMMUNITY_CATEGORIES } from "@/data/intelligence/community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CommunityHub() {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? COMMUNITY_POSTS : COMMUNITY_POSTS.filter((p) => p.category === category);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Investor Community"
          title="PrysmAlgo Community"
          description="Market discussions, research updates, weekly insights, and investor Q&A for qualified members."
          breadcrumb={{ name: "Community", path: "/community" }}
        />

        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setCategory("All")} className={`rounded-full px-3 py-1 text-xs border ${category === "All" ? "border-accent bg-accent/10 text-accent" : "border-border text-muted"}`}>All</button>
          {COMMUNITY_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1 text-xs border ${category === c ? "border-accent bg-accent/10 text-accent" : "border-border text-muted"}`}>{c}</button>
          ))}
        </div>

        <div className="space-y-4 mb-10">
          {filtered.map((post) => (
            <div key={post.id} className="rounded-xl border border-border bg-primary/30 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">{post.author}</span>
                <span className="text-[10px] text-muted">· {post.role}</span>
                <span className="text-[10px] text-accent ml-auto">{post.category}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
              <p className="text-sm text-muted">{post.content}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted">
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {post.replies} replies</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
          <h3 className="font-semibold text-foreground mb-4">Start a Discussion</h3>
          <Input placeholder="Title" className="mb-3" />
          <Textarea placeholder="Share your insights..." className="mb-3" />
          <Button>Post (Members Only)</Button>
        </div>
      </div>
    </div>
  );
}
