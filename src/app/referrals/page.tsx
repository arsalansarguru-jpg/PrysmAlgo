import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ReferralProgram } from "@/components/capital-v7/referral-program";

export const metadata: Metadata = createMetadata({
  title: "Investor Referral Program",
  description: "Refer qualified investors and earn rewards.",
  path: "/referrals",
});

export default function ReferralsPage() {
  return <ReferralProgram />;
}
