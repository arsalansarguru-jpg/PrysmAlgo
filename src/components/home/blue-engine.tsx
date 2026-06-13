"use client";

import { motion } from "framer-motion";
import { Cpu, Shield, Search, Zap, PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { blueEngineComponents } from "@/data/content";
import { REVEAL_VIEWPORT, revealDelay } from "@/lib/motion";

const icons = [Cpu, Shield, Search, Zap, PieChart];

export function BlueEngine() {
  return (
    <section className="py-24 lg:py-32 bg-primary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Technology"
          title="The Blue Engine"
          description="Proprietary AI infrastructure powering Prysm Blue, Gold, and Green — five integrated systems delivering institutional-grade execution across forex, commodities, and US equities."
        />

        <div className="grid lg:grid-cols-5 gap-4 mb-12">
          {blueEngineComponents.map((component, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ delay: revealDelay(index) }}
              >
                <Card className="h-full hover:border-accent/40 transition-all group">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 group-hover:shadow-glow-sm transition-all mb-4">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">
                      {component.title}
                    </h3>
                    <p className="text-xs text-muted mb-3 leading-relaxed">
                      {component.description}
                    </p>
                    <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {component.metric}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          className="rounded-2xl border border-border bg-primary/80 backdrop-blur-xl p-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider">System Status</h4>
              {["AI Engine", "Risk Layer", "Execution"].map((system) => (
                <div key={system} className="flex items-center justify-between">
                  <span className="text-sm text-muted">{system}</span>
                  <span className="flex items-center gap-2 text-xs text-success">
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    Operational
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider">Live Metrics</h4>
              {[
                { label: "Signals Today", value: "24" },
                { label: "Avg Execution", value: "3.2ms" },
                { label: "Risk Utilization", value: "62%" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted">{m.label}</span>
                  <span className="text-sm font-medium text-foreground">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider">Coverage</h4>
              {[
                { label: "Markets", value: "42" },
                { label: "Timeframes", value: "6" },
                { label: "Uptime", value: "99.97%" },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted">{m.label}</span>
                  <span className="text-sm font-medium text-foreground">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
