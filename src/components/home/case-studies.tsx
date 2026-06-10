"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { MiniSparkline } from "@/components/charts/mini-sparkline";
import { caseStudies } from "@/data/content";
import { formatCurrency } from "@/lib/utils";

const sparklines = [
  [100, 105, 108, 112, 118, 122, 128, 134],
  [100, 103, 107, 110, 115, 120, 125, 129],
  [100, 104, 106, 110, 114, 118, 120, 122],
];

export function CaseStudies() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Case Studies"
          title="Investor Success Stories"
          description="Representative portfolio outcomes demonstrating our approach across different risk profiles and capital levels."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="h-full hover:border-accent/30 transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {study.riskProfile}
                    </span>
                    <span className="text-sm text-muted">{study.duration}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">{study.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">{study.description}</p>

                  <div className="mb-6">
                    <MiniSparkline data={sparklines[index]} height={60} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted">Starting Capital</p>
                      <p className="text-sm font-semibold text-foreground">
                        {formatCurrency(study.startingCapital)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Portfolio Growth</p>
                      <p className="text-sm font-semibold text-success">+{study.growth}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted/60 mt-8 max-w-2xl mx-auto">
          Case studies are illustrative examples. Individual results vary based on risk parameters,
          market conditions, and capital allocation. Past performance is not indicative of future results.
        </p>
      </div>
    </section>
  );
}
