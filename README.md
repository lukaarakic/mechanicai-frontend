<div align="center">

# 🔧 MechanicAI — Frontend

**Next.js frontend for MechanicAI — an AI-powered vehicle diagnostics platform.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Paddle](https://img.shields.io/badge/Paddle-Billing-0052CC?style=flat-square)](https://paddle.com/)

[Live Demo](https://mechanicai.lukarakic.me) · [Backend Repo](https://github.com/lukaarakic/mechanicai-backend) · [Report Bug](mailto:admin@lukarakic.me)

</div>

---

## ✨ Overview

MechanicAI lets users describe a car problem in plain language and receive a structured, progressive diagnosis through a 4-step AI pipeline. This repo is the Next.js frontend — it handles all UI, auth flows, onboarding, chat, subscription management, and history. The Rails API lives in a separate repo linked above.

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server Actions for mutations keep auth context on the server |
| **Language** | TypeScript | End-to-end type safety across API contracts and UI |
| **Styling** | Tailwind CSS v4 | Custom design tokens without a config file |
| **Billing** | Paddle.js | Client-side checkout overlay, subscription state managed via webhooks on the backend |
| **Auth** | JWT + httpOnly cookies | Tokens stored in httpOnly cookies |
---

## 🏗️ Architecture

```
Browser
  ├── Next.js (Vercel)
  |     ├── Server Actions (auth, onboarding, chat, subscription mutations)
  |     ├── RSC (history, settings pages — data fetched server-side)
  |     └── Paddle.js overlay (subscription checkout)
  └── Rails
```

---

## 📋 Features

### Onboarding
- Multi-step onboarding flow on first login — collects user profile and vehicle information (make, model, year, mileage) before the first diagnostic session
- Conditionally rendered from the layout — users land directly in the app without a separate onboarding route

### Diagnostic Chat
- Start a new diagnostic session by selecting a vehicle and describing the problem
- Messages streamed progressively through the 4-step pipeline on the backend
- Full chat history with past diagnostic sessions, browsable from the sidebar
- `useTransition` on message send for optimistic loading state

### Subscription Management
- Free and Pro tiers gated at the feature level
- Paddle.js checkout overlay for upgrades
- Subscription cancellation with confirmation prompt
- Subscription status synced via backend webhooks — UI reflects current entitlements on every load

### Authentication
- Registration, login, logout
- Email verification flow — non-blocking, users can start using the app immediately
- Forgot password and reset password with form validation
- JWT stored in httpOnly cookies, never exposed to client JS
- Protected routes via Next.js middleware

### Settings
- Profile management
- Vehicle information updates
- Subscription management (upgrade, cancel)
- Account deletion

---

## 🚀 Local Setup

### Prerequisites
- Node.js 20+
- MechanicAI API running locally ([backend repo](https://github.com/lukarakic/mechanicai-api))

### Steps

```bash
git clone https://github.com/lukarakic/mechanicai-web
cd mechanicai-web
npm install
npm run dev
```

App runs at `http://localhost:3000`

### Environment Variables

```env
API_URL=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_PRICE_ID=
```

---

## 🔭 Roadmap

- [ ] Streaming diagnostic responses via SSE
- [ ] Structured AI output — strict diagnosis schema with severity enum and causes array
- [ ] Image upload — diagnose from a photo of the dashboard warning light
- [ ] E2E testing with Playwright

---

## 📄 License

Distributed under the MIT License.

---

<div align="center">

Made with ☕, 🍺 and way too many open tabs.

</div>
