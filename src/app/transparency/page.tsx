import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { TransparencyCenter } from "@/components/intelligence/transparency-center";

export const metadata: Metadata = createMetadata({
  title: "Performance Transparency Center",
  description: "Live track records, methodology, risk statistics, and third-party verification.",
  path: "/transparency",
  keywords: ["performance transparency", "verified track record", "trading methodology"],
});

export default function Page() {
  return <TransparencyCenter />;
}
