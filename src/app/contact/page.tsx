import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = createMetadata({
  title: "Contact PrysmAlgo | Investor Relations",
  description:
    "Contact PrysmAlgo's investor relations team. Book a consultation, send an inquiry, or connect via WhatsApp, email, or phone.",
  path: "/contact",
  keywords: ["contact prysmalgo", "algorithmic trading consultation", "investor relations"],
});

export default function Contact() {
  return <ContactPage />;
}
