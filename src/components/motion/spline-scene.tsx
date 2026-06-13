"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CapitalNetworkCoreLazy } from "./capital-network-core-lazy";

interface SplineSceneProps {
  /** Public URL of an exported Spline scene (.splinecode), e.g. from prod.spline.design. */
  scene?: string;
  className?: string;
  /** Custom fallback; defaults to the code-native AI Trading Core canvas. */
  fallback?: ReactNode;
}

/**
 * Spline scaffold. Until a real scene is supplied + the SDK is enabled (see
 * below), this renders the code-native <CapitalNetworkCore> so the experience
 * is complete today with zero extra bundle weight.
 *
 * ── To enable real Spline scenes ───────────────────────────────────────────
 * 1. npm i @splinetool/react-spline
 * 2. Replace the fallback return below with a dynamic, client-only import:
 *
 *      const Spline = dynamic(() => import("@splinetool/react-spline"), {
 *        ssr: false,
 *        loading: () => <>{fallback ?? <CapitalNetworkCoreLazy className="..." />}</>,
 *      });
 *      ...
 *      if (scene) return <Spline scene={scene} className={className} />;
 *
 * 3. Export scenes from Spline as `.splinecode` and host the URL (or place in
 *    /public/motion/spline — see docs/MOTION_DESIGN_SYSTEM.md).
 *
 * Keep scenes lazy + below ambient layers; budget < 1.5 MB per scene.
 */
export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  void scene; // reserved for SDK integration
  return (
    <div className={cn("relative h-full w-full", className)}>
      {fallback ?? <CapitalNetworkCoreLazy className="h-full w-full" />}
    </div>
  );
}
