"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function FinalCta() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-success/5" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Explore Institutional AI Trading?
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Join qualified investors who trust PrysmAlgo for disciplined, automated execution
            with institutional-grade risk management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/apply">
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-5 w-5" />
                Book Consultation
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
