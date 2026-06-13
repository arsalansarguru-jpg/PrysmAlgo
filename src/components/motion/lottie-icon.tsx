"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Microscope,
  Eye,
  Lock,
  LayoutDashboard,
  GraduationCap,
  Users,
  Handshake,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type MotionIconName =
  | "performance"
  | "risk"
  | "research"
  | "transparency"
  | "security"
  | "portal"
  | "academy"
  | "community"
  | "partners"
  | "trust";

const ICONS: Record<MotionIconName, LucideIcon> = {
  performance: Activity,
  risk: ShieldCheck,
  research: Microscope,
  transparency: Eye,
  security: Lock,
  portal: LayoutDashboard,
  academy: GraduationCap,
  community: Users,
  partners: Handshake,
  trust: BadgeCheck,
};

interface LottieIconProps {
  name: MotionIconName;
  /** Path to a .json/.lottie asset; when wired, replaces the SVG fallback. */
  src?: string;
  className?: string;
  size?: number;
}

/**
 * Animated icon system. Today renders gently-looping, dark-mode-friendly Lucide
 * SVGs (2–3s, minimal motion). Swap in real Lottie assets later without
 * changing call sites.
 *
 * ── To enable real Lottie assets ───────────────────────────────────────────
 * 1. npm i @lottiefiles/dotlottie-react
 * 2. if (src) return <DotLottieReact src={src} loop autoplay className={className} />;
 * 3. Place compressed assets in /public/motion/lottie (see docs).
 */
export function LottieIcon({ name, src, className, size = 28 }: LottieIconProps) {
  void src;
  const reduce = useReducedMotion();
  const Icon = ICONS[name];

  return (
    <motion.span
      className={cn("inline-flex text-accent", className)}
      initial={reduce ? false : { opacity: 0.85 }}
      animate={reduce ? undefined : { opacity: [0.85, 1, 0.85], y: [0, -1.5, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon width={size} height={size} strokeWidth={1.6} />
    </motion.span>
  );
}
