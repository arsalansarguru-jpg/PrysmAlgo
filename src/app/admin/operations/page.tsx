import type { Metadata } from "next";
import { AdminControlCenter } from "@/components/operations/admin-control-center";

export const metadata: Metadata = {
  title: "Operations Control Center",
  robots: { index: false },
};

export default function AdminOperationsPage() {
  return <AdminControlCenter />;
}
