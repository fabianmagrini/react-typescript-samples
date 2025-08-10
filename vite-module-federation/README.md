# Vite Module Federation TypeScript Demo

A complete micro-frontend architecture using Vite Module Federation with TypeScript, featuring a host application that consumes components from a remote application.

## Project Architecture

This is a monorepo workspace with two applications:

```
vite-module-federation/
├── host/          # Host application (port 4000) 
├── remote/        # Remote application (port 4001)
└── package.json   # Root workspace configuration
```

### Host Application (port 4000)
- **Name**: `host-app`
- **Role**: Consumer - imports remote components
- **Remotes**: Consumes `remote/Button` and `remote/Counter` from remote app
- **URL**: http://localhost:4000

### Remote Application (port 4001)
- **Name**: `remote-app` 
- **Role**: Provider - exposes components for federation
- **Exposes**: 
  - `./Button` → `./src/components/Button.tsx`
  - `./Counter` → `./src/components/Counter.tsx`
- **URL**: http://localhost:4001

## Development Commands

### Root Level Commands
- `npm run dev` - Start both applications concurrently
- `npm run dev:host` - Start only host application (cd host && npm run dev)
- `npm run dev:remote` - Start only remote application (cd remote && npm run dev)
- `npm run build` - Build both applications (remote first, then host)
- `npm run build:host` - Build only host application
- `npm run build:remote` - Build only remote application

### Individual App Commands (within host/ or remote/)
- `npm run dev` - Start development server
- `npm run build` - TypeScript compile + Vite build
- `npm run preview` - Preview production build

## Setup Instructions

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install workspace dependencies:**
   ```bash
   npm install --workspaces
   ```

3. **Start development:**
   ```bash
   npm run dev
   ```

## Technology Stack

- **Framework**: React 18.2.0 with TypeScript 5.2.2
- **Build Tool**: Vite 5.2.0
- **Module Federation**: @originjs/vite-plugin-federation 1.3.5
- **Shared Dependencies**: react, react-dom
- **Workspace**: npm workspaces
- **Process Manager**: concurrently 8.2.2

## Module Federation Configuration

### Remote App Configuration
```typescript
federation({
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button.tsx',
    './Counter': './src/components/Counter.tsx',
  },
  shared: ['react', 'react-dom']
})
```

### Host App Configuration  
```typescript
federation({
  name: 'host',
  remotes: {
    remote: 'http://localhost:4001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom']
})
```

## Build Configuration

Both apps use optimized build settings:
- `modulePreload: false`
- `target: 'esnext'`  
- `minify: false`
- `cssCodeSplit: false`

## TypeScript Integration

- Full TypeScript support with strict type checking
- Remote component types defined in `host/remote.d.ts`
- Individual tsconfig.json for each application
- Type-safe remote component imports

## Key Files

### Remote Components
- `remote/src/components/Button.tsx` - Federated button component with variants
- `remote/src/components/Counter.tsx` - Stateful counter component

### Configuration Files
- `host/vite.config.ts` - Host federation configuration
- `remote/vite.config.ts` - Remote federation configuration  
- `host/remote.d.ts` - TypeScript definitions for remote components

## Development Notes

- Remote application must be running for host to load federated components
- Both applications can be developed and deployed independently
- Shared dependencies are deduplicated at runtime
- Components maintain their own styling and state management

## Testing & Quality

- TypeScript compilation serves as static analysis
- Both applications can run in isolation for component testing
- Build process validates federation configuration

## Troubleshooting

### Federation Loading Issues
- Ensure the remote app is built and running in preview mode
- Verify `remoteEntry.js` is accessible at `http://localhost:4001/assets/remoteEntry.js`
- Check browser console for detailed error messages

### Port Conflicts
- Use `lsof -i :4000` or `lsof -i :4001` to check port usage
- Kill processes with `kill <PID>` if needed
- Ports are configured in each app's `vite.config.ts`