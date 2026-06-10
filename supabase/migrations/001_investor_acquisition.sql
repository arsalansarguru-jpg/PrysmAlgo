-- PrysmAlgo Investor Acquisition System V4.0
-- Run in Supabase SQL Editor or via supabase db push

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  lead_score INTEGER NOT NULL DEFAULT 0,
  lead_tier TEXT NOT NULL DEFAULT 'cold' CHECK (lead_tier IN ('hot', 'warm', 'cold')),
  status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN (
    'visitor', 'lead', 'qualified', 'booked_call', 'proposal_sent',
    'under_review', 'investor', 'active_client', 'lost'
  )),
  pipeline_stage TEXT NOT NULL DEFAULT 'new_lead' CHECK (pipeline_stage IN (
    'new_lead', 'contacted', 'qualified', 'meeting_scheduled',
    'proposal_sent', 'negotiation', 'won', 'lost'
  )),
  campaign TEXT,
  consent_marketing BOOLEAN NOT NULL DEFAULT false,
  consent_whatsapp BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_pipeline ON leads(pipeline_stage);
CREATE INDEX IF NOT EXISTS idx_leads_tier ON leads(lead_tier);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

-- Investor profiles
CREATE TABLE IF NOT EXISTS investor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  capital_range TEXT,
  experience_level TEXT,
  risk_profile TEXT,
  goals TEXT,
  notes TEXT,
  application_data JSONB DEFAULT '{}',
  signature_name TEXT,
  signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_lead_unique ON investor_profiles(lead_id);

-- Meetings
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  meeting_date TIMESTAMPTZ,
  outcome TEXT,
  next_step TEXT,
  calendly_event_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_meetings_lead ON meetings(lead_id);

-- Activities (audit trail)
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_lead ON activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_activities_ts ON activities(timestamp DESC);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_name TEXT NOT NULL,
  source TEXT NOT NULL,
  roi NUMERIC(10, 2),
  leads_count INTEGER DEFAULT 0,
  spend NUMERIC(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Conversations (AI concierge)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]',
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id);

-- Consent log (compliance)
CREATE TABLE IF NOT EXISTS consent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  consent_type TEXT NOT NULL,
  granted BOOLEAN NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS (service role bypasses; anon blocked by default)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;
