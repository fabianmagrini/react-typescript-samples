# mpa-demo monorepo

npm workspaces monorepo containing web applications built with modern React patterns.

## Apps

| App | Port | Pattern | Description |
|---|---|---|---|
| [`apps/mpa-app`](./apps/mpa-app/README.md) | 3000 | MPA Shell + SPA Islands | Authenticated internal tool with Dashboard and Profile |
| [`apps/mpa-module-federation`](./apps/mpa-module-federation/README.md) | 4000 | Server-rendered shell + Module Federation (host) | Next.js 15 App Router; server-renders the shell (nav, headings, layout) and loads widget content from the remote at runtime as client-side islands via Module Federation (`ssr: false`) |
| [`apps/mpa-module-federation-remote`](./apps/mpa-module-federation-remote/README.md) | 4001 | Module Federation (remote) | Exposes DashboardWidget and ProfileWidget for consumption by the host |

## Getting started

**Prerequisites:** Node.js 20+

```bash
# Install all workspace dependencies
npm install

# Start mpa-app dev server
npm run dev:mpa

# Build mpa-app
npm run build:mpa

# Start both module federation apps (host + remote) concurrently
npm run dev:mf

# Start host or remote individually
npm run dev:mf:host     # http://localhost:4000
npm run dev:mf:remote   # http://localhost:4001

# Build module federation apps (remote first, then host)
npm run build:mf

# Run host in production mode with the remote dev server
npm run start:mf
```

## Running tests

```bash
# Unit tests — host app
npm run test:mf

# Unit tests — remote app
npm run test:mf:remote

# E2E tests — host app (starts both servers automatically)
npm run test:mf:e2e
```

## Workspace structure

```
mpa-monorepo/
├── apps/
│   ├── mpa-app/                        # Next.js 15 App Router app (port 3000)
│   ├── mpa-module-federation/          # Next.js 15 MF host app    (port 4000)
│   └── mpa-module-federation-remote/   # Rsbuild MF remote app     (port 4001)
└── packages/                           # Shared packages (currently empty)
```

## Adding a new app

1. Create `apps/your-app/` with a `package.json` using `"name": "@mpa-demo/your-app"`
2. Add a `dev:your-app` script to the root `package.json`
3. Place any shared code in `packages/` and reference it by workspace name

## Adding a shared package

1. Create `packages/your-package/` with a `package.json` using `"name": "@mpa-demo/your-package"`
2. Add it as a dependency in any app: `"@mpa-demo/your-package": "*"`
3. Run `npm install` from the root to link the workspace
