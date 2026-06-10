import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "PrysmAlgo privacy policy and data protection practices for investor information.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data protection", "PrysmAlgo privacy"],
});

const content = `
## Information We Collect

We collect information you provide directly, including name, email, phone number, investment details, and communications when you apply, contact us, or use our services.

## How We Use Your Information

We use collected information to process investor applications, provide services, communicate with you, improve our platform, and comply with legal obligations.

## Data Protection

We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your personal and financial information.

## Information Sharing

We do not sell your personal information. We may share data with regulated brokerage partners, service providers, and as required by law.

## Your Rights

You have the right to access, correct, or delete your personal data. Contact us at info@prysmalgo.com to exercise these rights.

## Cookies

Our website uses essential cookies for functionality and analytics cookies to improve user experience. You can manage cookie preferences through your browser settings.

## Contact

For privacy-related inquiries, contact us at info@prysmalgo.com.
`;

export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" lastUpdated="June 1, 2026" content={content} />;
}
