import type { Metadata } from "next";
import { getAuthorityMetadata } from "@/components/authority/authority-route";
import { CapitalPreservationHub } from "@/components/intelligence/capital-preservation-hub";

export const metadata: Metadata = getAuthorityMetadata("capital-preservation");

export default function Page() {
  return <CapitalPreservationHub />;
}
