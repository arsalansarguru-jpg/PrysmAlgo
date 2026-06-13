"use client";

import { cn } from "@/lib/utils";

interface AmbientGradientProps {
  className?: string;
  /** Visual intensity of the ambient layers. */
  intensity?: "subtle" | "medium";
  /** Show the fine quantitative grid overlay. */
  grid?: boolean;
}

/**
 * Code-native "ShaderGradient" — layered radial gradients that drift almost
 * imperceptibly to evoke intelligence and depth (deep navy / graphite / cyan /
 * subtle gold). Pure CSS + transforms, GPU-composited, zero dependencies and
 * effectively free for Lighthouse. Honors prefers-reduced-motion globally.
 *
 * Drop a real Spline/ShaderGradient scene behind this later via <SplineScene>
 * without changing any layout.
 */
export function AmbientGradient({
  className,
  intensity = "subtle",
  grid = true,
}: AmbientGradientProps) {
  const blobOpacity = intensity === "subtle" ? 0.5 : 0.75;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgb(var(--ambient-navy)/0.35),transparent_60%)]" />

      {/* Drifting intelligence blobs */}
      <div
        className="gpu absolute -top-1/4 left-1/5 h-[42rem] w-[42rem] rounded-full blur-3xl animate-ambient-drift-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--accent-dark) / 0.30), transparent 65%)",
          opacity: blobOpacity,
        }}
      />
      <div
        className="gpu absolute top-1/3 right-1/6 h-[38rem] w-[38rem] rounded-full blur-3xl animate-ambient-drift"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--ambient-cyan) / 0.16), transparent 65%)",
          opacity: blobOpacity,
        }}
      />
      <div
        className="gpu absolute bottom-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl animate-ambient-drift-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--ambient-gold) / 0.10), transparent 70%)",
          opacity: blobOpacity * 0.8,
        }}
      />

      {/* Fine quantitative grid */}
      {grid && (
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_30%,black,transparent)]" />
      )}

      {/* Vignette to keep edges deep */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,rgb(var(--background)/0.85))]" />
    </div>
  );
}
