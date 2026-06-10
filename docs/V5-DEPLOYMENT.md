# PrysmAlgo Investor Intelligence Platform V5.0

## Architecture

```
Marketing Site (V1-V4)
        ↓
Intelligence Layer (V5)
├── /terminal          Market Intelligence Terminal
├── /daily-briefing    Daily Briefing Archive
├── /research-institute Institutional Research
├── /transparency      Performance Transparency
├── /university        Investor Education
├── /insights          Executive Commentary
├── /prysm-ai          AI Research Assistant
├── /portal            Investor Portal (auth)
├── /partners          Partner Referral Portal
├── /community         Investor Community
└── /membership        Tier Management

Mobile APIs: /api/v1/*
```

## Database

Run `supabase/migrations/002_intelligence_platform.sql` after V4 migration.

## Mobile / PWA

- Shared APIs at `/api/v1/briefings`, `/terminal`, `/trust-score`, `/portal`
- PWA manifest config in `src/lib/intelligence/api.ts`
- Components in `src/components/intelligence/` are reusable across web and native shells

## Membership Tiers

| Tier | Access |
|------|--------|
| Free | Daily briefing, basic terminal, intro courses |
| Professional | Full archive, research, university, Prysm AI |
| Institutional | Portal, partners, PDF downloads, API |

## Deployment

1. Apply Supabase migrations 001 + 002
2. Configure env vars from `.env.example`
3. `npm run build && vercel --prod`
4. Wire live market data feed to `/api/v1/terminal` (optional)
