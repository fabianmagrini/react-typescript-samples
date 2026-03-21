# mpa-module-federation-remote

The **remote** application in the `mpa-module-federation` micro-frontend pair. It exposes two React widgets — `DashboardWidget` and `ProfileWidget` — via Module Federation, making them available for the host application to load at runtime over HTTP.

## Table of Contents

- [Role in the federation](#role-in-the-federation)
- [Architecture](#architecture)
  - [Bootstrap sequence](#bootstrap-sequence)
  - [Exposed widgets](#exposed-widgets)
  - [Standalone dev harness](#standalone-dev-harness)
  - [Rsbuild and Module Federation configuration](#rsbuild-and-module-federation-configuration)
- [Widget reference](#widget-reference)
  - [DashboardWidget](#dashboardwidget)
  - [ProfileWidget](#profilewidget)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Testing](#testing)
- [How to extend](#how-to-extend)

---

## Role in the federation

```
Host (port 4000)                       Remote (port 4001)
─────────────────────────────────────  ─────────────────────────────────────
DashboardWidgetLoader.tsx              remoteEntry.js  (federation manifest)
  next/dynamic({ ssr: false }) ──────→   exposes:
    import('remote/DashboardWidget')         ./DashboardWidget → DashboardWidget.tsx
ProfileWidgetLoader.tsx                      ./ProfileWidget   → ProfileWidget.tsx
  next/dynamic({ ssr: false }) ──────→
```

The host server-renders its page shell (nav, headings, layout) via Next.js App Router. The widget loaders are `"use client"` islands that fetch the federated chunks in the browser after hydration — `ssr: false` prevents Next.js from attempting to render them server-side.

The remote is a **producer**: it builds its components into chunks and publishes a manifest file (`remoteEntry.js`). It does not know who consumes it. The host is a **consumer**: it declares a dependency on the remote's manifest URL and lazily imports named modules from it at runtime.

The remote has no dependency on the host. It can be deployed, restarted, or updated entirely independently. The host picks up changes on the next page load.

---

## Architecture

### Bootstrap sequence

Like the host, the remote uses an async entry point to give the Module Federation runtime time to initialise before any shared dependencies are evaluated:

```
main.tsx
└── import('./bootstrap')           ← async — MF runtime initialises here
    └── bootstrap.tsx
        └── createRoot().render(<App />)
```

`main.tsx` contains a single line — `import('./bootstrap')` — which splits the module graph at the entry point. The Rspack federation container can therefore load and negotiate shared dependencies (react, react-dom) in the microtask queue before `bootstrap.tsx` evaluates any React code.

This bootstrap pattern is required whenever a Module Federation container declares `shared` dependencies. Without it, React would be imported before the container has a chance to provide the negotiated singleton, which would result in two React instances running simultaneously and causing hook errors.

### Exposed widgets

`rsbuild.config.ts` registers the Module Federation plugin as a **producer** (`filename: 'remoteEntry.js'`):

```ts
new ModuleFederationPlugin({
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './DashboardWidget': './src/components/DashboardWidget',
    './ProfileWidget':   './src/components/ProfileWidget',
  },
  shared: {
    react:     { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
  },
  dts: false,
})
```

`exposes` maps each public import path to a local source file. The host imports `remote/DashboardWidget`; this resolves to `./DashboardWidget` in the exposes map, which resolves to `./src/components/DashboardWidget.tsx` in the remote's source tree.

`filename: 'remoteEntry.js'` sets the name of the federation manifest file that the remote serves. The host's `remotes` configuration references this URL: `remote@http://localhost:4001/remoteEntry.js`.

`dts: false` disables automatic TypeScript declaration file generation for exposed modules (the host provides its own ambient declarations in `src/types/remote.d.ts`).

### Standalone dev harness

`src/App.tsx` is a lightweight dev-only shell that renders both widgets side by side on a single page. It is not federated — it imports the components directly and is only used when running the remote in isolation:

```
http://localhost:4001

Remote — widget preview
───────────────────────────────────────
DashboardWidget
  [7d] [30d] [90d]
  Active Users  Revenue  Tickets  Avg. Response Time
  ...

ProfileWidget
  [avatar] Jane Smith · Product Manager
  Display name ___________
  Email        ___________
               [Save changes]
```

This allows widget development and visual testing without depending on a running host. It also serves as a quick smoke test: if the remote dev server starts cleanly and renders its harness, the exposed components are working.

### Rsbuild and Module Federation configuration

```ts
// rsbuild.config.ts (remote)
server: { port: 4001 },
dev:    { assetPrefix: 'http://localhost:4001/' },
```

`assetPrefix` is set to the absolute URL of the remote's dev server. Webpack/Rspack embeds chunk URLs into the federation manifest. Without an absolute `assetPrefix`, the manifest would contain relative paths, and the host (running on a different origin) would resolve them relative to its own origin — fetching from `:4000` instead of `:4001`.

---

## Widget reference

### DashboardWidget

`src/components/DashboardWidget.tsx`

A metrics overview widget with a time-range selector and an activity feed.

**State**

| State | Type | Initial value | Description |
|---|---|---|---|
| `range` | `'7d' \| '30d' \| '90d'` | `'7d'` | The currently selected time window |

**Behaviour**

- Clicking a range button updates `range` state. The metric cards re-render immediately with the corresponding data set — no network request is made.
- Metric data (`DATA`) and activity feed (`ACTIVITY`) are defined as module-level constants. Replacing these with API calls requires adding a `fetch`/`useEffect` or a data-fetching library.
- Change indicators are coloured: green (`text-green-600`) for positive changes (`up: true`), red (`text-red-500`) for negative (`up: false`).

**Metric data**

| Metric | 7d | 30d | 90d |
|---|---|---|---|
| Active Users | 1,284 | 5,102 | 14,900 |
| Revenue | $8,430 | $34,820 | $102,310 |
| Tickets Opened | 38 | 141 | 398 |
| Avg. Response Time | 2.4h | 2.1h | 1.9h |

### ProfileWidget

`src/components/ProfileWidget.tsx`

A user profile card with an inline edit form.

**State**

| State | Type | Description |
|---|---|---|
| `name` | `string` | Current value of the display name input; initialised from `STUB_USER.name` |
| `email` | `string` | Current value of the email input; initialised from `STUB_USER.email` |
| `saved` | `boolean` | Controls the "Saved!" / "Save changes" button label |

**Behaviour**

- The avatar displays the first character of the current `name` state — it updates live as the user types.
- Submitting the form calls `handleSave`, which sets `saved = true` and schedules a `setTimeout` to reset it after 2 000 ms. The button label flips between "Save changes" and "Saved!" accordingly.
- The form does not currently persist changes to a backend. Replacing the stub with an API call requires updating `handleSave`.
- Static fields (`role`, `timezone`, `joined`) come from `STUB_USER` and are not editable in this implementation.

**Stub user**

```ts
const STUB_USER = {
  name:     'Jane Smith',
  email:    'jane.smith@example.com',
  role:     'Product Manager',
  timezone: 'UTC+10 (Sydney)',
  joined:   'January 2023',
}
```

---

## Project structure

```
apps/mpa-module-federation-remote/
│
├── src/
│   ├── main.tsx                      # Entry point — async bootstrap for MF
│   ├── bootstrap.tsx                 # createRoot + standalone App mount
│   ├── App.tsx                       # Standalone dev harness (not federated)
│   ├── index.css                     # Tailwind base styles
│   │
│   ├── components/
│   │   ├── DashboardWidget.tsx       # Exposed as remote/DashboardWidget
│   │   └── ProfileWidget.tsx         # Exposed as remote/ProfileWidget
│   │
│   └── __tests__/
│       └── components/
│           ├── DashboardWidget.test.tsx
│           └── ProfileWidget.test.tsx
│
├── rsbuild.config.ts                 # Rsbuild + ModuleFederationPlugin (remote role)
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
└── vitest.setup.ts
```

---

## Getting started

**Prerequisites:** Node.js 20+

```bash
# From the monorepo root — start the remote standalone
npm run dev:mf:remote
# Open http://localhost:4001 to preview widgets in the standalone harness

# Or start both host and remote together
npm run dev:mf
```

```bash
# Production build
npm run build --workspace=apps/mpa-module-federation-remote
```

---

## Testing

### Unit tests (Vitest + React Testing Library)

```bash
npm test                  # run once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

The components are plain React components with no federation dependencies, so they can be imported directly in tests without any mocking or aliasing.

| File | What it tests |
|---|---|
| `src/__tests__/components/DashboardWidget.test.tsx` | Initial render (all buttons, metric values, activity feed), range switching (all combinations), button highlight state, metric data removed on switch, change indicator colours |
| `src/__tests__/components/ProfileWidget.test.tsx` | Initial render (all fields, save button), form editing (name, email, avatar update), save flow (confirmation label, value persistence), timer revert (button resets after 2 s) |

**Timer tests in ProfileWidget**

Two tests (`button text reverts after timeout`, `can save again after confirmation resets`) verify the component's 2 000 ms reset `setTimeout`. Rather than faking all timers (which disrupts `userEvent`'s own internal scheduling under React 19 + jsdom) or polling with `waitFor` (slow), the tests spy on `setTimeout` and intercept only calls with `delay === 2000`, forwarding all other calls to the real implementation. The captured callback is fired synchronously via `act()`, keeping the tests instant and reliable.

---

## How to extend

### Add a new exposed widget

1. Create the component in `src/components/YourWidget.tsx`.
2. Add it to `exposes` in `rsbuild.config.ts`:
   ```ts
   exposes: {
     './DashboardWidget': './src/components/DashboardWidget',
     './ProfileWidget':   './src/components/ProfileWidget',
     './YourWidget':      './src/components/YourWidget',   // ← add
   }
   ```
3. Add it to the standalone dev harness in `src/App.tsx` so it appears in the preview.
4. Add unit tests in `src/__tests__/components/YourWidget.test.tsx`.
5. In the host, add an ambient declaration in `types/remote.d.ts` and a stub in `__mocks__/YourWidget.tsx`.

### Connect a widget to a real API

Replace the module-level stub constants in a widget with a `fetch` call (or a data-fetching library). For example, to make `DashboardWidget` fetch live metrics:

```ts
// Before: module-level constant
const DATA: Record<Range, Metric[]> = { '7d': [...], ... }

// After: fetched state
const [data, setData] = useState<Record<Range, Metric[]> | null>(null)
useEffect(() => {
  fetch('/api/metrics').then(r => r.json()).then(setData)
}, [])
```

Because the widget runs inside the host's JavaScript context, it can call any API accessible from that origin. If the remote and host are on different domains, configure CORS on the API server.

### Replace the stub user in ProfileWidget

`STUB_USER` is a module-level constant. To load the real user, pass it as a prop from the host:

1. Update the component signature: `export default function ProfileWidget({ user }: { user: User }) { ... }`.
2. Update the ambient declaration in the host's `types/remote.d.ts` to reflect the new prop type.
3. Pass the user from `ProfileWidgetLoader.tsx` in the host: `<ProfileWidget user={currentUser} />`.
