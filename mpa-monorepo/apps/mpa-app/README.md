# mpa-app

An internal tool built with the **MPA Shell + SPA Islands** pattern using Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS.

## Table of Contents

- [Pattern overview](#pattern-overview)
- [Architecture](#architecture)
  - [MPA Shell](#mpa-shell)
  - [SPA Islands](#spa-islands)
  - [Auth layer](#auth-layer)
  - [Request lifecycle](#request-lifecycle)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Testing](#testing)
- [How to extend](#how-to-extend)

---

## Pattern overview

**MPA Shell + SPA Islands** combines two historically separate approaches:

| MPA (Multi-Page App) | SPA (Single-Page App) |
|---|---|
| Each URL is a full server-rendered page | A single HTML file with client-side routing |
| Fast initial load, good SEO | Highly interactive, no full-page reloads |
| Little or no client-side JavaScript | Ships a large JS bundle upfront |

The hybrid pattern takes the best of both:

- The **shell** (layout, navigation, page frame) is server-rendered on every navigation. The browser receives complete HTML immediately — no blank screen, no layout shift.
- The **islands** are discrete React components that hydrate in the browser and run as fully interactive mini-SPAs within the page. Each island manages its own state and re-renders independently without touching the server.

The boundary between shell and island is explicit in the code: shell components are plain async React Server Components; islands are marked `"use client"`.

---

## Architecture

### MPA Shell

The shell is everything that surrounds an island. It is composed of React Server Components and rendered entirely on the server.

**Root layout** (`app/layout.tsx`)

Sets the HTML document structure and loads global styles. Runs on every request. Has no client-side JavaScript.

**Protected layout** (`app/(protected)/layout.tsx`)

Wraps all authenticated routes. Responsibilities:
1. Calls `getSession()` — if the session is missing, redirects to `/login` as a server-side redirect before any HTML is sent
2. Renders the sidebar `<Nav>` component
3. Renders the `<main>` region where the page content goes

**Nav** (`components/nav/Nav.tsx`)

A Server Component. Reads the current pathname from a request header (forwarded by middleware) to highlight the active link. Because it is a Server Component, it ships zero JavaScript to the browser — the navigation is pure HTML `<a>` elements styled with Tailwind.

**Pages** (`app/(protected)/dashboard/page.tsx`, `app/(protected)/profile/page.tsx`)

Thin Server Components. Their only responsibilities are:
1. Fetching any server-side data needed by the island (e.g. `getSession()` to get the current user for the profile page)
2. Passing that data as props to the island component below them

The pages themselves render no interactive UI — they delegate entirely to their island.

### SPA Islands

Islands are React Client Components (`"use client"`). They receive their initial data as props from the server page above them and manage all subsequent state locally in the browser.

**DashboardIsland** (`components/islands/DashboardIsland.tsx`)

Owns:
- `range` state — the selected time window (`7d` / `30d` / `90d`)
- All metric data is defined locally as a typed constant — switching ranges is an instant client-side state update with no network request

Renders metric cards and a recent activity feed. The range selector buttons update `range` state, which causes the island to re-render with the corresponding data set.

**ProfileIsland** (`components/islands/ProfileIsland.tsx`)

Owns:
- `form` state — the current values of name and email fields
- `editing` state — whether the form is in view or edit mode
- `saved` state — whether to show the success confirmation

Receives `initialUser` as a prop from the server. In edit mode, fields become enabled and the save/cancel buttons appear. Cancel resets `form` state to the original `initialUser` values. Save commits the current `form` state and returns to view mode.

### Auth layer

**Middleware** (`middleware.ts`)

Runs as a Next.js Edge Function before every request — before any page or layout code executes. Checks for the `mpa_session` cookie:

- No cookie + protected route → redirect to `/login`
- Cookie present + `/login` → redirect to `/dashboard`
- All other cases → forward the request, adding an `x-pathname` header so Server Components can read the current path

Because the middleware runs at the edge, unauthenticated requests never reach the application server.

**`lib/auth.ts`**

The single source of truth for session logic. Exports:
- `SESSION_COOKIE` — the cookie name, used by middleware, login, and logout
- `STUB_USER` — the hardcoded user returned for any valid session (replace with a real user lookup)
- `getSession()` — reads the session cookie server-side and returns the user or `null`

This interface is designed so that replacing stub auth with a real provider (NextAuth, Lucia, etc.) requires changing only this file.

**Login** (`app/(auth)/login/page.tsx`)

A Server Component with an inline Server Action. The action:
1. Validates that username and password are non-empty (stub — any credentials work)
2. Sets the `mpa_session` cookie as `httpOnly` with a 1-day `maxAge`
3. Redirects to `/dashboard`

**Logout** (`app/api/logout/route.ts`)

A standard Next.js API route (`GET /api/logout`) rather than a Server Action. It:
1. Sets `mpa_session` to an empty value with `maxAge: 0`, which instructs the browser to delete the cookie
2. Redirects to `/login`

A dedicated API route is used instead of a Server Action because Server Action responses are handled by React's client-side router and their `Set-Cookie` headers are not always reliably processed by the browser. A `GET` route produces a standard HTTP redirect response whose `Set-Cookie` header is processed unconditionally.

### Request lifecycle

```
1. Browser requests GET /dashboard
        │
        ▼
2. Middleware (Edge)
   — reads mpa_session cookie
   — no cookie → redirect 307 /login
   — cookie present → forward request + set x-pathname header
        │
        ▼
3. Next.js Server renders (protected)/layout.tsx
   — getSession() reads cookie → returns STUB_USER
   — renders <Nav currentPath="/dashboard" />
   — renders <main>{children}</main>
        │
        ▼
4. Next.js Server renders dashboard/page.tsx
   — renders <DashboardIsland />
        │
        ▼
5. Complete HTML sent to browser
   — Nav is static HTML, no JS
   — DashboardIsland renders as its initial state HTML
        │
        ▼
6. Browser hydrates DashboardIsland
   — React takes over the island DOM
   — useState initialises (range = '7d')
   — Island is now fully interactive

User clicks "30d"
   — React re-renders DashboardIsland with range = '30d'
   — No network request, no server involvement
   — Rest of page (Nav, layout) is untouched
```

---

## Project structure

```
apps/mpa-app/
│
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout — Server Component
│   ├── page.tsx                      # / → redirect to /dashboard
│   ├── globals.css                   # Tailwind base styles
│   │
│   ├── (auth)/                       # Public route group (no auth required)
│   │   └── login/
│   │       └── page.tsx              # Login form + Server Action
│   │
│   ├── (protected)/                  # Authenticated route group
│   │   ├── layout.tsx                # Auth check + sidebar shell
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Renders DashboardIsland
│   │   └── profile/
│   │       └── page.tsx              # Fetches user, renders ProfileIsland
│   │
│   └── api/
│       └── logout/
│           └── route.ts              # GET /api/logout — clears cookie
│
├── components/
│   ├── nav/
│   │   └── Nav.tsx                   # Server Component — sidebar navigation
│   └── islands/
│       ├── DashboardIsland.tsx       # "use client" — metrics + range filter
│       └── ProfileIsland.tsx         # "use client" — editable profile form
│
├── lib/
│   └── auth.ts                       # getSession(), SESSION_COOKIE, STUB_USER
│
├── middleware.ts                     # Edge auth guard + pathname forwarding
│
├── __tests__/                        # Vitest unit tests
│   ├── lib/
│   │   └── auth.test.ts
│   └── components/islands/
│       ├── DashboardIsland.test.tsx
│       └── ProfileIsland.test.tsx
│
├── e2e/                              # Playwright E2E tests
│   ├── helpers/
│   │   └── auth.ts                   # authenticate() and loginViaUI() helpers
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   └── profile.spec.ts
│
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── vitest.config.ts
├── vitest.setup.ts
└── playwright.config.ts
```

### Route groups

Next.js route groups — directories wrapped in `(parentheses)` — define layout boundaries without affecting URLs:

- `(auth)` — pages that share no layout (just the root HTML). Currently only `/login`.
- `(protected)` — pages that share the authenticated shell layout (sidebar + auth check). `/dashboard` and `/profile`.

Adding a new protected page means creating a new directory under `(protected)/` — it automatically inherits the auth check and sidebar.

---

## Getting started

**Prerequisites:** Node.js 20+

```bash
# From the monorepo root
npm install

# Start the development server
npm run dev:mpa

# Or from within the app
cd apps/mpa-app
npm run dev
```

The app runs at `http://localhost:3000`. Sign in with any non-empty username and password.

```bash
# Production build (also runs TypeScript type checking)
npm run build

# Start the production server
npm start
```

---

## Testing

### Unit tests (Vitest + React Testing Library)

Tests for pure logic and component behaviour in isolation. Server-side Next.js modules (`next/headers`, `next/navigation`) are mocked in `vitest.setup.ts`.

```bash
npm test                  # run once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

| File | What it tests |
|---|---|
| `__tests__/lib/auth.test.ts` | `getSession()` — cookie present/absent/empty |
| `__tests__/components/islands/DashboardIsland.test.tsx` | Initial render, range switching, change indicators |
| `__tests__/components/islands/ProfileIsland.test.tsx` | View/edit/save/cancel flows, field state |

### E2E tests (Playwright)

Tests the full application running against the Next.js dev server. The dev server starts automatically before the tests run.

```bash
npm run test:e2e          # headless
npm run test:e2e:ui       # Playwright UI mode
```

| File | What it tests |
|---|---|
| `e2e/auth.spec.ts` | Redirect guards, login flow, logout, cookie lifecycle |
| `e2e/dashboard.spec.ts` | Layout, metrics by range, activity feed, navigation |
| `e2e/profile.spec.ts` | View/edit/save/cancel flows in the browser |

The `e2e/helpers/auth.ts` file provides two helpers used in `beforeEach` blocks:
- `authenticate(context)` — injects the session cookie directly, bypassing the login UI (fast)
- `loginViaUI(page)` — fills the login form and submits it (used to test the login flow itself)

---

## How to extend

### Add a new protected page

1. Create `app/(protected)/your-page/page.tsx` — it inherits the auth check and sidebar automatically
2. Create `components/islands/YourPageIsland.tsx` with `"use client"` at the top
3. Render the island from the page, passing any server-fetched data as props
4. Add a nav item to the `navItems` array in `components/nav/Nav.tsx`

### Replace stub auth

All auth logic is isolated in `lib/auth.ts` and `app/api/logout/route.ts`:

1. Replace `getSession()` in `lib/auth.ts` to read from a real session store (JWT, database session, etc.)
2. Replace the login Server Action in `app/(auth)/login/page.tsx` to validate against a real provider
3. Update `app/api/logout/route.ts` if your provider requires server-side session invalidation

The middleware, layouts, and pages call only `getSession()` — they do not need to change.

### Add server-fetched data to an island

Fetch data in the page (Server Component) and pass it as a typed prop to the island:

```tsx
// app/(protected)/your-page/page.tsx
import YourIsland from '@/components/islands/YourIsland'

export default async function YourPage() {
  const data = await fetchYourData()   // runs on the server
  return <YourIsland initialData={data} />
}
```

The island receives `initialData` as a prop and manages any subsequent updates locally or via `fetch` calls to your API.

### Add shared packages

Place shared code in `packages/` at the monorepo root and reference it via the workspace name in `package.json`. Shared UI components, utility functions, or TypeScript types that multiple apps need belong there.
