# mfe-profile

Profile microfrontend. Allows users to view and edit their personal information.

Runs on **http://localhost:3002** in development. Consumed by the shell at runtime via Module Federation.

## Exposed Modules

### `./Profile`

The main page component. Lazy-loaded by the shell when the user navigates to `/profile`.

```tsx
// Usage in shell (handled automatically via routes)
const Profile = lazy(() => import('mfe_profile/Profile'));
```

Renders:
- An avatar derived from the first letter of the user's name
- An editable form with fields: Name, Email, Role, Bio
- Inline save confirmation ("Saved!" feedback)
- A small badge identifying this as the mfe-profile remote (useful during development)

All form state is managed locally with `useState`. In a real application this would connect to an API.

### `./register`

A lightweight registration module. Eagerly loaded by the shell during bootstrap.

```ts
import { registerRoutes } from 'mfe_profile/register';
registerRoutes(); // registers { path: '/profile', label: 'Profile', order: 2 }
```

No React dependency. Calls `registerNavItem` from `@mfe-demo/nav-registry` and nothing else.

## Key Files

| File | Purpose |
|---|---|
| `src/Profile.tsx` | Page component with editable profile form |
| `src/register.ts` | Calls `registerNavItem` to add this MFE to the shell nav |
| `src/main.tsx` | Standalone entry point (for running the MFE in isolation) |
| `rsbuild.config.ts` | Module Federation remote config, port 3002 |

## Module Federation Config

```ts
pluginModuleFederation({
  name: 'mfe_profile',
  filename: 'remoteEntry.js',          // entry bundle; mf-manifest.json is auto-generated separately
  exposes: {
    './Profile':  './src/Profile',
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

## Running in Isolation

```bash
npm run dev -w mfe-profile
```

Opens http://localhost:3002 and renders the Profile component directly. No shell required.

## Dev

Requires `@mfe-demo/nav-registry` to be available via npm workspaces.
