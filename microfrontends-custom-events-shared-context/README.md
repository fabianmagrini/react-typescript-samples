# Microfrontend Application with Custom Events and Shared Context

A production-grade microfrontend application demonstrating how to build and orchestrate multiple independent React SPAs that communicate through browser custom events, with a Node.js server providing shared application context.

## Architecture Overview

```
┌─────────────────┐    HTTP/Static    ┌─────────────────┐    Custom Events   ┌─────────────────┐
│   Container     │◄─────────────────►│   Product       │◄──────────────────►│   Cart          │
│   (Express)     │                   │   Microfrontend │                    │   Microfrontend │
│   Port 4000     │                   │   (React SPA)   │                    │   (React SPA)   │
│                 │                   │                 │                    │                 │
│ • Serves Shell  │                   │ • Product List  │                    │ • Cart Items    │
│ • Static Assets │                   │ • Add to Cart   │                    │ • Event Listen  │
│ • API Context   │                   │ • Event Emit    │                    │ • Quantity Mgmt │
└─────────────────┘                   └─────────────────┘                    └─────────────────┘
```

## Key Features

### 🏗️ **Microfrontend Architecture**
- Independent React SPAs with separate build processes
- Container app serving and orchestrating microfrontends
- Shared TypeScript interfaces for type safety

### 📡 **Custom Event Communication**
- Browser-native custom events for inter-microfrontend communication
- Event-driven architecture without tight coupling
- Type-safe event payloads using shared interfaces

### 🔄 **Shared Application Context**
- Central Express server providing shared state via REST API
- Consistent user context across all microfrontends
- Production-ready monorepo structure

## Project Structure

```
microfrontends-custom-events-shared-context/
├── packages/
│   ├── container-app/              # Express server (Port 4000)
│   │   ├── src/
│   │   │   └── index.ts           # Main Express server
│   │   ├── public/
│   │   │   └── index.html         # Shell HTML page
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── microfrontend-product/      # Product display React SPA
│   │   ├── src/
│   │   │   ├── App.tsx            # Product component
│   │   │   ├── App.css
│   │   │   └── index.tsx          # React entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── microfrontend-cart/         # Shopping cart React SPA
│   │   ├── src/
│   │   │   ├── App.tsx            # Cart component
│   │   │   ├── App.css
│   │   │   └── index.tsx          # React entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── shared-types/               # Shared TypeScript interfaces
│       ├── src/
│       │   └── index.ts           # Common type definitions
│       ├── package.json
│       └── tsconfig.json
├── package.json                    # Root package with workspaces
├── tsconfig.base.json             # Base TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern browser supporting custom events

### Installation

1. **Install all dependencies:**
   ```bash
   npm install
   ```

### Development

**Start all services in development mode:**
```bash
npm run dev
```

This starts:
- Container Express server on http://localhost:4000
- Product microfrontend Vite dev server
- Cart microfrontend Vite dev server

**Access the application:**
- **Main Application**: http://localhost:4000

### Production Build

1. **Build all packages:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## How It Works

### 1. **Container Application**
The Express server (`packages/container-app/src/index.ts`):
- Serves the main shell HTML page
- Provides static routes for microfrontend bundles (`/mf-product`, `/mf-cart`)
- Exposes REST API endpoint (`GET /api/context`) for shared application context

### 2. **Microfrontend Communication**
Communication happens via browser custom events:

```typescript
// Product Microfrontend - Emitting Event
const addToCart = (product: Product) => {
  const event = new CustomEvent('addToCart', {
    detail: product
  });
  window.dispatchEvent(event);
};

// Cart Microfrontend - Listening to Event
useEffect(() => {
  const handleAddToCart = (event: CustomEvent<Product>) => {
    setCartItems(prevItems => [...prevItems, event.detail]);
  };
  
  window.addEventListener('addToCart', handleAddToCart);
  return () => window.removeEventListener('addToCart', handleAddToCart);
}, []);
```

### 3. **Shared Type Safety**
All microfrontends use shared TypeScript interfaces:

```typescript
export interface Product {
  productId: string;
  productName: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AppContext {
  user: User | null;
}
```

## Demo Flow

1. **Open Application**: Navigate to http://localhost:4000
2. **View Products**: Product microfrontend displays available products
3. **Add to Cart**: Click "Add to Cart" button on any product
4. **Real-time Update**: Cart microfrontend immediately shows the added item
5. **Quantity Management**: Multiple clicks increase item quantity

## API Endpoints

```
GET /api/context          # Get shared application context
GET /mf-product/*         # Serve product microfrontend static assets
GET /mf-cart/*           # Serve cart microfrontend static assets
```

## Technology Stack

- **Frontend**: React 18+, TypeScript, Vite
- **Backend**: Node.js, Express.js
- **Architecture**: Microfrontends, Event-driven communication
- **Build System**: npm workspaces, TypeScript compiler
- **Styling**: Simple CSS files

## Development Scripts

```bash
# Install dependencies for all packages
npm install

# Start development servers for all packages
npm run dev

# Build all packages for production
npm run build

# Start production server
npm start

# Build individual packages
npm run build:types
npm run build:product
npm run build:cart
npm run build:container
```

## Extending the Application

### Adding New Microfrontends
1. Create new package in `/packages` directory
2. Configure Vite build with appropriate base path
3. Add static route in container Express server
4. Include script tag in shell HTML

### Adding New Event Types
1. Define event interface in `shared-types`
2. Implement event emission in source microfrontend
3. Add event listener in target microfrontend
4. Update TypeScript types for event payloads

### Adding Authentication
1. Extend `AppContext` interface in shared-types
2. Update container API to provide auth context
3. Implement auth-aware event filtering
4. Add JWT token handling if needed

## Performance Considerations

- **Bundle Splitting**: Each microfrontend builds independently
- **Event Filtering**: Events are scoped to prevent conflicts
- **Memory Management**: Event listeners are properly cleaned up
- **Static Serving**: Production builds are served efficiently

## Security Notes

- Validate all custom event payloads
- Implement CSP headers in production
- Consider event namespace isolation
- Audit microfrontend dependencies regularly

## Troubleshooting

### Build Issues
- Ensure all packages build in correct order (shared-types first)
- Check TypeScript configuration inheritance
- Verify Vite configuration for base paths

### Runtime Issues
- Check browser console for custom event errors
- Verify container server is serving static assets correctly
- Ensure event listeners are properly attached

### Development Issues
- Confirm all development servers are running
- Check port conflicts (default: 4000 for container)
- Verify npm workspace configuration

---

This example demonstrates a scalable, production-ready microfrontend architecture that can be adapted for complex enterprise applications requiring independent team development and deployment.