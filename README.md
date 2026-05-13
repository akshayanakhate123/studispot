# Studi Spot

> Find, book & check into study spaces near you — in under 30 seconds.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-8B5CF6.svg)](#license)

---

## Hero Section

**Studi Spot** is a mobile-first web application that eliminates the uncertainty students face when searching for a place to study. During exam season, libraries fill up, cafes get noisy, and students waste precious time wandering between locations.

**Key outcome:** Real-time seat availability, confidence scoring, and instant booking — so students spend less time searching and more time studying.

---

## Problem Statement

### What problem exists

Students — especially during exam periods — face a critical but underserved problem: **finding a reliable place to study, right now.**

- Libraries are often at full capacity with no visibility into availability
- Cafes are noisy, crowded, and unpredictable
- Existing solutions (Google Maps, word-of-mouth) provide zero real-time seat data
- Students waste 15–30 minutes physically checking multiple locations

### Why current solutions are insufficient

| Approach | Limitation |
|----------|------------|
| Google Maps | Shows locations, not seat availability |
| University portals | Static timetables, no real-time occupancy |
| Cafe hopping | Time-consuming, unreliable, no guarantee of quiet |
| WhatsApp groups | Informal, fragmented, quickly outdated |

### Why this project matters

Time spent searching is time not studying. For students in high-pressure academic environments, this friction directly impacts productivity, stress levels, and academic performance. Studi Spot brings the convenience of real-time booking — common in ride-sharing and food delivery — to the study space economy.

---

## Solution Overview

### How the product solves the problem

Studi Spot aggregates study spaces (cafes, libraries, coworking spaces, study hubs) and surfaces real-time availability with a **Confidence Score** — a predictive metric that factors in time of day, historical occupancy, noise levels, and current bookings.

### Core workflow

```text
Discover → Filter → Book → Confirm → Check In → Study
```

### User journey

1. **Discover** — Open the app, see nearby spaces sorted by distance with live seat counts
2. **Evaluate** — Compare Confidence Scores, prices, zones (Quiet vs Group), and amenities
3. **Book** — Select zone and duration, pay via in-app wallet, receive QR entry code
4. **Check In** — Scan or verify within 20 minutes to secure the seat
5. **Study** — Track session with live timer; extend or end anytime

### Key differentiators

| Feature | Impact |
|---------|--------|
| Confidence Score | Predictive availability reduces guesswork |
| Focus Guarantee | Premium badge: "Guaranteed quiet or refund" |
| Auto-release logic | No-show seats freed after 20 min for others |
| In-app wallet | Frictionless payments, no external redirects |
| Smart banner filters | One-tap filtering by demand, quietness, or urgency |

---

## Features

### Core Features

- **Real-time Seat Availability** — Live seat counts across Quiet and Group zones
- **Confidence Scoring** — Predictive score (0–100%) based on occupancy patterns, time, and noise
- **Instant Booking** — Select zone + duration, pay, and confirm in under 30 seconds
- **QR Entry Code** — Digital pass generated on confirmation for seamless check-in
- **Check-in Timer** — 20-minute hold window with countdown; auto-release if missed
- **Session Management** — Live countdown, extend session, or end early

### Smart Discovery Features

- **Interactive Hero Banner** — Swipeable carousel with one-tap filters:
  - Exam Rush → high-demand locations
  - Premium Quiet Spaces → Focus Guarantee venues
  - Last Minute Booking → low-availability urgency filter
- **Smart Highlighting** — "Best Option Right Now" auto-badged by highest Confidence Score
- **Dynamic Filtering** — URL-driven filter states with instant list updates

### Wallet & Payments Features

- **In-app Wallet** — Top-up with preset/custom amounts (₹100 / ₹200 / ₹500)
- **Auto-deduction** — Booking amount deducted automatically on confirm
- **Insufficient Balance Guard** — Prompts "Add Money" modal if balance is low
- **Transaction History** — Full log of debits (bookings) and credits (top-ups)

### Profile & Personalization Features

- **User Profile** — Name, age, gender, DOB, college
- **Edit Profile Modal** — Inline editing with save/cancel
- **Payment History** — Chronological transaction list with debited/credited labels

### User Experience Features

- **Mobile-first Design** — Clean, minimal card-based UI optimized for fast decision-making
- **Framer Motion Animations** — Snappy page transitions and micro-interactions
- **Toast Confirmations** — Visual feedback for every action ("Payment Successful", "Profile Updated")
- **Bottom Navigation** — Persistent Search / Bookings / Profile tabs

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript 5 | UI layer with strict typing |
| **Styling** | Tailwind CSS 3 + shadcn/ui | Utility-first design system |
| **Animations** | Framer Motion | Page transitions, gestures, micro-interactions |
| **Routing** | React Router v6 | SPA navigation with URL-driven filters |
| **State Management** | React Context API | Global booking + wallet state |
| **Build Tool** | Vite 5 | Fast dev server and optimized builds |
| **Testing** | Vitest + Playwright | Unit and E2E test coverage |
| **Linting** | ESLint + TypeScript ESLint | Code quality and consistency |

---

## Architecture / System Design

### High-level architecture

Studi Spot is a **client-side single-page application (SPA)** built with a modular component architecture. State is managed via React Context for two core domains: bookings and wallet/user profile.

```
┌─────────────────────────────────────────────┐
│                 Browser                      │
│  ┌───────────────────────────────────────┐  │
│  │           React SPA (Vite)            │  │
│  │  ┌─────────┐  ┌─────────────────────┐ │  │
│  │  │  Pages  │  │   Context Providers │ │  │
│  │  │ Home    │  │ ┌─────────────────┐ │ │  │
│  │  │ Details │  │ │ BookingProvider │ │ │  │
│  │  │ Booking │  │ │ WalletProvider  │ │ │  │
│  │  │ Session │  │ └─────────────────┘ │ │  │
│  │  │ ...     │  └─────────────────────┘ │  │
│  │  └─────────┘                            │  │
│  │  ┌─────────┐  ┌─────────────────────┐   │  │
│  │  │ Components│  │   UI Components     │   │  │
│  │  │ HeroBanner│  │   (shadcn/ui)       │   │  │
│  │  │ SpaceCard │  │   Dialog, Toast...  │   │  │
│  │  │ BottomNav │  └─────────────────────┘   │  │
│  │  └─────────┘                            │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Data flow

```
User Action
    │
    ▼
┌──────────────┐     ┌─────────────┐     ┌─────────────┐
│   Page/Component  │────▶│   Context   │────▶│   Mock Data  │
│  (Home, Booking)  │     │  (Booking/  │     │ (studySpaces,│
│                   │     │   Wallet)   │     │ transactions)│
└──────────────┘     └─────────────┘     └─────────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │  UI Re-render  │
                       │  (React state) │
                       └─────────────┘
```

### Component breakdown

| Component | Responsibility |
|-------------|--------------|
| `HeroBanner` | Swipeable promotional carousel with filter navigation |
| `SpaceCard` | Study space card with seat count, confidence score, price |
| `BottomNav` | Persistent tab navigation (Search / Bookings / Profile) |
| `AddMoneyModal` | Wallet top-up with preset amounts + custom input |
| `EditProfileModal` | Inline profile editing form |
| `BookingProvider` | Manages current booking lifecycle (create, checkIn, end, extend) |
| `WalletProvider` | Manages balance, transactions, and user profile |

---

## Folder Structure

```
├── public/
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives (Dialog, Toast, Button, etc.)
│   │   ├── AddMoneyModal.tsx
│   │   ├── BottomNav.tsx
│   │   ├── EditProfileModal.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── NavLink.tsx
│   │   └── SpaceCard.tsx
│   ├── lib/
│   │   ├── booking-context.tsx   # Booking state + lifecycle
│   │   ├── mock-data.ts          # Study spaces seed data
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── utils.ts              # cn() helper + utilities
│   │   └── wallet-context.tsx    # Wallet + profile state
│   ├── pages/
│   │   ├── ActiveSessionPage.tsx
│   │   ├── BookingPage.tsx
│   │   ├── BookingsPage.tsx
│   │   ├── CheckInPage.tsx
│   │   ├── ConfirmationPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SpaceDetailsPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              # Tailwind + custom design tokens
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

---

## Usage

### How users interact with the product

Studi Spot is designed for **mobile-first** usage. Students open the app, glance at nearby spaces, and make a decision in seconds.

### Typical workflow

1. **Open app** → See "Available in the next 10 mins" with live seat totals
2. **Browse cards** → Compare Confidence Score, available seats, distance, and price
3. **Tap a space** → View zone options (Quiet / Group), amenities, and duration
4. **Tap "Book Seat"** → Review booking summary on confirmation screen
5. **Confirm & Pay** → Wallet auto-deducts; QR code generated
6. **Check in** → Verify within 20 minutes to secure seat
7. **Track session** → Live timer with option to extend or end

### Example use cases

| Persona | Scenario | Action |
|---------|----------|--------|
| **Exam-week student** | Library is full at 9 PM | Opens app, filters "Last Minute Booking", books a cafe quiet zone |
| **Group project team** | Needs a collaborative space | Selects "Group Zone" at a study hub, books 4-hour session |
| **Budget-conscious student** | Prefers free options | Sorts by price, books Central Library (₹0/hr) |
| **Premium user** | Needs guaranteed silence | Filters by "Focus Guarantee", books WorkHub Co. with refund promise |

---

## Product Thinking

### Target users / personas

| Persona | Description | Core Need |
|---------|-------------|-----------|
| **The Exam Cruncher** | Undergraduate during finals | Guaranteed quiet, fast booking, minimal friction |
| **The Group Collaborator** | Project team of 3–4 | Group zones, reliable WiFi, extended hours |
| **The Budget Student** | Self-funded, cost-conscious | Free/low-cost options with clear pricing |
| **The Remote Learner** | Post-grad, flexible schedule | Premium quiet spaces, long sessions, amenities |

### Business value

- **For students:** Eliminates search friction, guarantees study environment quality, saves time
- **For space operators:** Drives occupancy during off-peak hours, reduces no-shows via auto-release
- **For the platform:** Transaction revenue (wallet top-ups, booking fees), data on study patterns

### Scalability considerations

| Area | Current | Future |
|------|---------|--------|
| Data | Mock data | PostgreSQL with real-time occupancy sync |
| Auth | None (local state) | OAuth 2.0 / JWT with persistent profiles |
| Payments | In-app wallet (mock) | Razorpay / Stripe integration |
| Real-time | Static mock | WebSocket feed from IoT seat sensors |
| Search | Basic filter | Algolia-powered full-text + geo search |
| Maps | None | Mapbox integration with pin clustering |

### Future roadmap

| Phase | Feature | Impact |
|-------|---------|--------|
| v1.1 | Search bar with filters (name, type, amenities) | Faster discovery |
| v1.2 | Map view with location pins | Visual proximity browsing |
| v1.3 | Push notifications (check-in reminders, session expiry) | Reduced no-shows |
| v1.4 | User authentication + persistent bookings | Cross-device continuity |
| v2.0 | Partner dashboard for space owners | Supply-side onboarding |
| v2.1 | AI-powered demand forecasting | Smarter Confidence Scoring |

### Metrics / KPIs

| Metric | Target | Why it matters |
|--------|--------|--------------|
| **Time to Book** | < 30 seconds | Core UX promise |
| **Booking Completion Rate** | > 85% | Friction indicator |
| **Check-in Rate** | > 90% | No-show efficiency |
| **Confidence Score Accuracy** | ±10% of actual availability | Trust & retention |
| **Wallet Top-up Frequency** | 2× per active user/month | Revenue signal |

---

## License

MIT © Studi Spot
