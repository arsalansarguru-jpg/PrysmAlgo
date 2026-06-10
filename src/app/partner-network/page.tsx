import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PartnerNetworkHub } from "@/components/capital-v7/partner-network-hub";

export const metadata: Metadata = createMetadata({
  title: "Partner Network",
  description: "Partner dashboard, tracking, commission reporting, and marketing assets.",
  path: "/partner-network",
});

export default function PartnerNetworkPage() {
  return <PartnerNetworkHub />;
}
