import type { EventType } from "@/types/capital-v7";

export interface IrEvent {
  slug: string;
  title: string;
  eventType: EventType;
  description: string;
  scheduledAt: string;
  durationMinutes: number;
  replayUrl?: string;
  registrationCount: number;
}

export const IR_EVENTS: IrEvent[] = [
  { slug: "webinar-q2-outlook-2026", title: "Q2 2026 Market Outlook Webinar", eventType: "webinar", description: "Macro outlook and systematic positioning for Q2.", scheduledAt: "2026-04-25T14:00:00Z", durationMinutes: 60, registrationCount: 48 },
  { slug: "monthly-briefing-april-2026", title: "April Monthly Investor Briefing", eventType: "briefing", description: "Monthly performance and risk update for investors.", scheduledAt: "2026-04-18T10:00:00Z", durationMinutes: 45, replayUrl: "#", registrationCount: 72 },
  { slug: "investor-qa-may-2026", title: "Investor Q&A Session — May 2026", eventType: "qa", description: "Open Q&A with founder and IR team.", scheduledAt: "2026-05-10T15:00:00Z", durationMinutes: 90, registrationCount: 35 },
  { slug: "institutional-conference-2026", title: "PrysmAlgo Institutional Conference", eventType: "conference", description: "Annual institutional investor conference.", scheduledAt: "2026-06-15T09:00:00Z", durationMinutes: 480, registrationCount: 120 },
];

export function getEvent(slug: string) {
  return IR_EVENTS.find((e) => e.slug === slug);
}
