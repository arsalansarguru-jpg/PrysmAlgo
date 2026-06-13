"use client";

import dynamic from "next/dynamic";

/**
 * Lazy, client-only entry point for the AI Trading Core canvas. Keeps the
 * heavy animation logic out of the initial bundle and off the server render.
 */
export const CapitalNetworkCoreLazy = dynamic(
  () => import("./capital-network-core").then((m) => m.CapitalNetworkCore),
  { ssr: false, loading: () => null }
);
