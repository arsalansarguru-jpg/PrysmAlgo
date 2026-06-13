"use client";

import { motion } from "framer-motion";
import { Shield, Lock, BarChart3, Zap, Eye } from "lucide-react";
import { trustItems } from "@/data/content";
import { REVEAL_VIEWPORT, revealDelay } from "@/lib/motion";

const icons = [Shield, Lock, BarChart3, Zap, Eye];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-primary/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {trustItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ delay: revealDelay(index) }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {item}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
