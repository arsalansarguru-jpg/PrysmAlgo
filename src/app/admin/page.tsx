import type { Metadata } from "next";
import { AdminDashboard } from "@/components/acquisition/admin-dashboard";

export const metadata: Metadata = {
  title: "Executive Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard view="executive" />;
}
