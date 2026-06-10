"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-primary/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Button asChild size="sm" className="flex-1">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a href={SITE_CONFIG.calendly} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-3 w-3" />
                Book Call
              </a>
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="rounded-md p-1 text-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
