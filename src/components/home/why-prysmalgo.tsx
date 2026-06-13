"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  Globe,
  FileText,
  Zap,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { features } from "@/data/content";
import { REVEAL_VIEWPORT, revealDelay } from "@/lib/motion";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Shield,
  Globe,
  FileText,
  Zap,
  Lock,
};

export function WhyPrysmAlgo() {
  return (
    <section className="py-24 lg:py-32 bg-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Why PrysmAlgo"
          title="Built for Institutional Standards"
          description="Every component of our platform is engineered to meet the rigorous demands of professional investors."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ delay: revealDelay(index) }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full group hover:border-accent/40 hover:shadow-glow-sm transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors mb-5">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
