"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FounderProfile } from "@/components/shared/founder-profile";
import { FOUNDER } from "@/lib/constants";

export function FounderStory() {
  return (
    <section className="py-24 lg:py-32 bg-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <FounderProfile />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <p className="text-sm font-medium uppercase tracking-widest text-accent mb-3">
              Founder Story
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Built by Practitioners, for Investors
            </h2>

            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                {FOUNDER.name} founded PrysmAlgo after fifteen years in quantitative finance,
                including roles at tier-one investment banks and systematic hedge funds. Witnessing
                firsthand how retail-focused trading services failed serious investors, he set out to
                build technology that meets institutional standards.
              </p>
              <p>
                <strong className="text-foreground">Mission:</strong> Democratize access to
                institutional-grade algorithmic trading while maintaining the capital preservation
                and risk discipline that professional investors demand.
              </p>
              <p>
                <strong className="text-foreground">Vision:</strong> To become the trusted technology
                partner for allocators worldwide, setting the standard for transparency, risk management,
                and consistent performance in algorithmic trading.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-3 gap-6"
            >
              {[
                { value: "$2.4B+", label: "Assets Managed" },
                { value: "180+", label: "Institutional Clients" },
                { value: "5 Years", label: "Track Record" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
