import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { IrCenter } from "@/components/capital-v7/ir-center";

export const metadata: Metadata = createMetadata({
  title: "Investor Relations Center",
  description: "Quarterly letters, monthly updates, CEO letters, and archived investor communications.",
  path: "/ir",
});

export default function IrPage() {
  return <IrCenter />;
}
