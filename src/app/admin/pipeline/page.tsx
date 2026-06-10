import type { Metadata } from "next";
import { AdminDashboard } from "@/components/acquisition/admin-dashboard";

export const metadata: Metadata = {
  title: "Sales Pipeline",
  robots: { index: false, follow: false },
};

export default function PipelinePage() {
  return <AdminDashboard view="pipeline" />;
}
