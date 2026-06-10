import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { PartnersPortal } from "@/components/intelligence/partners-portal";

export const metadata: Metadata = createMetadata({
  title: "Partner Portal",
  description: "Referral dashboard, commission tracking, and affiliate reporting.",
  path: "/partners",
  noIndex: true,
});

export default function Page() {
  return <PartnersPortal />;
}
