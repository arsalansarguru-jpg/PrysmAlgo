import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { BookCallPage } from "@/components/acquisition/book-call-page";

export const metadata: Metadata = createMetadata({
  title: "Book Investor Strategy Call",
  description: "Schedule a confidential strategy consultation with PrysmAlgo investor relations. India, UAE, UK, Singapore, Canada, Australia.",
  path: "/book-call",
  keywords: ["book investor call", "prysmalgo consultation", "algorithmic trading consultation"],
});

export default function Page() {
  return <BookCallPage />;
}
