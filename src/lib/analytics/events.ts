type AnalyticsEvent =
  | "lead_capture"
  | "investor_application"
  | "contact_form"
  | "guide_download"
  | "calendly_click"
  | "whatsapp_click"
  | "quiz_complete"
  | "application_start";

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", event, params);

  window.fbq?.("trackCustom", event, params);

  window.dataLayer?.push({
    event,
    ...params,
  });
}
