# PrysmAlgo V6 — Production Operations Layer

## Overview

V6 replaces demo data with production systems: live performance sync, Supabase Auth, investor onboarding, document vault, KYC, email/WhatsApp, CMS, analytics, and security hardening.

## Database Migrations

Run in order on Supabase production:

1. `001_investor_acquisition.sql`
2. `002_intelligence_platform.sql`
3. `003_v6_production.sql`

## Supabase Storage

Create bucket: `investor-documents` (private)

RLS: investors access own folder, admins via service role.

## Environment Variables

Copy `.env.example` → `.env.local` and configure all production keys.

Critical:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Auth)
- `SUPABASE_SERVICE_ROLE_KEY` (server operations)
- `CRON_SECRET` (performance sync)
- `RESEND_API_KEY` (email)
- Performance provider keys (FXBlue / Myfxbook / Broker)

## Cron Jobs

`vercel.json` syncs performance every 15 minutes:

```
GET /api/cron/sync-performance
Authorization: Bearer {CRON_SECRET}
```

## Auth Roles

| Role | Access |
|------|--------|
| visitor | Public site |
| lead | Community, membership |
| investor | Portal, documents, KYC |
| partner | Partners dashboard |
| admin | Admin control center |
| super_admin | Full permissions |

Set role in Supabase Auth user metadata: `{ "role": "investor" }`

## Onboarding Flow

Application → Qualification → Approval → Agreement → Broker Connection → Account Activation → Portal Access

Tracked in `onboarding_workflows` table. Admin advances stages at `/admin/operations`.

## Health Check

```
GET /api/health
```

## Production Checklist

- [ ] Apply all 3 Supabase migrations
- [ ] Create `investor-documents` storage bucket
- [ ] Configure custom domain on Vercel
- [ ] Set all env vars in Vercel production
- [ ] Enable Supabase Auth (email/password)
- [ ] Configure Resend domain verification
- [ ] Connect FXBlue / Myfxbook / Broker API
- [ ] Set `CRON_SECRET` for performance sync
- [ ] Test `/api/health` returns all services green
- [ ] Test investor application → onboarding → email
- [ ] Enable Supabase daily backups
- [ ] Configure Sentry error tracking (optional)

## Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin` | CRM executive dashboard |
| `/admin/leads` | Lead management |
| `/admin/pipeline` | Pipeline Kanban |
| `/admin/operations` | V6 control center |

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/performance` | Live performance data |
| `/api/cron/sync-performance` | 15-min sync cron |
| `/api/onboarding` | Onboarding workflows |
| `/api/documents` | Document vault |
| `/api/kyc` | KYC submission |
| `/api/admin/analytics` | Command center metrics |
| `/api/admin/kyc` | KYC review |
| `/api/admin/onboarding` | Advance onboarding |
| `/api/health` | System health |
