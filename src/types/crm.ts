/** Investor Acquisition System V4.0 — CRM types */

export type LeadStatus =
  | "visitor"
  | "lead"
  | "qualified"
  | "booked_call"
  | "proposal_sent"
  | "under_review"
  | "investor"
  | "active_client"
  | "lost";

export type LeadTier = "hot" | "warm" | "cold";

export type PipelineStage =
  | "new_lead"
  | "contacted"
  | "qualified"
  | "meeting_scheduled"
  | "proposal_sent"
  | "negotiation"
  | "won"
  | "lost";

export interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  source: string;
  lead_score: number;
  lead_tier: LeadTier;
  status: LeadStatus;
  pipeline_stage: PipelineStage;
  campaign?: string;
  consent_marketing: boolean;
  consent_whatsapp: boolean;
  created_at: string;
  updated_at: string;
}

export interface InvestorProfile {
  id: string;
  lead_id: string;
  capital_range?: string;
  experience_level?: string;
  risk_profile?: string;
  goals?: string;
  notes?: string;
  application_data?: Record<string, unknown>;
  signature_name?: string;
  signed_at?: string;
}

export interface Meeting {
  id: string;
  lead_id: string;
  meeting_date?: string;
  outcome?: string;
  next_step?: string;
  calendly_event_id?: string;
  created_at: string;
}

export interface Activity {
  id: string;
  lead_id: string;
  activity_type: string;
  description?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface Campaign {
  id: string;
  campaign_name: string;
  source: string;
  roi?: number;
  leads_count?: number;
  created_at: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface LeadCreateInput {
  full_name?: string;
  email: string;
  phone?: string;
  country?: string;
  source: string;
  campaign?: string;
  capital_range?: string;
  experience_level?: string;
  risk_profile?: string;
  goals?: string;
  metadata?: Record<string, string | number | boolean>;
  consent_marketing?: boolean;
  consent_whatsapp?: boolean;
  status?: LeadStatus;
  pipeline_stage?: PipelineStage;
}

export interface ApplicationInput extends LeadCreateInput {
  message?: string;
  signature_name: string;
  declarations_accepted: boolean;
  risk_disclosure_accepted: boolean;
}

export interface DashboardMetrics {
  visitors: number;
  leads: number;
  qualified_leads: number;
  meetings: number;
  applications: number;
  conversion_rate: number;
  hot_leads: number;
  warm_leads: number;
  cold_leads: number;
  pipeline_value: number;
  by_country: Record<string, number>;
  by_source: Record<string, number>;
  funnel: { stage: string; count: number; rate: number }[];
}

export const FUNNEL_STAGES: { id: LeadStatus; label: string }[] = [
  { id: "visitor", label: "Visitor" },
  { id: "lead", label: "Lead" },
  { id: "qualified", label: "Qualified" },
  { id: "booked_call", label: "Booked Call" },
  { id: "proposal_sent", label: "Proposal Sent" },
  { id: "under_review", label: "Under Review" },
  { id: "investor", label: "Investor" },
  { id: "active_client", label: "Active Client" },
];

export const PIPELINE_COLUMNS: { id: PipelineStage; label: string; color: string }[] = [
  { id: "new_lead", label: "New Lead", color: "border-blue-500/40" },
  { id: "contacted", label: "Contacted", color: "border-cyan-500/40" },
  { id: "qualified", label: "Qualified", color: "border-accent/40" },
  { id: "meeting_scheduled", label: "Meeting Scheduled", color: "border-purple-500/40" },
  { id: "proposal_sent", label: "Proposal Sent", color: "border-amber-500/40" },
  { id: "negotiation", label: "Negotiation", color: "border-orange-500/40" },
  { id: "won", label: "Won", color: "border-success/40" },
  { id: "lost", label: "Lost", color: "border-red-500/40" },
];

export const TARGET_MARKETS = ["India", "UAE", "UK", "Singapore", "Canada", "Australia"] as const;
