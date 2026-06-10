-- PrysmAlgo V7 Capital Raising & Investor Relations

-- Investor Relations communications
CREATE TABLE IF NOT EXISTS ir_communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'quarterly_letter', 'monthly_update', 'investor_communication',
    'performance_commentary', 'market_commentary', 'annual_review', 'ceo_letter'
  )),
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  author TEXT DEFAULT 'Arsalan Sarguru',
  tier_required TEXT DEFAULT 'investor',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Capital raise pipeline
CREATE TABLE IF NOT EXISTS capital_pipeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  investor_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  stage TEXT NOT NULL DEFAULT 'prospect' CHECK (stage IN (
    'prospect', 'qualified', 'active_discussion', 'due_diligence',
    'pending_funding', 'funded'
  )),
  capital_committed NUMERIC(14, 2) DEFAULT 0,
  capital_funded NUMERIC(14, 2) DEFAULT 0,
  expected_close DATE,
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Data room documents
CREATE TABLE IF NOT EXISTS data_room_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'performance', 'due_diligence', 'risk', 'methodology',
    'research', 'operational', 'presentation'
  )),
  title TEXT NOT NULL,
  description TEXT,
  storage_path TEXT,
  file_url TEXT,
  tier_required TEXT DEFAULT 'qualified',
  download_count INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS data_room_downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES data_room_documents(id) ON DELETE CASCADE,
  user_id UUID,
  user_email TEXT,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Investor referral program
CREATE TABLE IF NOT EXISTS investor_referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID,
  referrer_email TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_email TEXT,
  referred_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'qualified', 'converted', 'rewarded')),
  reward_amount NUMERIC(12, 2) DEFAULT 0,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Investor health scores
CREATE TABLE IF NOT EXISTS investor_health_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  email TEXT NOT NULL,
  engagement_score INT DEFAULT 0,
  portal_usage_score INT DEFAULT 0,
  email_opens_score INT DEFAULT 0,
  referral_score INT DEFAULT 0,
  retention_risk TEXT DEFAULT 'low' CHECK (retention_risk IN ('low', 'medium', 'high')),
  overall_score INT DEFAULT 0,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email)
);

-- Capital flows
CREATE TABLE IF NOT EXISTS capital_flows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investor_id UUID,
  investor_email TEXT,
  flow_type TEXT NOT NULL CHECK (flow_type IN ('deposit', 'withdrawal', 'profit_share')),
  amount NUMERIC(14, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  country TEXT,
  flow_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partner network
CREATE TABLE IF NOT EXISTS partner_network (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  partner_type TEXT NOT NULL CHECK (partner_type IN (
    'introducing_broker', 'financial_advisor', 'wealth_manager', 'family_office'
  )),
  referral_count INT DEFAULT 0,
  capital_introduced NUMERIC(14, 2) DEFAULT 0,
  commission_earned NUMERIC(12, 2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events
CREATE TABLE IF NOT EXISTS ir_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('webinar', 'briefing', 'qa', 'conference')),
  description TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  replay_url TEXT,
  registration_count INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES ir_events(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  attended BOOLEAN DEFAULT false,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(event_id, email)
);

-- Forecasts
CREATE TABLE IF NOT EXISTS platform_forecasts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  forecast_type TEXT NOT NULL CHECK (forecast_type IN (
    'aum_growth', 'lead_conversion', 'revenue', 'retention', 'partner_growth', 'pipeline_value'
  )),
  period TEXT NOT NULL,
  predicted_value NUMERIC(14, 2) NOT NULL,
  confidence NUMERIC(5, 2) DEFAULT 0.75,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Automated reports log
CREATE TABLE IF NOT EXISTS automated_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_type TEXT NOT NULL CHECK (report_type IN (
    'monthly_investor', 'quarterly', 'annual', 'partner', 'management'
  )),
  period TEXT NOT NULL,
  title TEXT NOT NULL,
  storage_path TEXT,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Localization prep
CREATE TABLE IF NOT EXISTS localization_strings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('en', 'ar', 'hi', 'mr')),
  value TEXT NOT NULL,
  namespace TEXT DEFAULT 'common',
  UNIQUE(key, locale, namespace)
);

CREATE INDEX IF NOT EXISTS idx_ir_communications_category ON ir_communications(category, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_capital_pipeline_stage ON capital_pipeline(stage);
CREATE INDEX IF NOT EXISTS idx_capital_flows_date ON capital_flows(flow_date DESC);
