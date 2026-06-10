import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { EventsHub } from "@/components/capital-v7/events-hub";

export const metadata: Metadata = createMetadata({
  title: "Investor Events",
  description: "Webinars, briefings, Q&A sessions, and replay library.",
  path: "/events",
});

export default function EventsPage() {
  return <EventsHub />;
}
