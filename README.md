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
- Node.js (server applications)
- Express.js (web framework)
- WebSocket (real-time communication)
- BroadcastChannel API (cross-tab communication)
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