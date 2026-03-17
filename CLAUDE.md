# WRPS ESCO Online Reporting Platform (ORP)

## Project Overview

Multi-tenant Online Reporting Platform for the **Waterloo Regional Police Service (WRPS)** and **Emergency Services Cooperative Ontario (ESCO)**. Enables citizens to file non-emergency police reports 24/7 via a web portal, officers to review/process reports, and administrators to configure their agency's instance.

**PRD**: `WRPS_ESCO_ORP_PRD_v1.0.docx` (RFP P2026-03)

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS v3 + shadcn/ui (v3-compatible Radix-based components)
- **Icons**: Lucide React
- **State**: React state + context (no external state management)
- **i18n**: Custom lightweight EN/FR system (`src/lib/i18n.ts` + `src/lib/locale-context.tsx`)
- **Data**: Mock data only (`src/data/mock.ts`) — no backend/API

## Architecture

```
src/
├── app/
│   ├── (citizen)/         # Citizen-facing portal (Header + Footer layout)
│   │   ├── page.tsx                    # Landing page (/)
│   │   ├── report/page.tsx             # Report type selection (/report)
│   │   ├── report/[type]/page.tsx      # Multi-step report wizard (/report/:type)
│   │   ├── confirmation/[id]/page.tsx  # Submission confirmation (/confirmation/:id)
│   │   ├── track/page.tsx              # Track report form (/track)
│   │   └── track/[id]/page.tsx         # Report status detail (/track/:id)
│   ├── (officer)/         # Officer portal (Sidebar layout)
│   │   ├── officer/dashboard/page.tsx       # Report queue + stats (/officer/dashboard)
│   │   ├── officer/reports/[id]/page.tsx    # Report detail + actions (/officer/reports/:id)
│   │   └── officer/video-call/[id]/page.tsx # Video call UI (/officer/video-call/:id)
│   └── (admin)/           # Admin console (Sidebar layout)
│       ├── admin/dashboard/page.tsx     # Analytics (/admin/dashboard)
│       ├── admin/report-types/page.tsx  # Report type CRUD (/admin/report-types)
│       ├── admin/users/page.tsx         # User management (/admin/users)
│       ├── admin/branding/page.tsx      # Agency branding config (/admin/branding)
│       └── admin/templates/page.tsx     # Email template editor (/admin/templates)
├── components/
│   ├── ui/                # shadcn/ui primitives (Tailwind v3 + Radix)
│   └── shared/            # Shared components (Header, Footer, StatusBadge)
├── data/mock.ts           # All mock data (agencies, reports, officers, metrics, templates)
├── lib/
│   ├── utils.ts           # cn() utility
│   ├── i18n.ts            # Translation dictionary + helpers
│   └── locale-context.tsx # React context provider for locale
└── types/index.ts         # TypeScript type definitions
```

## Route Groups

- `(citizen)` — public citizen-facing pages with Header/Footer
- `(officer)` — authenticated officer portal with sidebar navigation
- `(admin)` — authenticated admin console with sidebar navigation

Route groups don't affect URLs. The officer portal is at `/officer/*`, admin at `/admin/*`.

## Key Design Decisions

1. **Mobile-first responsive** — all pages designed for mobile viewport first, scaled up
2. **WCAG 2.1 AA** — semantic HTML, ARIA labels, focus management, 44×44px touch targets
3. **Bilingual (EN/FR)** — cookie-based locale with full translation dictionary
4. **Agency branding** — colors, logos, names pulled from agency config (mock)
5. **No unstable dependencies** — only production-proven libraries (Next.js, Radix, Tailwind)
6. **UI-only mock** — all data is static; actions (approve, reject, submit) navigate but don't persist

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Mock Data

All mock data lives in `src/data/mock.ts`:
- **2 agencies** (WRPS, GPS) — WRPS is the default/current
- **6 report types** with eligibility questions, form fields, validation rules
- **8 reports** across all statuses (submitted, under_review, approved, rejected, info_requested)
- **3 officers** (2 reviewers, 1 supervisor)
- **Dashboard metrics** with weekly trends
- **4 email templates** (approval, rejection, info request, status update)

## Conventions

- All pages are client components (`"use client"`) since they use hooks/state
- Colors reference the agency config (`currentAgency.primaryColor`) for theming
- Status badges use the `statusConfig` map for consistent styling
- Form validation is inline with real-time error messages
- The report wizard uses a phase-based state machine: eligibility → form steps → evidence → review
