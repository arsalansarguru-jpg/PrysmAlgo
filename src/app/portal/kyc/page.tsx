import type { Metadata } from "next";
import { KycUpload } from "@/components/portal/kyc-upload";

export const metadata: Metadata = {
  title: "KYC Verification",
  robots: { index: false },
};

export default function PortalKycPage() {
  return <KycUpload />;
}
