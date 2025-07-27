# Route-Centric Layouts Demo

A React demonstration application showcasing route-centric layout patterns with TanStack Router, TypeScript, Tailwind CSS, and Storybook.

## 🚀 Features

- **Type-safe Routing**: Built with TanStack Router for excellent developer experience
- **Route-centric Layouts**: Different layouts for different route groups
- **Modern Styling**: Tailwind CSS for rapid development and consistent design
- **Component Documentation**: Storybook for component development and testing
- **Comprehensive Testing**: Vitest and Testing Library for reliable testing
- **Optimized Build**: Code splitting and production-ready configuration

## 🛠️ Technology Stack

- **React 18** - Modern React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **TanStack Router** - Type-safe routing with file-based routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **Storybook** - Tool for building UI components in isolation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── *.stories.tsx   # Storybook stories
├── layouts/            # Layout components
│   ├── MainLayout.tsx  # Default layout
│   ├── DashboardLayout.tsx # Dashboard-specific layout
│   └── __tests__/      # Layout tests
├── routes/             # TanStack Router route definitions
│   ├── __root.tsx     # Root route layout
│   ├── index.tsx      # Home page (/)
│   ├── about.tsx      # About page (/about)
│   ├── dashboard.tsx  # Dashboard page (/dashboard)
│   └── __tests__/     # Route integration tests
├── test/              # Test configuration
└── utils/             # Utility functions
```

## 🎯 Route-Centric Layouts

This demo showcases route-centric layout patterns where different routes use different layout components, providing maximum flexibility:

- **MainLayout**: Used for public pages (Home, About)
  - Header with navigation
  - Main content area
  - Footer
  
- **DashboardLayout**: Used for dashboard routes
  - Sidebar navigation
  - Header with user actions
  - Main content area

Each route defines which layout to use, providing maximum flexibility and code reuse.

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone or download this demo
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm test -- --run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Layout and routing tests
- **Storybook**: Interactive component testing and documentation

Run tests:
```bash
npm test
```

## 📖 Storybook

Storybook is configured for component development and documentation. It includes:

- Interactive component playground
- Documentation with auto-generated prop tables
- Visual testing capabilities

Start Storybook:
```bash
npm run storybook
```

## 🏗️ Building for Production

The project is optimized for production with:

- Code splitting for vendors and router code
- Source maps for debugging
- Optimized bundle sizes
- Modern ES modules

Build for production:
```bash
npm run build
```

## 🔧 Configuration

### TanStack Router

Routes are automatically generated from the `src/routes/` directory. The router configuration includes:

- File-based routing
- Type-safe navigation
- Route-specific layouts
- Development tools

### Tailwind CSS

Tailwind is configured to include:
- All source files for purging unused styles
- Storybook stories for component documentation
- Custom utilities and components

### Testing

Vitest is configured with:
- JSDoc globals for test functions
- React Testing Library setup
- CSS import handling
- Test coverage reporting

## 📚 Learning Objectives

This demo illustrates several key concepts:

1. **Route-Centric Architecture**: How to organize layouts by route groups
2. **Type Safety**: Full TypeScript integration with TanStack Router
3. **Component Design**: Composable, reusable layout components
4. **Testing Strategy**: Component and integration testing approaches
5. **Documentation**: Component stories and development workflow
6. **Performance**: Code splitting and build optimization
7. **Accessibility**: Semantic HTML and accessible design patterns

## 🏗️ Architecture

### Layout Pattern

This demo uses a route-centric layout approach where:
- Routes define which layout component to use
- Layouts are composed and reusable
- Each layout handles its own navigation and structure
- Maximum flexibility for different application sections

### Adding New Layouts

1. Create layout component in `src/layouts/`
2. Define route in `src/routes/` with layout
3. Router automatically picks up file-based routes
4. Add tests and stories for the new layout

## 🚀 Deployment

Build for deployment:
```bash
npm run build
```

The `dist/` directory contains the optimized build ready for hosting on any static server.

## 📄 License

This demo is licensed under the MIT License.