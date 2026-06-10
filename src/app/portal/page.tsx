import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PortalDashboard } from "@/components/intelligence/portal-dashboard";

export const metadata: Metadata = createMetadata({
  title: "Investor Portal",
  description: "Secure investor dashboard with portfolio overview, performance, reports, and documents.",
  path: "/portal",
  noIndex: true,
});

export default function Page() {
  return <PortalDashboard />;
}
