import type { Metadata } from "next";
import { ExecutiveCommandCenter } from "@/components/capital-v7/executive-command-center";

export const metadata: Metadata = {
  title: "CEO Command Center",
  robots: { index: false },
};

export default function ExecutivePage() {
  return <ExecutiveCommandCenter />;
}
