# Vercel Microfrontends + Rsbuild

Showcases how to use `@vercel/microfrontends` together with Rsbuild to create a microfrontends architecture using Module Federation.

## Architecture

- **Host Application** (Port 3001): Main application that consumes remote microfrontends
- **Remote Header** (Port 3002): Header component exposed as a microfrontend
- **Remote Footer** (Port 3003): Footer component exposed as a microfrontend

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run all applications in development mode:
```bash
npm run dev
```

This will start:
- Host app at http://localhost:3001
- Remote header at http://localhost:3002
- Remote footer at http://localhost:3003

3. Open http://localhost:3001 to see the complete application with all microfrontends loaded.

## Individual App Commands

Run individual applications:
```bash
npm run dev:host    # Host application
npm run dev:header  # Remote header
npm run dev:footer  # Remote footer
```

Build applications:
```bash
npm run build       # Build all apps
npm run build:host  # Build host only
npm run build:header # Build header only
npm run build:footer # Build footer only
```

## Tech Stack

- **Rsbuild**: Fast Rust-based build tool with Rspack bundler
- **@vercel/microfrontends**: Vercel's microfrontends utilities (configuration)
- **@module-federation/rspack**: Module Federation implementation for Rspack
- **React**: UI library
- **TypeScript**: Type safety

## Features

✅ **Module Federation with Rspack**: Uses @module-federation/rspack for optimal performance
✅ **Hot Module Replacement**: All apps support hot reload during development
✅ **Shared Dependencies**: React and React-DOM are shared between microfrontends
✅ **Dynamic Remote Loading**: Components are loaded asynchronously with Suspense
✅ **TypeScript Support**: Full TypeScript integration across all applications
✅ **Vercel Integration**: Includes microfrontends.config.json for Vercel deployment

## Project Structure

```
├── apps/
│   ├── host/                 # Host application
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── index.tsx
│   │   │   └── remotes.d.ts
│   │   ├── rsbuild.config.ts
│   │   └── package.json
│   ├── remote-header/        # Header microfrontend
│   │   ├── src/
│   │   │   ├── Header.tsx
│   │   │   └── index.tsx
│   │   ├── rsbuild.config.ts
│   │   └── package.json
│   └── remote-footer/        # Footer microfrontend
│       ├── src/
│       │   ├── Footer.tsx
│       │   └── index.tsx
│       ├── rsbuild.config.ts
│       └── package.json
├── package.json
└── README.md
```