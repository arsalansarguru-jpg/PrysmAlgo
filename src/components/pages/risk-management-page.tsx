"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Scale,
  AlertTriangle,
  Filter,
  PieChart,
  Layers,
  Activity,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { riskCards } from "@/data/content";
import { FOUNDER } from "@/lib/constants";

const sections = [
  {
    icon: Shield,
    title: "Risk Philosophy",
    content:
      "At PrysmAlgo, capital preservation is not a feature — it is the foundation. Our risk philosophy prioritizes survival and consistency over aggressive return targets. Every trading decision passes through multiple validation layers before execution, ensuring that no single trade or market event can materially impair investor capital.",
  },
  {
    icon: Scale,
    title: "Position Sizing",
    content:
      "Our proprietary position sizing engine calculates optimal trade size based on account equity, current volatility, correlation with existing positions, and predefined risk parameters. Maximum risk per trade is capped at 1.5% of portfolio value, with dynamic adjustment during elevated volatility regimes.",
  },
  {
    icon: AlertTriangle,
    title: "Maximum Drawdown Control",
    content:
      "Automated drawdown protection protocols activate at predefined thresholds. At -5% drawdown, position sizes are reduced by 50%. At -8% drawdown, all new positions are halted and existing exposure is systematically reduced. Full strategy review is triggered before resumption.",
  },
  {
    icon: Filter,
    title: "Emergency Stops",
    content:
      "Circuit breaker systems monitor real-time market conditions, portfolio exposure, and system health. Emergency stops can be triggered by abnormal volatility spikes, liquidity deterioration, correlation breakdowns, or technical infrastructure anomalies.",
  },
  {
    icon: Filter,
    title: "Trade Filtering",
    content:
      "Every potential trade passes through a multi-factor filter including liquidity assessment, spread analysis, news event proximity, correlation impact, and risk-reward validation. Trades failing any criterion are automatically rejected regardless of signal strength.",
  },
  {
    icon: PieChart,
    title: "Capital Allocation",
    content:
      "Dynamic capital allocation distributes risk budget across strategies and asset classes based on current market regime, strategy performance, and correlation matrix. Underperforming strategies receive reduced allocation while maintaining overall portfolio diversification.",
  },
  {
    icon: Layers,
    title: "Portfolio Diversification",
    content:
      "Positions are diversified across uncorrelated instruments, timeframes, and strategy types. Maximum correlation between any two positions is limited to 0.6, and no single asset class may exceed 40% of total portfolio exposure.",
  },
  {
    icon: Eye,
    title: "Monitoring Systems",
    content:
      "24/5 real-time monitoring infrastructure tracks every open position, pending order, and risk metric. Automated alerts notify the risk team of threshold breaches, and a dedicated operations center maintains oversight during all market hours.",
  },
];

export function RiskManagementPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Risk Management"
          title="Institutional Risk Framework"
          description="A comprehensive, multi-layered approach to capital preservation and disciplined risk control."
          align="left"
        />

        <ScrollReveal className="mb-16">
          <Card className="border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
            <CardContent className="p-8 lg:p-12">
              <blockquote className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed">
                &ldquo;The first rule of investing is don&apos;t lose money. The second rule is don&apos;t
                forget the first rule. Our entire infrastructure is built around this principle.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-muted">— {FOUNDER.name}, {FOUNDER.title}</p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {riskCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Activity className="h-5 w-5 text-accent" />
                    <span className="text-lg font-bold text-accent">{card.value}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <ScrollReveal key={section.title} delay={index * 0.05}>
                <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {section.title}
                    </h3>
                    <p className="text-muted leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-16">
          <Card>
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-xl font-semibold text-foreground mb-8 text-center">
                Risk Architecture Diagram
              </h3>
              <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
                {[
                  "Market Data Input",
                  "Signal Generation",
                  "Trade Filter Validation",
                  "Position Sizing Engine",
                  "Portfolio Exposure Check",
                  "Execution with Risk Limits",
                  "Real-Time Monitoring",
                  "Emergency Stop Layer",
                ].map((step, index) => (
                  <div key={step} className="w-full">
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-primary/50 p-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground">{step}</span>
                    </div>
                    {index < 7 && (
                      <div className="flex justify-center py-1">
                        <div className="h-4 w-px bg-accent/30" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
