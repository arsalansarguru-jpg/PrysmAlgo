import type { Metadata } from "next";
import { AdminDashboard } from "@/components/acquisition/admin-dashboard";

export const metadata: Metadata = {
  title: "Lead Management",
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return <AdminDashboard view="leads" />;
}
