# Development Guide

This guide covers the development workflow for the Host-Managed Data Pattern Demo project.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# From project root
npm run install:all

# Or install individually
cd client && npm install
cd ../server && npm install
```

## 🔧 Development Workflow

### 1. Start Development Environment

```bash
# Start both client and server
npm run dev

# Or start individually
npm run dev:client    # Frontend on http://localhost:3000
npm run dev:server    # Backend on http://localhost:3001
```

### 2. Component Development with Storybook

For isolated component development and testing:

```bash
npm run storybook     # Start on http://localhost:6006
```

**Storybook Development Workflow:**
1. Create/modify components in `src/components/`
2. Write corresponding `.stories.ts` files
3. Test different states and props in Storybook
4. Verify accessibility and responsive design
5. Document component usage with JSDoc

### 3. Testing

```bash
# Run all tests
npm test

# Frontend tests only
npm run test:client

# Backend tests only  
npm run test:server

# Watch mode for development
cd client && npm run test:watch
```

### 4. Building

```bash
# Build everything
npm run build

# Build individual parts
npm run build:client
npm run build:server
npm run build-storybook
```

## 📁 File Organization

### Component Structure
```
src/components/
├── ComponentName.tsx          # Main component
├── ComponentName.stories.ts   # Storybook stories
├── ComponentNameDemo.tsx      # Demo version (if needed)
└── __tests__/
    └── ComponentName.test.tsx  # Component tests
```

### Adding New Components

1. **Create the component:**
```typescript
// src/components/NewComponent.tsx
export interface NewComponentProps {
  // Define props with JSDoc comments
}

export function NewComponent({ ...props }: NewComponentProps) {
  // Implementation
}
```

2. **Add to exports:**
```typescript
// src/components/index.ts
export { NewComponent } from './NewComponent'
export type { NewComponentProps } from './NewComponent'
```

3. **Create stories:**
```typescript
// src/components/NewComponent.stories.ts
import type { Meta, StoryObj } from '@storybook/react'
import { NewComponent } from './NewComponent'

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Default props
  },
}

export const Loading: Story = {
  args: {
    // Loading state props
  },
}

export const Error: Story = {
  args: {
    // Error state props
  },
}
```

4. **Write tests:**
```typescript
// src/components/__tests__/NewComponent.test.tsx
import { render, screen } from '@testing-library/react'
import { NewComponent } from '../NewComponent'

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />)
    expect(screen.getByRole('...')).toBeInTheDocument()
  })
})
```

## 🎯 Development Best Practices

### Component Guidelines
- Use TypeScript for all components
- Export props interfaces
- Add JSDoc comments for props
- Follow naming conventions (PascalCase for components)
- Use Tailwind CSS for styling
- Support both light and dark themes

### Storybook Guidelines
- Create stories for all component states
- Include `Loading`, `Error`, and `Empty` states
- Use realistic mock data
- Add accessibility testing
- Document component usage in stories

### Testing Guidelines
- Test component rendering
- Test user interactions
- Test error states
- Test accessibility
- Mock external dependencies
- Aim for high test coverage

### State Management
- Use Zustand for client state
- Use TanStack Query for server state
- Keep components pure when possible
- Pass data down as props from host components

## 🔄 Git Workflow

### Branch Naming
- `feature/component-name` - New components
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/area-description` - Refactoring

### Commit Messages
Follow conventional commits:
```
feat: add new UserCard component
fix: resolve dark mode toggle issue
docs: update Storybook documentation
test: add tests for UserList component
refactor: simplify state management logic
```

### Pre-commit Checklist
- [ ] All tests pass
- [ ] Storybook builds without errors
- [ ] TypeScript compiles without errors
- [ ] Components work in both light and dark modes
- [ ] New components have corresponding stories
- [ ] Documentation is updated

## 🛠️ Debugging

### Common Issues

**Storybook not loading components:**
- Check for missing dependencies in stories
- Verify component exports
- Check for store dependencies (use demo components)

**TypeScript errors:**
- Update type definitions in `src/types/api.ts`
- Check import/export statements
- Verify prop interfaces match usage

**Dark mode not working:**
- Ensure Tailwind classes include `dark:` variants
- Check theme toggle implementation
- Verify CSS custom properties

### Development Tools
- React Developer Tools
- Storybook Addon Panel
- Browser DevTools
- VS Code Extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets

## 📊 Performance

### Development Performance
- Use Vite's hot reload for fast development
- Lazy load components when needed
- Use React DevTools Profiler
- Monitor bundle size with Vite

### Storybook Performance
- Use controls sparingly for better performance
- Avoid complex mock data in stories
- Use story decorators for common setup

## 🚀 Deployment

### Development Build
```bash
npm run build
```

### Storybook Deployment
```bash
npm run build-storybook
# Deploy 'storybook-static' folder
```

### Environment Variables
Create `.env.local` for local development:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

## 📚 Resources

### Documentation
- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Storybook Docs](https://storybook.js.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Testing
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM](https://github.com/testing-library/jest-dom)

### Tools
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)