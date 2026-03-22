# Architecture

## Overview

This project implements the **shell-owned navigation** pattern for microfrontends. The shell (host) app is permanently responsible for rendering the navigation bar. Individual MFEs (remotes) contribute their route metadata to a shared registry, but they never render the nav themselves.

```
Browser
└── shell (port 3000)
    ├── <Navigation>          ← always rendered by shell, reads from nav-registry
    └── <Suspense>
        └── [active MFE]      ← lazy-loaded remote component renders here
            ├── mfe-dashboard (port 3001)
            └── mfe-profile   (port 3002)
```

---

## Why Shell-Owned Navigation?

### The flicker problem

In a naive microfrontend setup, each MFE renders its own copy of the navigation. This causes:

- **FOUC** (Flash of Unstyled Content) — nav CSS arrives at different times per MFE
- **Layout shift** — nav height/position shifts as it loads
- **Duplicate state** — each MFE manages its own "active" link, causing inconsistency

### The solution

The shell renders one navigation component, always synchronously. MFEs are responsible only for their page content. The shell already has its own CSS loaded, so the nav is styled from the very first paint.

---

## No-Flicker Bootstrap

The critical technique is **eager route registration before first render**.

```
Browser                   Shell main.tsx               MFE register.ts
    │                          │                              │
    │── page load ────────────>│                              │
    │                          │── import('mfe_*/register') ─>│
    │                          │<─ registerRoutes() ──────────│  (both, parallel)
    │                          │                              │
    │                          │── registerDashboard()        │
    │                          │── registerProfile()          │
    │                          │                              │
    │                          │── createRoot().render(<App>) │
    │<── first paint ──────────│                              │
    │    nav fully populated   │                              │
```

`shell/src/main.tsx` calls `Promise.allSettled` on both `register` modules before mounting React. The `register` modules are intentionally tiny — they import from `@mfe-demo/nav-registry` and call `registerNavItem`. No React, no components. They resolve in a single round-trip to the remote's manifest.

`Promise.allSettled` (rather than `Promise.all`) provides graceful degradation: if one remote fails to load its register module, the shell logs a warning and continues with whichever MFEs did load. The app never hangs or crashes due to a single unavailable remote.

By the time `createRoot().render()` is called, `getNavItems()` already returns all available nav items, so `<Navigation>` renders with complete data on the very first pass.

---

## Shared Module: nav-registry

`packages/nav-registry` is a **singleton pub/sub registry** shared across all apps via Module Federation's `shared` config.

```ts
// What it exports
registerNavItem(item: NavItem): void   // called by MFE register.ts files
getNavItems(): NavItem[]               // called by shell Navigation.tsx
subscribe(listener: () => void): () => void  // for reactive updates
```

**Singleton guarantee:** every app declares `'@mfe-demo/nav-registry': { singleton: true }` in its Module Federation config. At runtime, only one instance of the registry exists in memory regardless of how many MFEs import it. They all share the same `items` array and `listeners` list.

The shell additionally sets `eager: true`, which bundles the registry into the shell's initial chunk (not a separate async fetch). This is what makes the pre-render registration fast.

---

## Module Federation Config

### Shell (host)

```ts
// shell/rsbuild.config.ts
const dashboardUrl = process.env.MFE_DASHBOARD_URL ?? 'http://localhost:3001';
const profileUrl   = process.env.MFE_PROFILE_URL   ?? 'http://localhost:3002';

pluginModuleFederation({
  name: 'shell',
  remotes: {
    mfe_dashboard: `mfe_dashboard@${dashboardUrl}/mf-manifest.json`,
    mfe_profile:   `mfe_profile@${profileUrl}/mf-manifest.json`,
  },
  shared: {
    react:                    { singleton: true, eager: true, requiredVersion: '^18' },
    'react-dom':              { singleton: true, eager: true, requiredVersion: '^18' },
    'react-router-dom':       { singleton: true, eager: true, requiredVersion: '^6' },
    '@mfe-demo/nav-registry': { singleton: true, eager: true },
  },
})
```

Remote URLs default to `localhost` but can be overridden via environment variables — see `.env.example`.

