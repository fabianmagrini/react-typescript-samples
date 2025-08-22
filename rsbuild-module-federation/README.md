# Modern Micro-Frontend Architecture with Module Federation

A complete micro-frontend application built with React, TypeScript, and Module Federation using Rsbuild. This project demonstrates how to build scalable, maintainable micro-frontends using modern web technologies.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Host Application                      │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │    Dashboard    │  │  User Profile   │                  │
│  │    Feature      │  │    Feature      │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
          ┌─────────▼─────────┐   ┌─────────▼─────────┐
          │ Remote Application │   │  BFF API Server   │
          │ ┌─────────────────┐│   │                   │
          │ │   Products      ││   │  RESTful APIs     │
          │ │   Feature       ││   │  Data Layer       │
          │ └─────────────────┘│   │  Mock Database    │
          │ ┌─────────────────┐│   │                   │
          │ │    Orders       ││   └───────────────────┘
          │ │   Feature       ││
          │ └─────────────────┘│
          └───────────────────┘
```

## 🚀 Features

### Architecture Features
- **Module Federation**: Runtime composition of micro-frontends
- **Vertical Slice Architecture**: Feature-based organization
- **Shared Type Safety**: TypeScript types shared across applications
- **Centralized State Management**: Zustand for client state
- **Server State Management**: TanStack Query for API state

### Technical Features
- **React 18** with modern hooks and patterns
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Rsbuild** for fast builds and development
- **Comprehensive Testing** (Unit, Integration, E2E)
- **Docker Support** for containerized deployment

### Development Features
- **Hot Module Replacement** for fast development
- **Type Checking** across all micro-frontends
- **Linting & Formatting** with ESLint and Prettier
- **Automated Scripts** for development and deployment

## 📁 Project Structure

```
rsbuild-module-federation/
├── apps/
│   ├── host/                    # Main host application
│   │   ├── src/
│   │   │   ├── features/        # Feature-based organization
│   │   │   │   ├── dashboard/
│   │   │   │   ├── user-profile/
│   │   │   │   └── shared/
│   │   │   ├── store/           # Zustand stores
│   │   │   ├── api/             # TanStack Query setup
│   │   │   └── types/           # Local type definitions
│   │   ├── e2e/                 # E2E tests
│   │   └── Dockerfile
│   ├── remote/                  # Remote micro-frontend
│   │   ├── src/
│   │   │   └── features/
│   │   │       ├── products/
│   │   │       └── orders/
│   │   └── Dockerfile
│   └── bff/                     # Backend for Frontend
│       ├── src/
│       │   ├── routes/
│       │   ├── services/
│       │   └── middleware/
│       └── Dockerfile
├── packages/
│   ├── shared-types/            # Shared TypeScript types
│   ├── ui-components/           # Shared React components
│   └── utils/                   # Shared utility functions
├── scripts/
│   ├── dev.sh                   # Development script
│   └── build.sh                 # Build script
├── docker-compose.yml
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rsbuild-module-federation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build shared packages**
   ```bash
   npm run build --workspace=@mf/shared-types
   npm run build --workspace=@mf/utils
   npm run build --workspace=@mf/ui-components
   ```

4. **Start development environment**
   ```bash
   npm run dev
   ```

   This will start all services:
   - Host App: http://localhost:3000
   - Remote App: http://localhost:3001
   - BFF API: http://localhost:3002

### Manual Service Management

If you prefer to start services manually:

```bash
# Terminal 1 - BFF API
npm run dev:bff

# Terminal 2 - Remote App
npm run dev:remote

# Terminal 3 - Host App
npm run dev:host
```

## 🧪 Testing

### Unit Tests
```bash
npm run test:unit
```

### End-to-End Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

### Interactive Test UI
```bash
npm run test:ui
```

## 🏗️ Building for Production

### Development Build
```bash
npm run build:dev
```

### Production Build
```bash
npm run build:prod
```

### Docker Build
```bash
npm run docker:build
npm run docker:up
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
HOST_URL=http://localhost:3000
REMOTE_URL=http://localhost:3001
BFF_URL=http://localhost:3002
API_BASE_URL=http://localhost:3002/api
```

### Module Federation Configuration

The Module Federation setup is configured in:
- `apps/host/rsbuild.config.ts` - Consumer configuration
- `apps/remote/rsbuild.config.ts` - Producer configuration

## 📦 Shared Packages

### @mf/shared-types
Common TypeScript interfaces and types used across all applications.

### @mf/ui-components
Reusable React components with consistent styling and behavior.

### @mf/utils
Utility functions for formatting, validation, and common operations.

## 🌊 State Management

### Client State (Zustand)
- Authentication state
- UI state (sidebar, theme, notifications)
- Local component state

### Server State (TanStack Query)
- API data fetching
- Caching and synchronization
- Background updates
- Error handling

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Consistent design system
- Responsive design
- Dark mode support

### Component Styling
- Shared component library
- Consistent spacing and typography
- Accessible design patterns

## 🚀 Deployment

### Docker Deployment

1. **Build images**
   ```bash
   docker-compose build
   ```

2. **Start services**
   ```bash
   docker-compose up
   ```

3. **Access application**
   - Application: http://localhost
   - Individual services available on their respective ports

### Production Considerations

- **Load Balancing**: Use nginx or similar for load balancing
- **CDN**: Serve static assets from CDN
- **Monitoring**: Implement application monitoring
- **Security**: Configure proper CORS and security headers

## 🔍 Development Tools

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Code Formatting
Prettier is configured to run automatically on save.

## 📚 Key Concepts

### Module Federation
- **Runtime Composition**: Applications are composed at runtime
- **Independent Deployment**: Each micro-frontend can be deployed independently
- **Shared Dependencies**: Common libraries are shared to reduce bundle size

### Vertical Slice Architecture
- **Feature-Based Organization**: Code is organized by business features
- **Encapsulation**: Each feature contains its own components, state, and logic
- **Reduced Coupling**: Features have minimal dependencies on each other

### Type Safety
- **Shared Types**: Common interfaces ensure consistency
- **Build-Time Checking**: TypeScript catches errors before runtime
- **Developer Experience**: IntelliSense and autocomplete support

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## 📝 Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all services in development mode |
| `npm run build` | Build all applications for production |
| `npm run test` | Run all tests |
| `npm run lint` | Check code style and quality |
| `npm run type-check` | Run TypeScript type checking |
| `npm run clean` | Clean build artifacts |
| `npm run docker:build` | Build Docker images |
| `npm run docker:up` | Start services with Docker |

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   # Kill the process
   kill -9 <PID>
   ```

2. **Module Federation Loading Issues**
   - Ensure remote app is running before host app
   - Check network connectivity between services
   - Verify CORS configuration

3. **Type Errors**
   ```bash
   # Rebuild shared packages
   npm run build --workspace=@mf/shared-types
   npm run type-check
   ```

### Performance Tips

- Use React.memo for expensive components
- Implement proper code splitting
- Optimize bundle sizes
- Use production builds for deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Module Federation](https://module-federation.github.io/)
- [Rsbuild](https://rsbuild.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

Built with ❤️ using modern web technologies