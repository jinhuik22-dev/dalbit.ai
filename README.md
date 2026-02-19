# Dalbit.ai

Cultural Intelligence for Global Creators. A warm-premium web experience with a gamified intake chat, investor-ready marketing pages, and admin dashboard.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4 + custom warm-premium design system
- **Database:** Prisma 7 + SQLite (local dev)
- **Validation:** Zod
- **Typography:** Fraunces (serif headlines) + Inter (sans body)

## Quick Start

```bash
# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```env
# Admin dashboard password
ADMIN_PASSWORD=your-secure-password

# Set to "true" to disable /app route gating (dev convenience)
DALBIT_BYPASS_CODE=false
```

The `.env` file contains the database URL (auto-created by Prisma):

```env
DATABASE_URL="file:./dev.db"
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, problem/solution, use cases, CTA |
| `/product` | Product page with three pillars + roadmap timeline |
| `/solutions` | Solutions for Creators, Brands, and Agencies |
| `/investors` | Investor deck with market analysis + deck request form |
| `/about` | Brand story, vision, values, cultural intelligence |
| `/start` | Gamified intake chat (conversational survey) |
| `/app` | Gated dashboard (requires access code from intake) |
| `/admin` | Password-protected admin dashboard |

## Key Features

### Intake Chat (`/start`)
- Conversational survey UI with typing indicators
- 3 levels: Identity, Culture, Vision
- Progress indicator with level/step tracking
- Back navigation and skip for optional fields
- Generates `DALBIT-XXXXX` access code on completion
- Stores all answers in SQLite via Prisma
- Sets session cookie for `/app/*` route gating
- Supports `?ref=CODE` referral tracking

### Route Gating
- `/app/*` routes require a valid `dalbit_access` cookie
- Cookie is set after completing the intake
- Set `DALBIT_BYPASS_CODE=true` to disable gating in dev

### Admin Dashboard (`/admin`)
- Password-protected (uses `ADMIN_PASSWORD` env var)
- Two tabs: Intake Submissions + Investor Inquiries
- Filterable by role, language
- Expandable detail rows
- CSV export for both data types

### Investor Deck Form (`/investors`)
- Name, email, fund, message fields
- Stored in database via `/api/investor`
- Honeypot anti-spam + rate limiting

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/intake` | POST | Submit intake answers, returns access code |
| `/api/investor` | POST | Submit investor deck request |
| `/api/admin?type=intake` | GET | Fetch intake submissions (auth required) |
| `/api/admin?type=investor` | GET | Fetch investor inquiries (auth required) |
| `/api/admin/verify` | POST | Verify admin password |

## Database Schema

```
IntakeSubmission:
  id, createdAt, accessCode, refCode, role, industries[],
  primaryLanguage, otherLanguages[], locationCountry, locationCity,
  audience, tone, goal, portfolioUrl, challenge, rawJson

InvestorInquiry:
  id, createdAt, name, email, fund, message
```

## Design System

Components in `src/components/ui/`:
- **Button** — Primary, secondary, ghost, outline variants
- **Card** — CardHeader, CardTitle, CardDescription
- **Input** — Input, Textarea, Select, Label
- **Badge** — Default, accent, outline, success, muted
- **Pill** — Selectable pill for multi-select
- **Section** — Page section wrapper + SectionHeader
- **Heading** — H1, H2, H3, H4 with serif styling

## Where to Edit Copy

- **Homepage:** `src/app/page.tsx`
- **Product:** `src/app/product/page.tsx`
- **Solutions:** `src/app/solutions/page.tsx`
- **Investors:** `src/app/investors/page.tsx` (traction metrics, team bios)
- **About:** `src/app/about/page.tsx`
- **Intake questions:** `src/app/start/IntakeChat.tsx` (STEPS array)
- **Nav links:** `src/components/layout/Navbar.tsx`
- **Footer:** `src/components/layout/Footer.tsx`

## Analytics

A tiny analytics abstraction at `src/lib/analytics.ts`:

```ts
import { track } from "@/lib/analytics";
track("event_name", { key: "value" });
```

Logs to console in development. Replace the stub with your vendor (PostHog, Plausible, GA4, etc.).

## Build & Deploy

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

For production, swap SQLite for PostgreSQL by updating the Prisma schema datasource and adapter.