`eager: true` on shared libs means they are included in the shell's initial bundle chunk. There is no async negotiation for React or the nav registry — they are available immediately, before any remote is contacted.

### MFE remotes

```ts
// mfe-dashboard/rsbuild.config.ts
pluginModuleFederation({
  name: 'mfe_dashboard',
  filename: 'remoteEntry.js',          // entry bundle; mf-manifest.json is auto-generated separately
  exposes: {
    './Dashboard': './src/Dashboard',  // lazy-loaded page component
    './register':  './src/register',   // eagerly loaded by shell bootstrap
  },
  shared: {
    react:                    { singleton: true, requiredVersion: '^18' },  // no eager — shell drives this
    'react-dom':              { singleton: true, requiredVersion: '^18' },
    'react-router-dom':       { singleton: true, requiredVersion: '^6' },
    '@mfe-demo/nav-registry': { singleton: true },
  },
})
```

MFEs do **not** set `eager: true`. They defer to the shell's already-loaded singletons. Setting `eager: true` on a remote would bundle those libs into the remote's initial chunk, wasting bandwidth and potentially creating a second React instance if versions differ.

---

## Dependency Graph

```
shell
├── imports (lazy)     mfe_dashboard/Dashboard
├── imports (lazy)     mfe_profile/Profile
├── imports (eager)    mfe_dashboard/register    ← bootstrap only
├── imports (eager)    mfe_profile/register      ← bootstrap only
└── imports            @mfe-demo/nav-registry    ← singleton

mfe-dashboard
└── imports            @mfe-demo/nav-registry    ← same singleton instance

mfe-profile
└── imports            @mfe-demo/nav-registry    ← same singleton instance
```

There are **no circular dependencies**. Remotes never import from the shell.

---

## Styling Strategy

### Critical CSS inlined in shell HTML

The navigation styles are inlined directly in `shell/src/index.html` inside a `<style>` tag. This means the nav is styled from the very first byte of HTML — before any JS or CSS file is parsed.

### Tailwind CSS per-app

Each app has its own Tailwind build. This is intentional: MFEs are independently deployable and shouldn't share a CSS build pipeline. Tailwind's `content` config is scoped to each app's `src/` directory, so unused utilities are purged per-app.

### Style isolation

Since each MFE only renders its page content (not layout), there is no risk of style leakage from one MFE's Tailwind styles affecting another MFE's content. The shell's nav styles use hand-written CSS (inlined) rather than Tailwind utilities to make them completely self-contained.

---

## Routing

Routing is owned entirely by the shell. MFEs do not define routes — they export components that the shell places at routes.

```tsx
// shell/src/App.tsx
<Routes>
  <Route path="/"          element={<Navigate to="/dashboard" replace />} />
  <Route path="/dashboard" element={<Dashboard />} />   {/* from mfe_dashboard */}
  <Route path="/profile"   element={<Profile />} />     {/* from mfe_profile */}
</Routes>
```

`react-router-dom` is a shared singleton, so `NavLink`'s `isActive` state works correctly even though the `<NavLink>` components live in the shell and the `<BrowserRouter>` context is also in the shell.

---

## Adding a New MFE

### 1. Create the app

```bash
cp -r mfe-dashboard mfe-settings
```

Update `mfe-settings/package.json` name to `"mfe-settings"` and the port in `rsbuild.config.ts` to `3003`.

### 2. Write the register module

```ts
// mfe-settings/src/register.ts
import { registerNavItem } from '@mfe-demo/nav-registry';

export function registerRoutes(): void {
  registerNavItem({ path: '/settings', label: 'Settings', order: 3 });
}
```

### 3. Expose the modules

```ts
// mfe-settings/rsbuild.config.ts
pluginModuleFederation({
  name: 'mfe_settings',
  filename: 'remoteEntry.js',   // entry bundle; mf-manifest.json is auto-generated separately
  exposes: {
    './Settings': './src/Settings',
    './register': './src/register',
  },
  shared: {
    react:                    { singleton: true },
    'react-dom':              { singleton: true },
    'react-router-dom':       { singleton: true },
    '@mfe-demo/nav-registry': { singleton: true },
  },
})
```

### 4. Register the remote in shell

