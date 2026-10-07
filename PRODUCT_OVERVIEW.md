# DashClue — Product Overview

## What the App Does

DashClue is an AI-powered vehicle diagnostics SaaS. Users describe a car problem in plain English, pick which of their registered vehicles it applies to, and receive a structured AI-generated diagnosis. The backend runs a 4-step AI pipeline (details hidden in the Rails API); this frontend handles everything the user sees and interacts with. It is a full commercial product with authentication, billing, and subscription-gated features.

---

## Core Features

### Authentication
- Email/password registration with validation (email, 8–50 char password)
- JWT stored in httpOnly cookies — never exposed to client JavaScript
- Email verification flow (non-blocking — users can start using the app immediately)
- Forgot/reset password via secure token link
- Server-side logout clearing cookies
- Middleware (`proxy.ts`) enforces route protection — unauthenticated users are redirected to `/login`

### Onboarding (2-Step Modal)
- **Step 1 — Profile**: First name, last name, and avatar selection. Avatars are generated via the DiceBear API with a "reroll" button for random regeneration.
- **Step 2 — Vehicle**: Make, model, year (1900–current), engine displacement (50–10,000 cc), and power (1–1,000 hp/kW).
- Modal renders over the main app; users are not blocked from navigating away, but diagnostics require at least one vehicle.

### Diagnostic Chat
- User selects a registered vehicle and describes the problem (min 10 characters)
- AI response streams progressively (real-time via the backend pipeline)
- Each diagnostic session is tagged with a category (Engine, Brakes, Suspension, Transmission, Steering, Battery, Fuel System, Cooling, Electrical, Exhaust, Tires, Sensors, Unknown) and a generated title
- Users can continue an existing chat session (multi-turn conversations supported)
- AI responses are rendered as formatted Markdown
- Optimistic UI updates via `useOptimistic` for immediate feedback on message send

### Diagnostic History
- Browse all past diagnostic sessions in a card grid
- Each card shows: vehicle, category badge (color-coded), title, and date
- **Gated**: requires Pro subscription

### Settings — Account
- Update first name and last name
- Change password (validated)
- View email (read-only, verified status)
- Delete account (in "danger zone")

### Settings — Vehicles
- Add vehicles (full make/model/year/engine/power form)
- Remove vehicles
- Free tier: 1 vehicle max; Pro: multiple

### Settings — Subscription
- View current plan (Free vs. Pro)
- Upgrade to Pro ($7/month) via Paddle.js checkout overlay
- Cancel subscription with confirmation prompt
- Shows next billing date for active Pro subscribers
- Free tier limits: 3 diagnostics/month, 1 vehicle, basic AI model, no history
- Pro tier: unlimited diagnostics, multiple vehicles, GPT-5 model, full history, priority support

### Navigation
- Desktop: fixed left sidebar with home, history, new chat, settings, and user profile popover
- Mobile: bottom navigation bar
- Switches at the `md:` (768px) breakpoint

---

## Pain Points It Solves

1. **Decoding cryptic car symptoms** — Most people cannot translate "clunking noise when I brake" into a mechanical diagnosis. The app bridges that gap with plain-language input.
2. **Cost of diagnostic appointments** — Getting a car looked at just to be told what might be wrong is expensive. This gives a first-pass diagnosis instantly and for free (within tier limits).
3. **Tracking problems across time** — History lets users keep a log of issues per vehicle, useful when symptoms recur or for pre-sale documentation.
4. **Multi-vehicle households** — The vehicle management system handles multiple cars (Pro), rather than forcing one profile per account.

---

## User Journey

1. **Land on `/register`** → create account with email/password
2. **Redirected to dashboard (`/`)** → onboarding modal appears
3. **Complete onboarding** → set name + avatar, register first vehicle
4. **Click "New Chat"** → at `/chat`, select vehicle, describe the problem
5. **Receive streaming diagnosis** → AI response renders progressively; session saved automatically
6. **Dashboard shows recent diagnostics** → quick access to last sessions
7. **Browse `/history`** → full archive of all sessions (Pro required)
8. **Upgrade at `/settings/subscription`** → Paddle overlay handles payment
9. **Manage account** at `/settings/account` and vehicles at `/settings/cars`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router, v16) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Billing | Paddle.js (client-side overlay) |
| Markdown | react-markdown |
| Dates | date-fns |
| Popovers | react-tiny-popover |
| Avatars | DiceBear API |
| Icons | SVGs imported as React components via SVGR |
| Auth | httpOnly cookie JWT (issued by Rails backend) |
| API | Rails backend at `process.env.API_URL`; all calls via Server Actions |

