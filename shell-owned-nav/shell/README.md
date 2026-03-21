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
2. Calls `Promise.all` to eagerly fetch the `register` module from each remote
3. Calls each MFE's `registerRoutes()` to populate the nav registry
4. Only then renders `<App>` via `createRoot`

Because `registerRoutes()` runs before `render()`, `<Navigation>` has complete data on its very first render pass.

```ts
async function bootstrap() {
  const [
    { registerRoutes: registerDashboard },
    { registerRoutes: registerProfile },
  ] = await Promise.all([
    import('mfe_dashboard/register'),
    import('mfe_profile/register'),
  ]);

  registerDashboard();
  registerProfile();

  const { createRoot } = await import('react-dom/client');
  const { default: App } = await import('./App');
  createRoot(document.getElementById('root')!).render(<App />);
}
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
pluginModuleFederation({
  name: 'shell',
  remotes: {
    mfe_dashboard: 'mfe_dashboard@http://localhost:3001/mf-manifest.json',
    mfe_profile:   'mfe_profile@http://localhost:3002/mf-manifest.json',
  },
  shared: {
    react:                    { singleton: true, eager: true },
    'react-dom':              { singleton: true, eager: true },
    'react-router-dom':       { singleton: true, eager: true },
    '@mfe-demo/nav-registry': { singleton: true, eager: true },
  },
})
```

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

Note: the shell requires both `mfe-dashboard` and `mfe-profile` dev servers to be running, otherwise the bootstrap `Promise.all` will fail with a network error.
