import type { Variants, Transition } from "framer-motion";

/**
 * PrysmAlgo V8 — Institutional Motion Token System
 *
 * A single source of truth for every animation in the product. The goal is a
 * calm, precise, "infrastructure-grade" feel (Stripe / Linear / Vercel /
 * BlackRock) — never flashy, never casino/crypto. Motion communicates
 * intelligence, stability and risk-awareness.
 *
 * Rules of thumb:
 *  - Entrances are slow-out (decelerate), short distance (8–40px), low opacity delta.
 *  - Ambient/background motion is near-imperceptible and very long (12s+).
 *  - Hover/press feedback is fast (120–260ms) and subtle (≤4px, ≤3% scale).
 *  - Everything must honor `prefers-reduced-motion`.
 */

/** Cubic-bezier easing curves tuned for institutional, decelerating motion. */
export const EASING = {
  /** Default decelerate — content settling into place. */
  standard: [0.22, 1, 0.36, 1],
  /** Crisp entrance with a longer tail. */
  entrance: [0.16, 1, 0.3, 1],
  /** Emphasized in/out for state changes. */
  emphasized: [0.4, 0, 0.2, 1],
  /** Gentle, symmetric — for ambient loops. */
  ambient: [0.45, 0, 0.55, 1],
} as const;

/** Durations in seconds. */
export const DURATION = {
  micro: 0.16,
  fast: 0.28,
  base: 0.6,
  slow: 0.9,
  ambient: 18,
} as const;

/** Distances in pixels for reveal translations. */
export const DISTANCE = {
  sm: 12,
  md: 24,
  lg: 40,
} as const;

export const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASING.standard,
};

/** Reveal variants — pair with `whileInView` + REVEAL_VIEWPORT. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

/** Subtle scale — for cards / media that should feel like they "focus" in. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

/** Depth — combines blur + scale for an Apple-Vision-Pro style emergence. */
export const depthIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASING.entrance },
  },
};

/** Stagger container — children should use one of the reveal variants above. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Premium hover/press feedback for interactive surfaces. */
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01, transition: { duration: DURATION.fast, ease: EASING.emphasized } },
  tap: { scale: 0.99, transition: { duration: DURATION.micro } },
} as const;
