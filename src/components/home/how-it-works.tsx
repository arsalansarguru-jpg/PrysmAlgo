"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { howItWorks } from "@/data/content";
import { REVEAL_VIEWPORT, revealDelay } from "@/lib/motion";

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Process"
          title="How It Works"
          description="A streamlined onboarding process designed for qualified institutional and high-net-worth investors."
        />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ delay: revealDelay(index) }}
                className="relative md:flex items-start gap-8 md:pb-12 last:pb-0"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10 border border-accent/30 text-accent font-bold text-xl z-10">
                  {step.step}
                </div>
                <div className="mt-2 md:mt-0 md:pt-3">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
