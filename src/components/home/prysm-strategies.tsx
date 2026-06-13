"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { StrategyCard } from "@/components/shared/strategy-card";
import { Button } from "@/components/ui/button";
import { PRYSM_STRATEGIES } from "@/data/strategies";
import { REVEAL_VIEWPORT, revealDelay } from "@/lib/motion";

export function PrysmStrategies() {
  return (
    <section className="py-24 lg:py-32 bg-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Live Strategies"
          title="Prysm Blue · Gold · Green"
          description="Three institutional algorithmic capital deployment systems — each with verified live track records, dedicated tear sheets, and transparent risk controls."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mb-12">
          {PRYSM_STRATEGIES.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              className="h-full min-w-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ delay: revealDelay(index) }}
            >
              <StrategyCard strategy={strategy} featured={strategy.id === "green"} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/live-performance">
              Full Performance Overview
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="text-center text-xs text-muted/60 mt-8 max-w-3xl mx-auto">
          Past performance is not indicative of future results. All figures sourced from institutional
          tear sheets and live verified accounts. Prysm Green live data is available at{" "}
          <a
            href="https://green.prysmalgo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            green.prysmalgo.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
