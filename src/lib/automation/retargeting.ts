import { trackEvent } from "@/lib/analytics/events";

/** Custom audience events for Meta, Google Ads, LinkedIn */
export const RETARGETING_AUDIENCES = {
  website_visitors: "PageView",
  quiz_completers: "quiz_complete",
  call_bookers: "calendly_click",
  application_starters: "application_start",
  application_completers: "investor_application",
  lead_captures: "lead_capture",
} as const;

export function trackRetargetingEvent(
  audience: keyof typeof RETARGETING_AUDIENCES,
  params?: Record<string, string>
) {
  const event = RETARGETING_AUDIENCES[audience];
  trackEvent(event as Parameters<typeof trackEvent>[0], {
    event_category: "retargeting",
    event_label: audience,
    ...params,
  });

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", audience, params);
  }
}
