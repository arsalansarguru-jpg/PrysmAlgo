import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { IntelligenceHeader } from "@/components/intelligence/intelligence-header";
import { MembershipTiers } from "@/components/intelligence/membership-tiers";

export const metadata: Metadata = createMetadata({
  title: "Membership Plans",
  description: "Free, Professional, and Institutional membership tiers for PrysmAlgo Intelligence Platform.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntelligenceHeader
          label="Membership"
          title="Choose Your Intelligence Tier"
          description="Access daily briefings, market terminal, research institute, university courses, and investor portal based on your tier."
          breadcrumb={{ name: "Membership", path: "/membership" }}
        />
        <MembershipTiers />
      </div>
    </div>
  );
}
