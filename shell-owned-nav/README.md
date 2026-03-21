# MFE Demo

A production-pattern microfrontend application demonstrating **Module Federation** with React, TypeScript, Rsbuild, and Tailwind CSS. The focus is on a shared navigation bar that renders with **zero flicker** across independently deployed microfrontends.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

All three dev servers start concurrently:

| App | URL | Role |
|---|---|---|
| shell | http://localhost:3000 | Host — owns layout and navigation |
| mfe-dashboard | http://localhost:3001 | Remote — Dashboard page |
| mfe-profile | http://localhost:3002 | Remote — Profile page |

## Project Structure

```
app/
├── packages/
│   └── nav-registry/        Shared navigation singleton (pub/sub)
├── shell/                   Host app — layout, routing, navigation
├── mfe-dashboard/           Remote — Dashboard MFE
└── mfe-profile/             Remote — Profile MFE
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a deep dive into design decisions.

## Tech Stack

| Concern | Tool |
|---|---|
| Build & dev server | [Rsbuild](https://rsbuild.dev) |
| Module Federation | [@module-federation/rsbuild-plugin](https://module-federation.io) |
| UI | React 18 |
| Routing | react-router-dom v6 |
| Styling | Tailwind CSS v3 |
| Language | TypeScript |
| Monorepo | npm workspaces |
| Unit & component tests | Vitest + @testing-library/react |
| End-to-end tests | Playwright |

## Scripts

Run from the repo root:

```bash
npm run dev            # Start all three dev servers concurrently
npm run build          # Build remotes then shell (mfe-dashboard → mfe-profile → shell)
npm run test           # Run all unit/component test suites across every workspace
npm run test:e2e       # Run Playwright end-to-end tests (starts servers automatically)
npm run test:e2e:ui    # Open Playwright interactive UI
npm run test:e2e:report  # Show the last Playwright HTML report
```

Or target a single workspace:

```bash
npm run dev -w shell
npm run dev -w mfe-dashboard
npm run dev -w mfe-profile
npm run test:watch -w shell   # Vitest watch mode for a single workspace
```

> **Note:** `packages/nav-registry` has no separate build step — it is consumed directly from TypeScript source by Rsbuild and Vitest in each workspace.

## Adding a New MFE

See [ARCHITECTURE.md — Adding a New MFE](./ARCHITECTURE.md#adding-a-new-mfe) for step-by-step instructions.
