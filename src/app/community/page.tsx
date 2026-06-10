import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { CommunityHub } from "@/components/intelligence/community-hub";

export const metadata: Metadata = createMetadata({
  title: "Investor Community",
  description: "Market discussions, research updates, and investor Q&A.",
  path: "/community",
  noIndex: true,
});

export default function Page() {
  return <CommunityHub />;
}
