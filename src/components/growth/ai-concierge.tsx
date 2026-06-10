"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/webhooks/submit-lead";

const FAQ_RESPONSES: Record<string, string> = {
  onboarding:
    "Qualified investors complete a 4-step application, KYC/AML verification, and broker connection. Onboarding typically takes 5–10 business days.",
  risk: "PrysmAlgo employs drawdown protection, position limits, emergency stops, and 24/5 monitoring across all strategies.",
  performance:
    "Prysm Blue (forex), Prysm Gold (gold), and Prysm Green (US equities) each have verified live track records. Visit /live-performance for details.",
  fees: "Performance-based fee model aligned with investor interests. Fee structures are disclosed during the application process.",
  default:
    "Thank you for your inquiry. Book a strategy call at /book-call or complete our investor assessment at /investor-assessment.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("onboard") || lower.includes("apply") || lower.includes("start")) return FAQ_RESPONSES.onboarding;
  if (lower.includes("risk") || lower.includes("drawdown")) return FAQ_RESPONSES.risk;
  if (lower.includes("perform") || lower.includes("return")) return FAQ_RESPONSES.performance;
  if (lower.includes("fee") || lower.includes("minimum")) return FAQ_RESPONSES.fees;
  return FAQ_RESPONSES.default;
}

function getSessionId() {
  if (typeof window === "undefined") return "server";
  let id = sessionStorage.getItem("prysm-concierge-session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("prysm-concierge-session", id);
  }
  return id;
}

export function AiConcierge() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const sessionId = useRef(getSessionId());
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Welcome to PrysmAlgo Investor Concierge. Ask about onboarding, risk, performance, or fees." },
  ]);

  useEffect(() => {
    if (messages.length <= 2) return;
    fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId.current,
        messages: messages.map((m) => ({ role: m.role, content: m.text, timestamp: new Date().toISOString() })),
        email: email || undefined,
      }),
    }).catch(() => null);
  }, [messages, email]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const next = [...messages, { role: "user" as const, text: userMsg }];
    setMessages(next);
    setInput("");
    if (next.filter((m) => m.role === "user").length >= 2 && !email) {
      setShowEmailCapture(true);
    }
    setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: getResponse(userMsg) }]);
    }, 600);
  };

  const captureEmail = async () => {
    if (!email.trim()) return;
    await submitLead({ source: "ai-concierge", email, consent_marketing: true });
    setShowEmailCapture(false);
    setMessages((m) => [...m, { role: "bot", text: "Thank you. A team member will follow up shortly." }]);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand shadow-glow text-white md:bottom-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open investor concierge"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-border bg-primary shadow-2xl overflow-hidden md:bottom-24"
          >
            <div className="flex items-center justify-between border-b border-border bg-primary/80 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Investor Concierge</p>
                <p className="text-xs text-muted">AI-assisted · PrysmAlgo</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                    msg.role === "bot" ? "bg-accent/10 text-foreground" : "bg-foreground/5 text-foreground ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {showEmailCapture && (
              <div className="border-t border-border px-3 py-2 bg-accent/5">
                <p className="text-xs text-muted mb-2">Share your email for personalized follow-up:</p>
                <div className="flex gap-2">
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="text-sm h-8" />
                  <Button size="sm" onClick={captureEmail}>Send</Button>
                </div>
              </div>
            )}

            <div className="border-t border-border p-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask a question..."
                  className="text-sm"
                />
                <Button size="icon" onClick={send} aria-label="Send">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1 text-xs">
                  <Link href="/book-call"><Calendar className="h-3 w-3" /> Book Call</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 text-xs">
                  <Link href="/apply">Apply</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
