import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { TrustCenterPage } from "@/components/growth/trust-center-page";

export const metadata: Metadata = createMetadata({
  title: "Trust Center | Compliance & Investor Protection",
  description: "Enterprise trust center with risk disclosure, security standards, performance methodology, and compliance information.",
  path: "/trust-center",
  keywords: ["trust center", "investor protection", "compliance", "risk disclosure"],
});

export default function TrustCenterRoute() {
  return <TrustCenterPage />;
}
