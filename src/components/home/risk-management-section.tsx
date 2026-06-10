"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, AlertTriangle, Activity, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { riskCards } from "@/data/content";

export function RiskManagementSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Risk Management"
          title="Institutional Risk Framework"
          description="Multi-layered protection systems designed to preserve capital and maintain disciplined exposure across all market conditions."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {riskCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full hover:border-accent/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Shield className="h-5 w-5 text-accent" />
                    <span className="text-lg font-bold text-accent">{card.value}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-primary/50 p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Risk Protection Infographic
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Our five-tier risk architecture operates continuously, from individual trade
                validation through portfolio-level exposure management to system-wide emergency protocols.
              </p>
              <Button asChild variant="outline">
                <Link href="/risk-management">
                  Explore Risk Framework
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {[
                { tier: "Tier 5", label: "Emergency Stop Systems", icon: AlertTriangle, color: "text-red-400" },
                { tier: "Tier 4", label: "Drawdown Protection", icon: Shield, color: "text-orange-400" },
                { tier: "Tier 3", label: "Portfolio Exposure Limits", icon: Activity, color: "text-yellow-400" },
                { tier: "Tier 2", label: "Position Sizing Engine", icon: Shield, color: "text-accent" },
                { tier: "Tier 1", label: "Trade Filter & Validation", icon: Shield, color: "text-success" },
              ].map((tier, index) => {
                const Icon = tier.icon;
                return (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 rounded-lg border border-border bg-background/50 p-4"
                    style={{ marginLeft: `${index * 12}px` }}
                  >
                    <Icon className={`h-5 w-5 ${tier.color} shrink-0`} />
                    <div className="flex-1">
                      <span className="text-xs text-muted">{tier.tier}</span>
                      <p className="text-sm font-medium text-foreground">{tier.label}</p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
