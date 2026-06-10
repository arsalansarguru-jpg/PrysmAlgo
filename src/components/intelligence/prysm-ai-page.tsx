"use client";

import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { IntelligenceHeader } from "./intelligence-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MembershipTiers } from "./membership-tiers";

const PRYSM_AI_RESPONSES: Record<string, string> = {
  performance: "Prysm Blue (+179.9%), Gold (+136.13%), and Green (+1,192%) have verified track records. Visit /transparency for full methodology.",
  risk: "Our five-tier risk framework includes trade filters, position limits, drawdown protection, emergency stops, and 24/5 monitoring. Max drawdowns: Blue -7.7%, Gold -2.3%, Green -9.16%.",
  report: "I can summarize any Research Institute report or Daily Briefing. Try asking about gold outlook or forex positioning.",
  education: "PrysmAlgo University offers 6 courses with certificates. Start with Algorithmic Trading 101 at /university.",
  default: "I'm Prysm AI, your research assistant. Ask about performance, risk metrics, reports, or educational content. For investment decisions, book a call at /book-call.",
};

function getAiResponse(input: string): string {
  const l = input.toLowerCase();
  if (l.includes("perform") || l.includes("return")) return PRYSM_AI_RESPONSES.performance;
  if (l.includes("risk") || l.includes("drawdown")) return PRYSM_AI_RESPONSES.risk;
  if (l.includes("report") || l.includes("research") || l.includes("briefing")) return PRYSM_AI_RESPONSES.report;
  if (l.includes("learn") || l.includes("course") || l.includes("university")) return PRYSM_AI_RESPONSES.education;
  return PRYSM_AI_RESPONSES.default;
}

export function PrysmAiPage() {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "I'm Prysm AI. I can explain reports, performance, risk metrics, and recommend educational content. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { role: "ai", text: getAiResponse(userMsg) }]), 500);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Prysm AI"
          title="AI Research Assistant"
          description="Explain reports, performance, risk metrics, and recommend educational content."
          breadcrumb={{ name: "Prysm AI", path: "/prysm-ai" }}
        />

        <div className="rounded-xl border border-accent/20 bg-primary/30 overflow-hidden mb-12">
          <div className="border-b border-border px-4 py-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Prysm AI</span>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm rounded-lg px-4 py-3 max-w-[85%] ${m.role === "ai" ? "bg-accent/10 text-foreground" : "bg-foreground/5 text-foreground ml-auto"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4 flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about performance, risk, research..." />
            <Button onClick={send}><Send className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {["Explain live performance", "Summarize risk framework", "Gold outlook today", "Recommend a course"].map((q) => (
            <button key={q} onClick={() => { setInput(q); }} className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:text-accent hover:border-accent/40 transition-colors">{q}</button>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6">Unlock Full Prysm AI with Professional</h2>
        <MembershipTiers />
      </div>
    </div>
  );
}
