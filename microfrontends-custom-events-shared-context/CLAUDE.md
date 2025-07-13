# Microfrontend Application - Development Guide

## Overview
This is a production-grade microfrontend application built with React, TypeScript, and Node.js. The architecture demonstrates independent microfrontends communicating via browser custom events.

## Architecture
- **Container App**: Express server serving the shell HTML and orchestrating microfrontends
- **Product Microfrontend**: React SPA displaying products with "Add to Cart" functionality
- **Cart Microfrontend**: React SPA managing shopping cart state via custom events
- **Shared Types**: Common TypeScript interfaces for type safety

## Project Structure
```
/packages
├── container-app/          # Express server (port 4000)
├── microfrontend-product/   # Product display React app
├── microfrontend-cart/      # Shopping cart React app
└── shared-types/           # Shared TypeScript interfaces
```

## Development Commands

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```
Starts all services concurrently:
- Container app on http://localhost:4000
- Product microfrontend dev server
- Cart microfrontend dev server

### Build for Production
```bash
npm run build
```
Builds all packages in correct order:
1. shared-types
2. microfrontend-product
3. microfrontend-cart
4. container-app

### Start Production Server
```bash
npm start
```
Runs the built container app serving static microfrontend bundles.

## Communication Protocol
- **Event Name**: `addToCart`
- **Direction**: Product → Cart
- **Payload**: Product interface with `productId`, `productName`, `price`

## API Endpoints
- `GET /api/context` - Returns shared application context
- `GET /mf-product/*` - Serves product microfrontend static assets
- `GET /mf-cart/*` - Serves cart microfrontend static assets

## Technology Stack
- **Frontend**: React 18+, TypeScript, Vite
- **Backend**: Node.js, Express
- **Build**: npm workspaces, TypeScript compiler
- **Styling**: Simple CSS files (no CSS-in-JS)

## Testing
After making changes, always run:
```bash
npm run build
npm start
```
Then visit http://localhost:4000 to test the complete application.

## Key Files
- `/packages/container-app/src/index.ts` - Express server setup
- `/packages/container-app/public/index.html` - Shell HTML page
- `/packages/shared-types/src/index.ts` - TypeScript interfaces
- `/packages/microfrontend-product/src/App.tsx` - Product component
- `/packages/microfrontend-cart/src/App.tsx` - Cart component