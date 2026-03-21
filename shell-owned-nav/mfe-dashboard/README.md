# mfe-dashboard

Dashboard microfrontend. Displays a statistics overview and a recent activity feed.

Runs on **http://localhost:3001** in development. Consumed by the shell at runtime via Module Federation.

## Exposed Modules

This remote exposes two entry points:

### `./Dashboard`

The main page component. Lazy-loaded by the shell when the user navigates to `/dashboard`.

```tsx
// Usage in shell (handled automatically via routes)
const Dashboard = lazy(() => import('mfe_dashboard/Dashboard'));
```

Renders:
- Three stat cards (Total Users, Revenue, Active Sessions) with trend indicators
- A recent activity table with mock user events
- A small badge identifying this as the mfe-dashboard remote (useful during development)

### `./register`

A lightweight registration module. Eagerly loaded by the shell during bootstrap — before React renders.

```ts
// Usage in shell bootstrap
import { registerRoutes } from 'mfe_dashboard/register';
registerRoutes(); // registers { path: '/dashboard', label: 'Dashboard', order: 1 }
```

This module has **no React dependency** and no side effects beyond calling `registerNavItem`. It is intentionally minimal to keep the bootstrap fast.

## Key Files

| File | Purpose |
|---|---|
| `src/Dashboard.tsx` | Page component with stats and activity feed |
| `src/register.ts` | Calls `registerNavItem` to add this MFE to the shell nav |
| `src/main.tsx` | Standalone entry point (for running the MFE in isolation) |
| `rsbuild.config.ts` | Module Federation remote config, port 3001 |

## Module Federation Config

```ts
pluginModuleFederation({
  name: 'mfe_dashboard',
  filename: 'remoteEntry.js',          // entry bundle; mf-manifest.json is auto-generated separately
  exposes: {
    './Dashboard': './src/Dashboard',
    './register':  './src/register',
  },
  shared: {
    react:                    { singleton: true },
    'react-dom':              { singleton: true },
    'react-router-dom':       { singleton: true },
    '@mfe-demo/nav-registry': { singleton: true },
  },
})
```

`singleton: true` (without `eager`) means this MFE defers to whatever version of React and the nav registry the shell has already loaded. It will never create a second React root or a second registry instance.

## Running in Isolation

```bash
npm run dev -w mfe-dashboard
```

Opens http://localhost:3001 and renders the Dashboard component directly (via `src/main.tsx`). No shell required. Useful for developing and testing the Dashboard in isolation.

## Dev

Requires `@mfe-demo/nav-registry` to be available (installed via npm workspaces — no separate build step needed in development).