```ts
// shell/rsbuild.config.ts
remotes: {
  mfe_dashboard: 'mfe_dashboard@http://localhost:3001/mf-manifest.json',
  mfe_profile:   'mfe_profile@http://localhost:3002/mf-manifest.json',
  mfe_settings:  'mfe_settings@http://localhost:3003/mf-manifest.json',  // add
},
```

### 5. Bootstrap the register module in shell

```ts
// shell/src/main.tsx
const [dashboardResult, profileResult, settingsResult] = await Promise.allSettled([
  import('mfe_dashboard/register'),
  import('mfe_profile/register'),
  import('mfe_settings/register'),   // add
]);

if (dashboardResult.status === 'fulfilled') dashboardResult.value.registerRoutes();
else console.warn('[shell] mfe_dashboard/register failed to load:', dashboardResult.reason);

if (profileResult.status === 'fulfilled') profileResult.value.registerRoutes();
else console.warn('[shell] mfe_profile/register failed to load:', profileResult.reason);

// add
if (settingsResult.status === 'fulfilled') settingsResult.value.registerRoutes();
else console.warn('[shell] mfe_settings/register failed to load:', settingsResult.reason);
```

### 6. Add the route and type declarations

```tsx
// shell/src/App.tsx
const Settings = lazy(() => import('mfe_settings/Settings'));
// ...
<Route path="/settings" element={<Settings />} />
```

```ts
// shell/src/remotes.d.ts
declare module 'mfe_settings/Settings' {
  const Settings: React.ComponentType;
  export default Settings;
}
declare module 'mfe_settings/register' {
  export function registerRoutes(): void;
}
```

### 7. Add to workspaces

```json
// package.json
"workspaces": ["packages/*", "shell", "mfe-dashboard", "mfe-profile", "mfe-settings"]
```

---

## Testing Strategy

The project has three layers of tests:

### Unit tests — `packages/nav-registry`

Vitest tests covering the singleton module in isolation. Module state is reset between tests with `vi.resetModules()` + dynamic `import()` in `beforeEach` to guarantee independence.

### Component/integration tests — shell, mfe-dashboard, mfe-profile

Vitest + `@testing-library/react` in each workspace. Key techniques:

- **Federated module stubs**: Shell's `vitest.config.ts` maps `mfe_dashboard/Dashboard`, `mfe_dashboard/register`, etc. to local stub files via `resolve.alias`. This lets Vitest resolve federated imports without a running dev server.
- **`vi.mock` + `vi.mocked()`**: All `@mfe-demo/nav-registry` calls are mocked. `vi.mocked()` is used (not top-level `const mock = vi.fn()`) to avoid Vitest's hoisting constraints.
- **`clearMocks: true`**: Set in shell's `vitest.config.ts` to reset mock call counts between tests.

### End-to-end tests — `e2e/`

Playwright tests covering the full integrated system (shell + both MFEs running). Three spec files:

| File | Coverage |
|---|---|
| `shell.spec.ts` | Routing, redirect, nav presence, active link state, click navigation, no-flicker (`domcontentloaded`), nav persistence, CLS < 0.1 |
| `dashboard.spec.ts` | Stat cards, trend colours, activity list, remote identifier |
| `profile.spec.ts` | Form default values, field interactions, avatar update, save state machine, remote identifier |

The Playwright config (`playwright.config.ts`) starts all three dev servers automatically before the suite runs. MFE health checks use the `/mf-manifest.json` endpoint (auto-generated by the Module Federation plugin).

---

## Key Trade-offs

| Decision | Alternative | Why this choice |
|---|---|---|
| Shell-owned nav | Each MFE renders its own nav | No flicker; single source of truth for layout |
| Bootstrap pattern (eager register) | Subscribe-only (nav fills in after MFE loads) | Nav is populated before first render |
| Shared npm package for registry | Federated module from a dedicated remote | No extra dev server; works at build time via workspaces |
| `eager: true` on shell shared libs | Async negotiation (default) | Eliminates async chunk for React/Router/registry on first load |
| Per-app Tailwind build | Single shared CSS bundle | Independent deployability; no build coupling |
| Shell owns routes | Each MFE owns its routes (via federation) | Simpler; avoids runtime route conflicts |