**Notable architectural decisions:**
- All API calls are made in Server Actions — no API keys or tokens ever reach the browser
- `useActionState` + Zod drives every form (consistent pattern throughout)
- Route groups `(app)` and `(auth)` isolate layouts cleanly
- No external state management library — React's `useOptimistic` / `useTransition` handles all async UI

---

## Gaps and Rough Edges

> Confirmed from the code — not speculation.

1. **Streaming not yet fully implemented**: The chat architecture supports streaming (the backend pipeline is described as streaming), but the client-side implementation of SSE/streaming rendering is noted as a roadmap item. Currently messages may be received as a complete response rather than token-by-token.

2. **History is feature-gated but enforcement is client-side only**: The history page renders a lock/upsell if the user is not subscribed, but the actual guard depends on the backend also rejecting the API call — it is not clear from the frontend alone whether the backend enforces this independently.

3. **No image upload**: The diagnostic form is text-only. There is no way to attach a photo of a dashboard warning light or engine bay, which would be a natural extension of the product.

4. **Dashboard home page is minimal**: The root `/` page shows a greeting and recent diagnostics, but the scope of what "recent diagnostics" shows and how it is populated is thin relative to the rest of the product.

5. **No E2E or unit tests**: There are no test files anywhere in the repository. The codebase is clean (no TODOs or FIXMEs found), but untested.

6. **Onboarding is skippable with no enforcement**: Users can dismiss the modal without completing either step. The only enforcement is that starting a diagnostic requires a vehicle — but profile completion (name/avatar) has no hard gate.

7. **`category: null` is a valid chat state**: The `DiagnosticCategory` type allows `null`, meaning some diagnostics may never be categorized (possibly a backend-side gap, not a frontend one — but worth noting).

8. **No error boundary for the chat stream**: The `error.tsx` files exist at the route level, but fine-grained error recovery during a streaming diagnostic response (e.g., backend pipeline failure mid-stream) is not apparent from the frontend code.

---

## Route Map

| Route | Visibility | Purpose |
|---|---|---|
| `/` | Protected | Dashboard: greeting, recent diagnostics, new chat button |
| `/chat` | Protected | New diagnostic form: select vehicle, describe problem |
| `/chat/[id]` | Protected | Chat detail: messages + message form; can continue session |
| `/history` | Protected (Pro) | Browse all past diagnostics |
| `/settings` | Protected | Redirect to account settings |
| `/settings/account` | Protected | Profile, password, account deletion |
| `/settings/cars` | Protected | Add/remove vehicles |
| `/settings/subscription` | Protected | View plan, upgrade to Pro, manage billing |
| `/login` | Public | Email/password login form |
| `/register` | Public | Create account form |
| `/forgot-password` | Public | Request password reset |
| `/reset-password?token=...` | Public | Set new password |
| `/verify?token=...` | Public | Email verification confirmation |

---

## Data Types

```typescript
type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  onboarding_done: boolean;
  subscribed: boolean;
};

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};

type Chat = {
  id: string;
  created_at: string;
  title: string;
  category: DiagnosticCategory | null;
  car: Car;
};

type Car = {
  id: string;
  make: string;
  model: string;
  year: number | "";
  size: number | ""; // cc
  power: number | ""; // kW
};

type DiagnosticCategory =
  | "SUSPENSION" | "ENGINE" | "BRAKES" | "TRANSMISSION"
  | "STEERING" | "BATTERY" | "FUEL_SYSTEM" | "COOLING"
  | "ELECTRICAL" | "EXHAUST" | "TIRES" | "SENSORS" | "UNKNOWN";
```

---

## Environment Variables

```env
API_URL=http://localhost:3001            # Backend Rails API URL
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=...     # Paddle checkout token
NEXT_PUBLIC_PADDLE_PRICE_ID=...         # Paddle price ID for Pro plan
```
