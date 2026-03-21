# mpa-demo monorepo

npm workspaces monorepo containing web applications built with modern React patterns.

## Apps

| App | Port | Pattern | Description |
|---|---|---|---|
| [`apps/mpa-app`](./apps/mpa-app/README.md) | 3000 | MPA Shell + SPA Islands | Authenticated internal tool with Dashboard and Profile |

## Getting started

**Prerequisites:** Node.js 20+

```bash
# Install all workspace dependencies
npm install

# Start mpa-app dev server
npm run dev:mpa

# Build mpa-app
npm run build:mpa
```

## Workspace structure

```
app/
├── apps/
│   └── mpa-app/          # Next.js 15 App Router app
└── packages/             # Shared packages (currently empty)
```

## Adding a new app

1. Create `apps/your-app/` with a `package.json` using `"name": "@mpa-demo/your-app"`
2. Add a `dev:your-app` script to the root `package.json`
3. Place any shared code in `packages/` and reference it by workspace name

## Adding a shared package

1. Create `packages/your-package/` with a `package.json` using `"name": "@mpa-demo/your-package"`
2. Add it as a dependency in any app: `"@mpa-demo/your-package": "*"`
3. Run `npm install` from the root to link the workspace
