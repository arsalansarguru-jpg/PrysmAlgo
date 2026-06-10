import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { DataRoomHub } from "@/components/capital-v7/data-room-hub";

export const metadata: Metadata = createMetadata({
  title: "Investor Data Room",
  description: "Secure access to performance reports, due diligence packs, and institutional documents.",
  path: "/data-room",
});

export default function DataRoomPage() {
  return <DataRoomHub />;
}
