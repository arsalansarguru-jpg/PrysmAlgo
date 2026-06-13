"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiveAnimationProps {
  /** Path to a .riv asset, e.g. /motion/rive/nav-states.riv */
  src?: string;
  /** Optional Rive state machine name. */
  stateMachine?: string;
  className?: string;
  /** Custom fallback; defaults to a subtle institutional pulse. */
  fallback?: ReactNode;
  "aria-label"?: string;
}

/**
 * Rive scaffold for navigation states, the investor journey timeline, dashboard
 * metrics and the assessment flow. Renders a tasteful Framer fallback until a
 * `.riv` asset + SDK are wired in.
 *
 * ── To enable real Rive assets ─────────────────────────────────────────────
 * 1. npm i @rive-app/react-canvas
 * 2. const { RiveComponent } = useRive({ src, stateMachines: stateMachine,
 *      autoplay: true, layout: new Layout({ fit: Fit.Contain }) });
 *    if (src) return <RiveComponent className={className} />;
 * 3. Place authored assets in /public/motion/rive (see docs).
 */
export function RiveAnimation({
  src,
  stateMachine,
  className,
  fallback,
  "aria-label": ariaLabel,
}: RiveAnimationProps) {
  void src;
  void stateMachine;
  return (
    <div className={cn("relative flex items-center justify-center", className)} aria-label={ariaLabel}>
      {fallback ?? (
        <motion.span
          aria-hidden
          className="block h-3 w-3 rounded-full bg-accent"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
