import type { Metadata } from "next";
import { DocumentVault } from "@/components/portal/document-vault";

export const metadata: Metadata = {
  title: "Document Vault",
  robots: { index: false },
};

export default function PortalDocumentsPage() {
  return <DocumentVault />;
}
