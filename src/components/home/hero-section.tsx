"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniSparkline } from "@/components/charts/mini-sparkline";
import { headlineMetrics } from "@/data/performance";

const sparkData = [100, 102, 101, 105, 108, 107, 112, 115, 114, 118, 120, 124];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-dark/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-accent uppercase tracking-wider">
                Institutional Grade
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              AI-Powered Algorithmic Trading Built for{" "}
              <span className="text-gradient">Serious Investors</span>
            </h1>

            <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
              Institutional-grade trading systems designed to prioritize capital preservation,
              disciplined risk management, and long-term consistency.
            </p>

            <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-4">
              <Button asChild size="lg" className="h-12 w-full px-4 text-xs sm:text-sm normal-case tracking-wide">
                <Link href="/book-call" className="inline-flex w-full items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Book Investor Call</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 w-full px-4 text-xs sm:text-sm normal-case tracking-wide">
                <Link href="/live-performance" className="inline-flex w-full items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 shrink-0" />
                  <span>View Performance</span>
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-12 w-full px-4 text-xs sm:text-sm normal-case tracking-wide sm:col-span-2 xl:col-span-1">
                <Link href="/apply" className="inline-flex w-full items-center justify-center gap-2">
                  <span>Apply Now</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-accent/20 bg-primary/80 backdrop-blur-xl p-6 shadow-glow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">Portfolio Value</p>
                  <p className="text-2xl font-bold text-foreground">$1.184M</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">YTD Return</p>
                  <p className="text-lg font-semibold text-success">+18.4%</p>
                </div>
              </div>

              <div className="mb-6">
                <MiniSparkline data={sparkData} height={120} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Sharpe Ratio", value: headlineMetrics.sharpeRatio.toFixed(2) },
                  { label: "Max Drawdown", value: `${headlineMetrics.maxDrawdown.toFixed(1)}%` },
                  { label: "Win Rate", value: `${headlineMetrics.winRate.toFixed(1)}%` },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-lg bg-background/50 p-3 border border-border">
                    <p className="text-[10px] text-muted uppercase tracking-wider">{metric.label}</p>
                    <p className="text-sm font-semibold text-foreground mt-1">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted">Live monitoring active — 24/5</span>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 rounded-lg border border-border bg-primary/90 backdrop-blur-xl p-3 shadow-card hidden sm:block"
            >
              <p className="text-[10px] text-muted">Risk Score</p>
              <p className="text-lg font-bold text-success">Low</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 rounded-lg border border-border bg-primary/90 backdrop-blur-xl p-3 shadow-card hidden sm:block"
            >
              <p className="text-[10px] text-muted">Active Positions</p>
              <p className="text-lg font-bold text-accent">8</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
