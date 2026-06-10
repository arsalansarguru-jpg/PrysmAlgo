export type EmailTemplateId =
  | "welcome"
  | "application_received"
  | "application_approved"
  | "kyc_approved"
  | "portal_activated"
  | "monthly_report"
  | "password_reset";

interface TemplateVars {
  name?: string;
  link?: string;
  month?: string;
  [key: string]: string | undefined;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prysmalgo.com";

export const EMAIL_TEMPLATES: Record<
  EmailTemplateId,
  { subject: (v: TemplateVars) => string; html: (v: TemplateVars) => string }
> = {
  welcome: {
    subject: () => "Welcome to PrysmAlgo",
    html: (v) => `<p>Hi ${v.name ?? "there"},</p><p>Welcome to PrysmAlgo — institutional algorithmic trading.</p><p><a href="${SITE}/live-performance">View Live Performance</a></p>`,
  },
  application_received: {
    subject: () => "Application Received — PrysmAlgo",
    html: (v) => `<p>Hi ${v.name ?? "there"},</p><p>We have received your investor application. Our team will review it within 2 business days.</p>`,
  },
  application_approved: {
    subject: () => "Application Approved — Next Steps",
    html: (v) => `<p>Congratulations ${v.name ?? ""},</p><p>Your application has been approved. <a href="${SITE}/portal">Access your portal</a> to complete onboarding.</p>`,
  },
  kyc_approved: {
    subject: () => "KYC Approved",
    html: (v) => `<p>Hi ${v.name ?? "there"},</p><p>Your identity verification has been approved. You now have full portal access.</p>`,
  },
  portal_activated: {
    subject: () => "Investor Portal Activated",
    html: (v) => `<p>Hi ${v.name ?? "there"},</p><p>Your investor portal is now active. <a href="${SITE}/portal">Sign in here</a>.</p>`,
  },
  monthly_report: {
    subject: (v) => `Monthly Report — ${v.month ?? "PrysmAlgo"}`,
    html: (v) => `<p>Hi ${v.name ?? "there"},</p><p>Your monthly performance report for ${v.month} is available in your <a href="${SITE}/portal/documents">document vault</a>.</p>`,
  },
  password_reset: {
    subject: () => "Reset Your Password — PrysmAlgo",
    html: (v) => `<p>Click <a href="${v.link}">here</a> to reset your password. This link expires in 1 hour.</p>`,
  },
};
