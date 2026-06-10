-- PrysmAlgo V6 Production Operations Layer

-- Extend platform_users roles
ALTER TABLE platform_users DROP CONSTRAINT IF EXISTS platform_users_role_check;
ALTER TABLE platform_users ADD CONSTRAINT platform_users_role_check
  CHECK (role IN ('visitor', 'lead', 'investor', 'partner', 'admin', 'super_admin'));

ALTER TABLE platform_users ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE;
ALTER TABLE platform_users ADD COLUMN IF NOT EXISTS onboarding_stage TEXT DEFAULT 'application';
ALTER TABLE platform_users ADD COLUMN IF NOT EXISTS kyc_status TEXT DEFAULT 'pending'
  CHECK (kyc_status IN ('pending', 'submitted', 'under_review', 'approved', 'rejected'));
ALTER TABLE platform_users ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false;

-- Live performance engine
CREATE TABLE IF NOT EXISTS performance_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  strategy_id TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('fxblue', 'myfxbook', 'broker', 'manual')),
  external_account_id TEXT,
  label TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS performance_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID REFERENCES performance_accounts(id) ON DELETE CASCADE,
  strategy_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  snapshot_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metrics JSONB NOT NULL DEFAULT '{}',
  equity_curve JSONB DEFAULT '[]',
  monthly_returns JSONB DEFAULT '[]',
  drawdown_series JSONB DEFAULT '[]',
  daily_returns JSONB DEFAULT '[]',
  UNIQUE(strategy_id, provider, snapshot_at)
);

CREATE TABLE IF NOT EXISTS performance_sync_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'partial')),
  records_synced INT DEFAULT 0,
  error_message TEXT,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_performance_snapshots_strategy ON performance_snapshots(strategy_id, snapshot_at DESC);

-- Investor onboarding workflow
CREATE TABLE IF NOT EXISTS onboarding_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  user_id UUID REFERENCES platform_users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  current_stage TEXT NOT NULL DEFAULT 'application'
    CHECK (current_stage IN (
      'application', 'qualification', 'approval', 'agreement',
      'broker_connection', 'account_activation', 'portal_access', 'completed'
    )),
  stages JSONB NOT NULL DEFAULT '[]',
  assigned_admin UUID,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Document vault (Supabase Storage bucket: investor-documents)
CREATE TABLE IF NOT EXISTS investor_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES platform_users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  category TEXT NOT NULL CHECK (category IN (
    'agreement', 'statement', 'report', 'tax', 'kyc', 'other'
  )),
  title TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size INT,
  mime_type TEXT,
  visible_to TEXT[] DEFAULT ARRAY['investor', 'admin'],
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- KYC submissions
CREATE TABLE IF NOT EXISTS kyc_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES platform_users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'submitted', 'under_review', 'approved', 'rejected')),
  identity_doc_path TEXT,
  passport_doc_path TEXT,
  pan_doc_path TEXT,
  address_doc_path TEXT,
  reviewer_id UUID,
  review_notes TEXT,
  audit_trail JSONB DEFAULT '[]',
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID,
  actor_email TEXT,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- Email delivery log
CREATE TABLE IF NOT EXISTS email_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_email TEXT NOT NULL,
  template_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  provider TEXT DEFAULT 'resend',
  external_id TEXT,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'failed', 'bounced')),
  metadata JSONB DEFAULT '{}',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- WhatsApp delivery log
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  to_phone TEXT NOT NULL,
  template_id TEXT NOT NULL,
  provider TEXT DEFAULT 'meta',
  external_id TEXT,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'failed', 'delivered')),
  metadata JSONB DEFAULT '{}',
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partner revenue tracking
CREATE TABLE IF NOT EXISTS partner_commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES platform_users(id) ON DELETE CASCADE,
  referral_id UUID REFERENCES partner_referrals(id) ON DELETE SET NULL,
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  period TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CMS content (MDX / editorial)
CREATE TABLE IF NOT EXISTS cms_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN (
    'briefing', 'research', 'insight', 'university', 'community'
  )),
  title TEXT NOT NULL,
  body TEXT,
  frontmatter JSONB DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  author_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS policies (service role bypasses; anon blocked by default)
ALTER TABLE performance_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read performance snapshots" ON performance_snapshots
  FOR SELECT USING (true);

CREATE POLICY "Investors read own documents" ON investor_documents
  FOR SELECT USING (auth.uid()::text = user_id::text OR 'admin' = ANY(visible_to));

CREATE POLICY "Users read own KYC" ON kyc_submissions
  FOR SELECT USING (auth.uid()::text = user_id::text);
