# PrysmAlgo V7 — Capital Raising & Investor Relations

## Overview

V7 adds institutional capital raising, investor relations, data room, referrals, executive command center, forecasting, and automated reporting — all connected to Supabase.

## Migration

Run after V6: `supabase/migrations/004_v7_capital_raising.sql`

## Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/ir` | Lead+ | Investor Relations Center |
| `/capital-raising` | Admin | Capital raise pipeline |
| `/data-room` | Investor+ | Secure document vault |
| `/due-diligence` | Public | DD center |
| `/referrals` | Investor+ | Referral program |
| `/partner-network` | Partner+ | Partner dashboard |
| `/events` | Public | Webinars & briefings |
| `/executive` | Admin | CEO command center |

## Mobile APIs (`/api/v1/*`)

- `ir`, `capital-pipeline`, `data-room`, `executive`
- `capital-flows`, `health-score`, `forecasts`, `events`
- `presentation` (HTML → print PDF)
- `reports` (automated report JSON)

See `src/lib/capital-v7/api.ts`

## Key Features

1. **IR Center** — Archived quarterly letters, CEO letters, commentary
2. **Capital Pipeline** — Prospect → Funded tracking with AUM forecasting
3. **Data Room** — Download tracking + audit logs
4. **Presentation Generator** — Dynamic pitch deck from live performance
5. **Health Score** — Engagement, retention risk scoring
6. **Executive Dashboard** — AUM, pipeline, forecasts, country breakdown
7. **i18n Prep** — English, Arabic, Hindi, Marathi (`src/lib/i18n/`)

## Production Checklist

- [ ] Apply migration 004
- [ ] Seed `ir_communications` and `data_room_documents`
- [ ] Configure data room storage bucket
- [ ] Set admin roles in Supabase Auth metadata
- [ ] Wire live capital flows from broker/custodian
- [ ] Connect email open tracking for health scores
- [ ] Enable PDF service (Puppeteer/wkhtmltopdf) for presentations
