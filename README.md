# React TypeScript Samples

This repository contains sample code demonstrating various React and TypeScript concepts through practical examples. Each sample is organised in its own directory and includes complete, working code that you can run and learn from.

## Samples

### Single App Instance
Located in the `single-app-instance` directory, this sample demonstrates:
- Singleton pattern implementation using BroadcastChannel API
- Cross-tab communication in React applications
- Ensuring only one primary instance runs across multiple browser tabs
- TypeScript integration with React and Vite
- Modern React development practices

### React SPA Inter-Communication
Located in the `react-spa-inter-communication` directory, this sample demonstrates:
- Communication between two separate React SPAs
- Real-time context synchronization via WebSocket connections
- Custom event system for cross-SPA communication
- Node.js server as a central hub for shared application state
- Event-driven architecture with TypeScript support

### Microfrontends with Custom Events and Shared Context
Located in the `microfrontends-custom-events-shared-context` directory, this sample demonstrates:
- Production-grade microfrontend architecture
- Independent React SPAs orchestrated by a container application
- Inter-microfrontend communication via browser custom events
- Monorepo structure with npm workspaces
- Express server serving microfrontend bundles and shared context

### React Version Bridge Microfrontend
Located in the `react-version-bridge` directory, this sample demonstrates:
- React version isolation with React 18 and React 19 coexistence
- Two dependency sharing patterns: Singleton and Web Components Bridge
- Module Federation implementation for microfrontend architecture
- Production-ready implementation with comprehensive test coverage (49/49 tests passing)
- Web Components bridge for complete React version isolation at the DOM boundary

### Next.js Server-Side Rendering
Located in the `nextjs-ssr` directory, this sample demonstrates:
- Next.js 15 with App Router and server-side rendering
- TypeScript integration with strict type checking
- Tailwind CSS for utility-first styling and responsive design
- Reusable UI component system (Button, Card, Navigation)
- API routes with full CRUD operations for products, posts, and contact forms
- Optimizations with security headers and performance tuning

### Route-Centric Layouts
Located in the `route-centric-layouts` directory, this sample demonstrates:
- Route-centric layout patterns with TanStack Router
- Type-safe routing with file-based routing system
- Different layouts for different route groups (MainLayout, DashboardLayout)
- Comprehensive testing with Vitest and Testing Library
- Component documentation and development with Storybook
- Code splitting and production-ready build optimization

### Headless React Components
Located in the `headless-tailwind` directory, this sample demonstrates:
- Headless architecture with logic separated from styling
- TypeScript-first component development with comprehensive interfaces
- Accessibility features with WCAG guidelines and keyboard navigation
- Tailwind CSS utility-first styling approach
- Responsive design with mobile-first breakpoints
- Reusable component system (Button, Modal, Dropdown) with multiple variants

## Getting Started

Each sample is a self-contained React application. To run any sample:

1. Navigate to the sample directory:
   ```bash
   cd <sample-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Technology Stack

- React 18+
- TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first CSS framework)
- TanStack Router (type-safe routing)
- Node.js (server applications)
- Express.js (web framework)
- WebSocket (real-time communication)
- BroadcastChannel API (cross-tab communication)
- Module Federation (microfrontend architecture)
- Web Components API (version isolation)
- Storybook (component documentation)
- Vitest (testing framework)
- ESLint
- Modern CSS

## Project Structure

Each sample follows a similar structure:
```
sample-directory/
├── src/              # Source code
├── public/           # Static assets
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the terms of the license included in the repository. 