"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/seo/lead-capture-form";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || typeof window === "undefined") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.scrollY > 400) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [dismissed]);

  const close = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-lg w-full rounded-2xl border border-border bg-primary p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <Download className="h-10 w-10 text-accent mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Before You Go</h2>
            <p className="text-sm text-muted mb-6">
              Download our free Institutional Investor Guide and learn how qualified investors evaluate algorithmic trading.
            </p>
            <LeadCaptureForm
              title="Get Free Access"
              description="Enter your email to receive the guide instantly."
              resourceName="Institutional Investor Guide"
              variant="inline"
            />
            <div className="mt-4 flex gap-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href="/investor-assessment">Take Assessment</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
