import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "PrysmAlgo terms of service, investor eligibility, and platform usage agreement.",
  path: "/terms",
  keywords: ["terms of service", "user agreement", "PrysmAlgo terms"],
});

const content = `
## Acceptance of Terms

By accessing PrysmAlgo's website and services, you agree to these Terms of Service. If you do not agree, please do not use our services.

## Services Description

PrysmAlgo provides algorithmic trading technology that connects to regulated brokerage accounts. We are a technology provider, not a registered investment advisor, broker-dealer, or custodian.

## Eligibility

Our services are available only to qualified investors meeting minimum investment thresholds and jurisdictional requirements. You must be at least 18 years of age.

## Investment Risks

Trading involves substantial risk of loss. Past performance is not indicative of future results. You should only invest capital you can afford to lose.

## Fees

Fee structures are disclosed during the application process. Performance fees apply only on profits above the high-water mark.

## Intellectual Property

All technology, algorithms, and content are proprietary to PrysmAlgo. Unauthorized reproduction or distribution is prohibited.

## Limitation of Liability

PrysmAlgo shall not be liable for trading losses, market conditions, or third-party service failures beyond the extent permitted by applicable law.

## Termination

Either party may terminate the service relationship with written notice. Upon termination, open positions will be managed according to agreed protocols.

## Governing Law

These terms are governed by the laws of the State of New York, United States.
`;

export default function Terms() {
  return <LegalPage title="Terms of Service" lastUpdated="June 1, 2026" content={content} />;
}
