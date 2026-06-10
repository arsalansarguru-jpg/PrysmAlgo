import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { CapitalPipelineHub } from "@/components/capital-v7/capital-pipeline";

export const metadata: Metadata = createMetadata({
  title: "Capital Raise Pipeline",
  description: "Track prospects, qualified investors, due diligence, and funded capital.",
  path: "/capital-raising",
});

export default function CapitalRaisingPage() {
  return <CapitalPipelineHub />;
}
