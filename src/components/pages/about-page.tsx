"use client";

import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Cpu, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { FounderProfile } from "@/components/shared/founder-profile";

const timeline = [
  { year: "2019", event: "PrysmAlgo founded with focus on institutional algorithmic trading" },
  { year: "2020", event: "Blue Engine v1.0 deployed with initial investor cohort" },
  { year: "2021", event: "Multi-market expansion across forex, indices, and commodities" },
  { year: "2022", event: "Institutional risk framework v2.0 with drawdown protection" },
  { year: "2023", event: "Surpassed $1B in assets under management" },
  { year: "2024", event: "AI decision engine upgrade with neural network ensemble" },
  { year: "2025", event: "Global expansion with 180+ institutional client relationships" },
  { year: "2026", event: "Blue Engine v3.0 with enhanced portfolio optimization" },
];

export function AboutPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="About"
          title="Institutional Trading Technology"
          description="PrysmAlgo was founded to bridge the gap between institutional-grade algorithmic trading and serious private investors."
          align="left"
        />

        <ScrollReveal className="mb-16">
          <div className="max-w-none text-muted leading-relaxed">
            <p className="text-lg text-muted leading-relaxed">
              PrysmAlgo is a quantitative investment technology company specializing in
              AI-powered algorithmic trading systems for qualified institutional and
              high-net-worth investors. Unlike retail signal services, we provide complete
              trading infrastructure — from signal generation through execution and reporting —
              with institutional risk controls at every layer.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Target,
              title: "Mission",
              content:
                "Democratize access to institutional-grade algorithmic trading while maintaining the capital preservation and risk discipline that professional investors demand.",
            },
            {
              icon: Eye,
              title: "Vision",
              content:
                "To become the trusted technology partner for allocators worldwide, setting the standard for transparency and consistent performance.",
            },
            {
              icon: Lightbulb,
              title: "Investment Philosophy",
              content:
                "Capital preservation first, consistent compounding second, aggressive growth never at the expense of risk discipline.",
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <Icon className="h-8 w-8 text-accent mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mb-16">
          <Card>
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="h-8 w-8 text-accent" />
                <h3 className="text-2xl font-semibold text-foreground">Technology Overview</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8 text-muted leading-relaxed">
                <p>
                  The Blue Engine is our proprietary trading infrastructure comprising five
                  integrated systems: an AI decision engine using neural network ensembles,
                  a real-time risk layer, multi-market scanner, low-latency execution engine,
                  and dynamic portfolio optimizer.
                </p>
                <p>
                  Built over five years by quantitative finance practitioners, the system
                  processes millions of data points daily across 40+ instruments and six
                  timeframes, executing with sub-5ms latency through regulated brokerage
                  infrastructure.
                </p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <ScrollReveal direction="left">
            <FounderProfile showBio showExperienceBadge={false} />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-semibold text-foreground">Leadership Team</h3>
            </div>
            <div className="space-y-6">
              {[
                { name: "Dr. Sarah Chen", role: "Chief Technology Officer", bio: "PhD Computer Science, former Google AI researcher" },
                { name: "Michael Torres", role: "Chief Risk Officer", bio: "20 years risk management at global hedge funds" },
                { name: "Rachel Kim", role: "Head of Investor Relations", bio: "Former institutional sales at Goldman Sachs AM" },
              ].map((member) => (
                <div key={member.name} className="border-l-2 border-accent/30 pl-4">
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-accent">{member.role}</p>
                  <p className="text-sm text-muted mt-1">{member.bio}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">Company Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-accent/20 md:-translate-x-px" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                    <span className="text-accent font-bold">{item.year}</span>
                    <p className="text-sm text-muted mt-1">{item.event}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 border border-accent/30 z-10">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
