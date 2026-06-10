# Airtable Schema — PrysmAlgo CRM V4.0

Compatible mirror of Supabase tables for no-code CRM workflows.

## Base: PrysmAlgo Investor CRM

### Table: Leads

| Field | Type | Notes |
|-------|------|-------|
| ID | Auto Number | Primary |
| Full Name | Single line text | |
| Email | Email | Required, unique |
| Phone | Phone | |
| Country | Single select | India, UAE, UK, Singapore, Canada, Australia, Other |
| Source | Single select | website, investor-assessment, apply, newsletter, concierge, book-call |
| Lead Score | Number | 0–150 |
| Lead Tier | Single select | hot, warm, cold |
| Status | Single select | visitor → active_client funnel |
| Pipeline Stage | Single select | new_lead → won/lost |
| Campaign | Link to Campaigns | |
| Consent Marketing | Checkbox | |
| Consent WhatsApp | Checkbox | |
| Created | Created time | |

### Table: Investor Profiles

| Field | Type |
|-------|------|
| Lead | Link to Leads |
| Capital Range | Single select |
| Experience Level | Single select |
| Risk Profile | Single select |
| Goals | Long text |
| Notes | Long text |
| Signature Name | Single line text |
| Signed At | Date |

### Table: Meetings

| Field | Type |
|-------|------|
| Lead | Link to Leads |
| Meeting Date | Date/time |
| Outcome | Single select |
| Next Step | Long text |
| Calendly Event ID | Single line text |

### Table: Activities

| Field | Type |
|-------|------|
| Lead | Link to Leads |
| Activity Type | Single select |
| Description | Long text |
| Timestamp | Date/time |

### Table: Campaigns

| Field | Type |
|-------|------|
| Campaign Name | Single line text |
| Source | Single select |
| ROI | Percent |
| Leads Count | Count (Leads) |
| Spend | Currency |

## Zapier / Make Integration

1. Webhook receives lead from `/api/leads`
2. Create/update Airtable Lead record
3. If `lead_tier` = hot → Slack notification + assign to sales
4. Trigger email sequence via Mailchimp/Resend
