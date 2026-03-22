# shell

The host application. Owns the page layout, navigation bar, and client-side routing. All microfrontend page components are lazy-loaded into the shell's content area.

Runs on **http://localhost:3000**.

## Responsibilities

- Render the `<Navigation>` bar (always synchronous, never lazy)
- Define all routes via React Router
- Bootstrap MFE route registrations before first render
- Provide the `<Suspense>` boundary with a skeleton fallback while MFE components load
- Configure Module Federation as the **host** (consumes remotes)

## Key Files

### `src/main.tsx` — Bootstrap entry point

The most important file for the no-flicker guarantee. It:

1. Imports the CSS so Tailwind is available immediately
2. Calls `Promise.allSettled` to eagerly fetch the `register` module from each remote
3. Calls each successfully loaded MFE's `registerRoutes()` to populate the nav registry
4. Only then renders `<App>` via `createRoot`

Because `registerRoutes()` runs before `render()`, `<Navigation>` has complete data on its very first render pass. `Promise.allSettled` (rather than `Promise.all`) provides graceful degradation — if one remote fails to load, the shell logs a warning and continues with the remaining MFEs.

```ts
async function bootstrap() {
  const results = await Promise.allSettled([
    import('mfe_dashboard/register'),
    import('mfe_profile/register'),
  ]);

  const [dashboardResult, profileResult] = results;

  if (dashboardResult.status === 'fulfilled') {
    dashboardResult.value.registerRoutes();
  } else {
    console.warn('[shell] mfe_dashboard/register failed to load:', dashboardResult.reason);
  }

  if (profileResult.status === 'fulfilled') {
    profileResult.value.registerRoutes();
  } else {
    console.warn('[shell] mfe_profile/register failed to load:', profileResult.reason);
  }

  const { createRoot } = await import('react-dom/client');
  const { default: App } = await import('./App');

  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('#root element not found');
  createRoot(rootElement).render(<App />);
}

bootstrap().catch((err) => {
  console.error('[shell] Fatal bootstrap error:', err);
});
```

### `src/App.tsx` — Router and layout

Sets up `<BrowserRouter>` with lazy-loaded remote components inside `<Suspense>`. The fallback (`<PageSkeleton>`) only covers the content area — the nav is outside `<Suspense>` and is never suspended.

### `src/Navigation.tsx` — Navigation bar

Reads from `@mfe-demo/nav-registry` and subscribes to changes. Renders `<NavLink>` elements from React Router so active-link highlighting is handled automatically.

### `src/PageSkeleton.tsx` — Loading fallback

An animated skeleton that mirrors the rough shape of a page (heading, stat cards, content block). Shown inside `<Suspense>` while a remote component chunk is being fetched.

### `src/remotes.d.ts` — Type declarations

TypeScript declarations for the two remote modules. Required because TypeScript cannot infer the types of dynamically federated modules at build time.

### `src/index.html` — HTML template

Contains:
- **Inlined critical CSS** for the nav bar in a `<style>` tag — ensures the nav is styled before any JS runs
- `<link rel="preload">` hints for both remote manifests — starts fetching them as early as possible

## Module Federation Config

```ts
// rsbuild.config.ts
const dashboardUrl = process.env.MFE_DASHBOARD_URL ?? 'http://localhost:3001';
const profileUrl = process.env.MFE_PROFILE_URL ?? 'http://localhost:3002';

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

Remote URLs default to `localhost` but can be overridden via `.env` (see `.env.example` in the repo root).

`eager: true` on all shared modules means they are bundled into the shell's initial chunk. There is no async negotiation for React, React Router, or the nav registry — they are available the instant the shell's JS executes.

The shell also sets an explicit entry point because Rsbuild defaults to `src/index.tsx` — the shell uses `src/main.tsx`:

```ts
source: {
  entry: {
    index: './src/main.tsx',
  },
},
```

Without this, Rsbuild finds no entry and only emits the Module Federation manifest files, producing no HTML or JS bundle.

## Dev

```bash
npm run dev -w shell
```

Note: if `mfe-dashboard` or `mfe-profile` dev servers are not running, their `register` module will fail to load. The shell will log a warning and render without those nav items — it does not crash.
