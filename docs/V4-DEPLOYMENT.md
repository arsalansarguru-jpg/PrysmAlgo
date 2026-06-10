# PrysmAlgo Investor Acquisition System V4.0 — Deployment Guide

## Architecture

```
Website → /api/leads → Supabase CRM → Email/WhatsApp webhooks
                    → Zapier/Airtable (optional)
```

## 1. Supabase Setup

1. Create project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_investor_acquisition.sql` in SQL Editor
3. Copy URL + Service Role Key to `.env.local`

## 2. Environment Variables

Copy `.env.example` → `.env.local` and configure:

| Variable | Purpose |
|----------|---------|
| `SUPABASE_URL` | CRM database |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes |
| `ADMIN_API_KEY` | Protect `/admin` API routes |
| `LEAD_WEBHOOK_URL` | Zapier/Airtable sync |
| `EMAIL_AUTOMATION_WEBHOOK_URL` | Email sequences A/B/C |
| `WHATSAPP_AUTOMATION_WEBHOOK_URL` | WhatsApp flows |
| `NEXT_PUBLIC_CALENDLY_URL` | Book call embed |

## 3. Vercel Deployment

```bash
npm run build
vercel --prod
```

Add all env vars in Vercel dashboard → Settings → Environment Variables.

## 4. Admin Dashboard

- **Executive:** `/admin`
- **Pipeline Kanban:** `/admin/pipeline`
- **Lead List:** `/admin/leads`

Authenticate with `ADMIN_API_KEY` header (`x-admin-key`).

## 5. Automation Integrations

### Email (Sequences A/B/C)
Wire `EMAIL_AUTOMATION_WEBHOOK_URL` to Make/Zapier → Resend/HubSpot.

### WhatsApp
Wire `WHATSAPP_AUTOMATION_WEBHOOK_URL` to Twilio or Meta Business API.

### Retargeting
Configure Meta Pixel, Google Ads, LinkedIn Insight Tag via existing analytics env vars.
Custom events: `quiz_complete`, `investor_application`, `calendly_click`, `lead_capture`.

## 6. Airtable Mirror

See `docs/airtable-schema.md` for compatible table structure.

## 7. Scale Targets

- 10,000+ monthly visitors: Vercel + Supabase free/pro tier
- ISR not required — API routes are dynamic
- Enable Supabase connection pooling for high write volume
