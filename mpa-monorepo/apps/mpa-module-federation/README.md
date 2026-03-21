# mpa-module-federation (host)

A **server-rendered shell + client-side Module Federation** app built with **Next.js 15 App Router**, React 19, and TypeScript. The host server-renders its chrome (navigation, headings, layout) on every request. Widget content is loaded at runtime in the browser from a separately deployed remote via Module Federation — the remote only publishes a browser bundle, so widgets cannot be server-rendered by the host.

## Table of Contents

- [Pattern overview](#pattern-overview)
- [Architecture](#architecture)
  - [Host and remote relationship](#host-and-remote-relationship)
  - [Server rendering and client islands](#server-rendering-and-client-islands)
  - [Middleware and active navigation](#middleware-and-active-navigation)
  - [Widget loaders](#widget-loaders)
  - [Module Federation configuration](#module-federation-configuration)
  - [TypeScript declarations for remote modules](#typescript-declarations-for-remote-modules)
  - [Shared dependencies](#shared-dependencies)
- [Runtime loading sequence](#runtime-loading-sequence)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Testing](#testing)
- [How to extend](#how-to-extend)

---

## Pattern overview

This app combines two patterns:

| Pattern | What it provides |
|---|---|
| **MPA navigation** | Nav links are plain `<a>` tags — each click is a full HTTP request and a new server-rendered document, not a client-side route transition |
| **Module Federation** | Widget code is fetched at runtime from a separately deployed remote — the host does not bundle or own widget code |

**What is and isn't server-rendered:**

| Part | Rendered where | Notes |
|---|---|---|
| Nav, headings, page layout | Server | Arrives as complete HTML on every request |
| `DashboardWidget`, `ProfileWidget` | Browser only | `ssr: false` — remote publishes a browser-only bundle; server sends a skeleton fallback until the widget loads |

The MPA navigation semantics (full page reloads, no client-side router) are genuine. However, the primary content of each page — the widgets — is loaded client-side via Module Federation after hydration. Users see a skeleton until JavaScript fetches and renders the remote chunk. This is the inherent trade-off of combining Module Federation (which does not support SSR for remote modules) with a server-rendered host.

**Module Federation roles:**

| Role | This app | Counterpart |
|---|---|---|
| **Host** | `apps/mpa-module-federation` (port 4000) | Consumes remote modules |
| **Remote** | `apps/mpa-module-federation-remote` (port 4001) | Exposes modules for consumption |

---

## Architecture

### Host and remote relationship

```
Browser requests GET /dashboard
        │
        ▼
Next.js server renders HTML (shell only):
  <aside>…Nav with active Dashboard link…</aside>
  <main>
    <h1>Dashboard</h1>
    <div class="animate-pulse">…WidgetFallback skeleton…</div>
  </main>
        │
        ▼
Browser displays shell immediately — nav + heading visible before any JS runs
Widget content is a skeleton at this point
        │
        ▼
React hydrates the page client-side
DashboardWidgetLoader (client component) triggers next/dynamic
        │
        ▼
Browser fetches http://localhost:4001/mf-manifest.json
  — MF runtime negotiates shared react@19 → reuses host's copy
  — Fetches the DashboardWidget chunk from :4001
  — Widget renders inside the Suspense slot, replacing the skeleton
```

### Server rendering and client islands

The App Router distinguishes between **Server Components** (run only on the server, never in the browser) and **Client Components** (hydrated in the browser).

| File | Type | Rendered where |
|---|---|---|
| `app/(main)/layout.tsx` | Server Component | Server — reads `x-pathname` header to set active nav |
| `app/(main)/dashboard/page.tsx` | Server Component | Server — renders heading + Suspense shell |
| `app/(main)/profile/page.tsx` | Server Component | Server — renders heading + Suspense shell |
| `components/Nav.tsx` | Server Component | Server — prop-based, no browser APIs |
| `components/DashboardWidgetLoader.tsx` | Client Component (`"use client"`) | Browser — uses `next/dynamic` to load federated widget |
| `components/ProfileWidgetLoader.tsx` | Client Component (`"use client"`) | Browser — uses `next/dynamic` to load federated widget |

The widget loaders are client islands: the server renders their Suspense fallback (`WidgetFallback`) as part of the initial HTML, which is replaced by the federated widget once the remote chunk loads in the browser.

### Middleware and active navigation

`middleware.ts` runs at the Edge before every request and stamps the current path onto a response header:

```ts
response.headers.set('x-pathname', request.nextUrl.pathname)
```

`app/(main)/layout.tsx` reads this header with `next/headers` to determine which nav item to highlight — without making the pages themselves dynamic:

```ts
const pathname = headersList.get('x-pathname') ?? ''
const currentPage = pathname.startsWith('/profile') ? 'profile' : 'dashboard'
```

`Nav` is a plain prop-based Server Component. It receives `currentPage` and renders the correct active styles at server render time, so the nav arrives in HTML already highlighted correctly — no flash of inactive state.

### Widget loaders

The remote only publishes a browser bundle — it cannot be SSR'd by the host's Node.js process. The widget loader components use `next/dynamic` with `ssr: false` to prevent the server from attempting to render them:

```tsx
// components/DashboardWidgetLoader.tsx
'use client'
import dynamic from 'next/dynamic'

const DashboardWidget = dynamic(() => import('remote/DashboardWidget'), { ssr: false })

export default function DashboardWidgetLoader() {
  return <DashboardWidget />
}
```

The parent page wraps the loader in `<Suspense fallback={<WidgetFallback />}>`, so the skeleton renders in the server HTML and is replaced once the widget loads client-side.

### Module Federation configuration

`next.config.ts` adds the `ModuleFederationPlugin` to the **client-side** webpack bundle only:

```ts
webpack(config, { isServer }) {
  if (!isServer) {
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'host',
        remotes: { remote: 'remote@http://localhost:4001/remoteEntry.js' },
        shared: {
          react:     { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        },
      }),
    )
  }
  return config
},
```

The `isServer` guard keeps Module Federation out of the server bundle, where it cannot reach the remote's browser-only entry point.

### TypeScript declarations for remote modules

`types/remote.d.ts` provides ambient module declarations so TypeScript resolves federated imports:

```ts
declare module 'remote/DashboardWidget' {
  const DashboardWidget: React.ComponentType
  export default DashboardWidget
}
```

These are build-time only — they do not affect the runtime.

### Shared dependencies

`react` and `react-dom` are declared as shared singletons in both the host and the remote. The Module Federation runtime ensures only one copy of React runs in the page, which is required for React hooks to work correctly across the host/remote boundary.

---

## Runtime loading sequence

```
1. Browser: GET /dashboard
        │
        ▼
2. Next.js server renders HTML (shell only — widget is a skeleton):
   <aside>…Dashboard active…</aside>
   <h1>Dashboard</h1>
   <div class="animate-pulse">…WidgetFallback…</div>
        │
        ▼
3. Browser displays shell — nav and heading visible, widget still a skeleton
        │
        ▼
4. React hydrates the page
   DashboardWidgetLoader (client) fires next/dynamic import
        │
        ▼
5. Browser fetches http://localhost:4001/mf-manifest.json
   MF runtime: react@19 already loaded → reuse host copy
   Fetches DashboardWidget chunk from :4001
        │
        ▼
6. Suspense resolves: WidgetFallback → DashboardWidget rendered

User clicks "Profile" link → full page navigation (<a> tag — new HTTP request, new document)
        │
        ▼
7. Next.js server renders /profile HTML (shell only):
   <aside>…Profile active…</aside>
   <h1>Profile</h1>
   <div class="animate-pulse">…WidgetFallback…</div>
        │
        ▼
8. React hydrates, ProfileWidgetLoader fires
   manifest cached → fetches ProfileWidget chunk
   Suspense resolves: WidgetFallback → ProfileWidget rendered
```

---

## Project structure

```
apps/mpa-module-federation/
│
├── app/
│   ├── globals.css                       # Tailwind base styles
│   ├── layout.tsx                        # Root layout — html/body, imports CSS
│   ├── page.tsx                          # Root redirect → /dashboard
│   └── (main)/
│       ├── layout.tsx                    # Shell — reads x-pathname, renders Nav
│       ├── dashboard/
│       │   └── page.tsx                  # Dashboard heading + DashboardWidgetLoader
│       └── profile/
│           └── page.tsx                  # Profile heading + ProfileWidgetLoader
│
├── components/
│   ├── Nav.tsx                           # Server Component — sidebar navigation
│   ├── WidgetFallback.tsx                # Skeleton loader (3 pulsing rectangles)
│   ├── DashboardWidgetLoader.tsx         # "use client" — next/dynamic ssr:false
│   └── ProfileWidgetLoader.tsx           # "use client" — next/dynamic ssr:false
│
├── types/
│   └── remote.d.ts                       # Ambient declarations for remote/* imports
│
├── __mocks__/
│   ├── DashboardWidget.tsx               # Test stub aliased by vitest.config.ts
│   └── ProfileWidget.tsx                 # Test stub aliased by vitest.config.ts
│
├── __tests__/
│   ├── components/
│   │   ├── Nav.test.tsx
│   │   ├── DashboardWidgetLoader.test.tsx
│   │   └── ProfileWidgetLoader.test.tsx
│   └── pages/
│       ├── DashboardPage.test.tsx
│       └── ProfilePage.test.tsx
│
├── e2e/
│   ├── navigation.spec.ts               # URL changes, active links, back/forward, reload
│   ├── dashboard.spec.ts                # Metrics, range selector, activity feed
│   └── profile.spec.ts                  # Form, editing, save flow
│
├── middleware.ts                         # Stamps x-pathname header on every request
├── next.config.ts                        # ModuleFederationPlugin (client bundle only)
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts                      # Aliases remote/* to __mocks__/ stubs
├── vitest.setup.ts                       # jest-dom matchers + next/dynamic mock
└── playwright.config.ts                  # Starts both servers before E2E tests run
```

---

## Getting started

**Prerequisites:** Node.js 20+

Both the host and the remote must be running. The remote exposes `remoteEntry.js` which the host fetches at runtime in the browser.

```bash
# From the monorepo root — starts both apps concurrently
npm run dev:mf

# Or start each app manually in separate terminals:
npm run dev:mf:remote   # starts remote at http://localhost:4001
npm run dev:mf:host     # starts host  at http://localhost:4000
```

Open `http://localhost:4000` in your browser.

```bash
# Production build (remote must be built before host)
npm run build:mf

# Run host in production mode (with remote dev server still running)
npm run start:mf
```

---

## Testing

### Unit tests (Vitest + React Testing Library)

Unit tests run in jsdom — no dev servers, no network.

**Mocking strategy:**

| Concern | Solution |
|---|---|
| `remote/DashboardWidget` import | Aliased in `vitest.config.ts` to `__mocks__/DashboardWidget.tsx` (stub renders `data-testid`) |
| `remote/ProfileWidget` import | Same pattern |
| `next/dynamic` | Mocked in `vitest.setup.ts` to return `React.lazy(factory)` — works with existing Suspense boundaries in pages |

```bash
npm test                  # run once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

| File | What it tests |
|---|---|
| `__tests__/components/Nav.test.tsx` | Title, links, hrefs, active class for dashboard/profile |
| `__tests__/components/DashboardWidgetLoader.test.tsx` | Widget stub renders after lazy load |
| `__tests__/components/ProfileWidgetLoader.test.tsx` | Widget stub renders after lazy load |
| `__tests__/pages/DashboardPage.test.tsx` | Heading, widget mount, no profile widget |
| `__tests__/pages/ProfilePage.test.tsx` | Heading, widget mount, no dashboard widget |

### E2E tests (Playwright)

E2E tests run against the live Next.js dev server. `playwright.config.ts` starts the remote (`:4001`) first, then the host (`:4000`). Tests run across Chromium, Firefox, and mobile Chrome.

```bash
npm run test:e2e          # headless
npm run test:e2e:ui       # Playwright UI mode
```

| File | What it tests |
|---|---|
| `e2e/navigation.spec.ts` | Root redirect, URL changes on nav, active link states, back/forward buttons, reload persistence |
| `e2e/dashboard.spec.ts` | DashboardWidget content, 7d/30d/90d range switching, activity feed |
| `e2e/profile.spec.ts` | ProfileWidget form, pre-filled values, editing, save confirmation |

---

## How to extend

### Add a new page and widget

1. Expose the component in `apps/mpa-module-federation-remote/rsbuild.config.ts`:
   ```ts
   exposes: { './YourWidget': './src/components/YourWidget' }
   ```
2. Add a declaration in `types/remote.d.ts`:
   ```ts
   declare module 'remote/YourWidget' {
     const YourWidget: React.ComponentType
     export default YourWidget
   }
   ```
3. Create `components/YourWidgetLoader.tsx` (`"use client"`, `next/dynamic ssr:false`).
4. Create `app/(main)/your-page/page.tsx` with the heading and Suspense wrapper.
5. Add the nav item to `components/Nav.tsx`.
6. Add a stub in `__mocks__/YourWidget.tsx` and a test in `__tests__/`.

### Change the remote URL for staging or production

The remote URL is set in `next.config.ts`. Read it from an environment variable:

```ts
const REMOTE_URL = process.env.REMOTE_URL ?? 'http://localhost:4001'

remotes: { remote: `remote@${REMOTE_URL}/remoteEntry.js` }
```
