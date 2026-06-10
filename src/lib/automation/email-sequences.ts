/** Email automation architecture — connect Resend/SendGrid/HubSpot */

export type EmailSequenceId = "new-lead" | "booked-call" | "investor-followup";

export interface EmailStep {
  day: number;
  subject: string;
  templateId: string;
  cta?: { label: string; url: string };
}

export const EMAIL_SEQUENCES: Record<EmailSequenceId, { name: string; steps: EmailStep[] }> = {
  "new-lead": {
    name: "Sequence A — New Lead",
    steps: [
      { day: 0, subject: "Welcome to PrysmAlgo", templateId: "welcome", cta: { label: "Explore Live Performance", url: "/live-performance" } },
      { day: 2, subject: "About PrysmAlgo — Institutional Algorithmic Trading", templateId: "about-prysmalgo", cta: { label: "Why PrysmAlgo", url: "/why-prysmalgo" } },
      { day: 4, subject: "Our Risk Management Framework", templateId: "risk-framework", cta: { label: "Read Framework", url: "/risk-framework" } },
      { day: 7, subject: "Verified Live Performance Overview", templateId: "performance-overview", cta: { label: "View Performance", url: "/live-performance" } },
      { day: 10, subject: "Book Your Strategy Consultation", templateId: "book-consultation", cta: { label: "Book Call", url: "/book-call" } },
    ],
  },
  "booked-call": {
    name: "Sequence B — Booked Call",
    steps: [
      { day: 0, subject: "Your Strategy Call is Confirmed", templateId: "call-confirmation" },
      { day: 1, subject: "How to Prepare for Your Consultation", templateId: "call-prep", cta: { label: "Investor Guide", url: "/downloads/ultimate-algorithmic-trading-guide" } },
      { day: 3, subject: "Reminder: Upcoming Strategy Call", templateId: "call-reminder" },
    ],
  },
  "investor-followup": {
    name: "Sequence C — Investor Follow-up",
    steps: [
      { day: 0, subject: "Thank You for Your Interest", templateId: "thank-you" },
      { day: 3, subject: "Investor Case Study — Real Allocation Frameworks", templateId: "case-study", cta: { label: "Case Studies", url: "/case-studies" } },
      { day: 7, subject: "Investor FAQ — Common Questions Answered", templateId: "investor-faq", cta: { label: "Glossary", url: "/glossary" } },
      { day: 14, subject: "Schedule Your Follow-Up Consultation", templateId: "follow-up-call", cta: { label: "Book Call", url: "/book-call" } },
    ],
  },
};

export function getSequenceForTrigger(trigger: "new_lead" | "booked_call" | "application_complete"): EmailSequenceId {
  if (trigger === "booked_call") return "booked-call";
  if (trigger === "application_complete") return "investor-followup";
  return "new-lead";
}

/** Integration hook — call from API after lead creation */
export async function enqueueEmailSequence(email: string, sequenceId: EmailSequenceId, leadId: string) {
  const { sendEmail } = await import("@/lib/email/send");
  const firstStep = EMAIL_SEQUENCES[sequenceId]?.steps[0];
  if (firstStep) {
    const templateMap: Record<string, import("@/lib/email/templates").EmailTemplateId> = {
      welcome: "welcome",
      "call-confirmation": "application_received",
      "thank-you": "application_received",
    };
    const templateId = templateMap[firstStep.templateId] ?? "welcome";
    await sendEmail(email, templateId, { name: email.split("@")[0] });
  }

  const webhook = process.env.EMAIL_AUTOMATION_WEBHOOK_URL;
  if (!webhook) return;
  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, sequenceId, leadId, sequence: EMAIL_SEQUENCES[sequenceId], enqueuedAt: new Date().toISOString() }),
  }).catch(() => null);
}
