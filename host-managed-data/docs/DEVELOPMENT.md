# Development Guide

## Getting Started

### Prerequisites
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Auto Import - ES6, TS, JSX, TSX

### Initial Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd host-managed-data
```

2. **Install dependencies:**
```bash
npm run install:all
```

3. **Start development servers:**
```bash
npm run dev
```

This starts:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

4. **Start Storybook (optional):**
```bash
npm run storybook
```

This starts:
- Storybook: [http://localhost:6006](http://localhost:6006)

## Development Workflow

### Daily Development Process

1. **Start development environment:**
```bash
npm run dev
npm run storybook  # Optional: for component development
```

2. **Develop components** in isolation using Storybook
3. **Make changes** to your code  
4. **Test components** in Storybook with different props and states
5. **See live updates** via hot reload
6. **Run tests** frequently:
```bash
npm test
```

7. **Build before committing:**
```bash
npm run build
```

### File Structure & Organization

```
client/
├── .storybook/          # Storybook configuration
│   ├── main.ts          # Storybook main config
│   └── preview.ts       # Global decorators and parameters
├── src/
│   ├── components/      # React components
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.stories.tsx  # Storybook stories
│   │   ├── __tests__/   # Component tests
│   │   └── index.ts     # Barrel exports
│   ├── hooks/          # Custom React hooks
│   ├── stores/         # Zustand stores
│   ├── api/            # API client
│   ├── types/          # TypeScript definitions
│   ├── lib/            # Utility libraries
│   └── test/           # Test configuration
└── storybook-static/   # Built Storybook (after build-storybook)
```

## Architecture Patterns

### Host-Managed Data Pattern

**Key Principles:**
1. **Single Source of Truth** - Host component manages all data
2. **Unidirectional Data Flow** - Data flows down, events flow up
3. **Separation of Concerns** - Data logic separate from UI logic
4. **Props Interface** - Children receive data as props

**Implementation:**
```typescript
// Host Component Pattern
function HostComponent() {
  // All data fetching happens here
  const usersQuery = useUsers()
  const postsQuery = usePosts(selectedUserId)
  
  return (
    <div>
      <UserList 
        users={usersQuery.data || []}
        isLoading={usersQuery.isLoading}
        error={usersQuery.error}
      />
      <PostList 
        posts={postsQuery.data || []}
        isLoading={postsQuery.isLoading}
        error={postsQuery.error}
      />
    </div>
  )
}
```

### State Management Strategy

**TanStack Query for Server State:**
```typescript
// Custom hook for data fetching
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getUsers(),
  })
}
```

**Zustand for Client State:**
```typescript
// Lightweight state for UI concerns
export const useAppStore = create<AppStore>((set) => ({
  selectedUserId: null,
  theme: 'light',
  
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}))
```

## Coding Standards

### TypeScript Guidelines

1. **Always use explicit types:**
```typescript
// Good
interface UserProps {
  user: User
  onSelect: (id: number) => void
}

// Avoid
function UserCard(props: any) { }
```

2. **Use proper imports:**
```typescript
// Good
import type { User } from '../types/api'
import { Card } from '../components/Card'

// Avoid
import { User, Card } from '../../../types/api'
```

3. **Export interfaces:**
```typescript
// api.ts
export interface User {
  id: number
  name: string
  // ...
}
```

### React Component Guidelines

1. **Use function components:**
```typescript
// Good
export function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>
}

// Avoid class components unless necessary
```

2. **Props interface pattern:**
```typescript
interface ComponentNameProps {
  prop1: string
  prop2?: number  // Optional props with ?
  onAction: () => void
}

export function ComponentName({ prop1, prop2, onAction }: ComponentNameProps) {
  // Component implementation
}
```

3. **Early returns for conditional rendering:**
```typescript
// Good
if (isLoading) {
  return <LoadingSkeleton />
}

if (error) {
  return <ErrorMessage error={error} />
}

return <MainContent />
```

### CSS/Styling Guidelines

1. **Use Tailwind utility classes:**
```tsx
// Good
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">

// Avoid custom CSS unless absolutely necessary
```

2. **Component-specific styling:**
```tsx
// Use conditional classes for state
className={`
  w-full p-3 rounded-md transition-colors
  ${isSelected 
    ? 'bg-blue-100 dark:bg-blue-900' 
    : 'bg-gray-50 dark:bg-gray-700'
  }
`}
```

3. **Dark mode support:**
```tsx
// Always include dark mode variants
<div className="text-gray-900 dark:text-white">
  <h1 className="bg-white dark:bg-gray-800">
```

## Storybook Development

### Component-Driven Development

Storybook enables component-driven development by allowing you to:

1. **Develop components in isolation**
2. **Test different states and props**
3. **Document component APIs**
4. **Share components with team members**

### Creating Stories

**Story File Naming Convention:**
```
ComponentName.stories.tsx
```

**Basic Story Structure:**
```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    prop1: 'value1',
    prop2: true,
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
}
```

### Story Development Workflow

1. **Create component** with TypeScript interfaces
2. **Write basic story** with default props
3. **Add story variants** for different states:
   - Loading states
   - Error states
   - Empty states
   - Edge cases
4. **Test component** with Storybook controls
5. **Document component** using JSDoc comments

### Storybook Features

**Dark Mode Toggle:**
- Use the theme selector in the toolbar
- Stories automatically adapt to light/dark themes
- Test components in both modes

**Interactive Controls:**
- Modify component props in real-time
- Test different combinations of props
- Validate component behavior

**Responsive Testing:**
- Use viewport addon to test different screen sizes
- Verify mobile responsiveness

### Storybook Commands

```bash
# Development
npm run storybook              # Start dev server on :6006

# Building
npm run build-storybook        # Build static files

# Stories location
client/src/components/*.stories.tsx
```

### Best Practices

1. **Cover all component states:**
   ```typescript
   export const Loading: Story = { ... }
   export const Error: Story = { ... }
   export const Empty: Story = { ... }
   export const WithLongContent: Story = { ... }
   ```

2. **Use decorators for layout:**
   ```typescript
   decorators: [
     (Story) => (
       <div style={{ width: '400px', padding: '1rem' }}>
         <Story />
       </div>
     ),
   ],
   ```

3. **Add documentation:**
   ```typescript
   parameters: {
     docs: {
       description: {
         component: 'A reusable card component with dark mode support.',
       },
     },
   },
   ```

## Development Tools

### VS Code Configuration

**Recommended settings.json:**
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

**Useful VS Code Extensions:**
- TypeScript Hero
- Auto Import - ES6, TS, JSX, TSX
- Tailwind CSS IntelliSense
- Error Lens
- GitLens

### Browser DevTools

**React DevTools:**
- Install React Developer Tools extension
- Inspect component hierarchy
- View props and state

**TanStack Query DevTools:**
- Already configured in development
- View query cache and status
- Debug network requests

## Testing During Development

### Test-Driven Development (TDD)

1. **Write failing test:**
```typescript
test('should select user when clicked', () => {
  const mockOnSelect = vi.fn()
  render(<UserCard user={mockUser} onSelect={mockOnSelect} />)
  
  fireEvent.click(screen.getByRole('button'))
  expect(mockOnSelect).toHaveBeenCalledWith(mockUser.id)
})
```

2. **Implement feature:**
```typescript
export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <button onClick={() => onSelect(user.id)}>
      {user.name}
    </button>
  )
}
```

3. **Refactor and improve**

### Testing Commands

```bash
# Run tests in watch mode (recommended for development)
npm run test:client

# Run specific test file
npm run test:client UserCard.test.tsx

# Run tests with coverage
npm run test:client -- --coverage
```

## Performance Optimization

### React Performance

1. **Use React.memo for expensive renders:**
```typescript
export const UserCard = React.memo(function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>
})
```

2. **Optimize re-renders with useMemo/useCallback:**
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

const handleClick = useCallback((id: number) => {
  onSelect(id)
}, [onSelect])
```

### TanStack Query Optimization

1. **Configure appropriate stale times:**
```typescript
useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

2. **Use query invalidation strategically:**
```typescript
// Invalidate when data changes
queryClient.invalidateQueries(['users'])
```

## Debugging

### Common Issues & Solutions

1. **TypeScript Errors:**
   - Check import paths
   - Verify interface definitions
   - Use type assertions sparingly

2. **React Query Issues:**
   - Check network tab for failed requests
   - Verify query keys are consistent
   - Use React Query DevTools

3. **Styling Issues:**
   - Verify Tailwind classes are correct
   - Check dark mode variants
   - Inspect element in browser DevTools

### Debugging Tools

```typescript
// Debug component renders
console.log('Component rendered', { props, state })

// Debug query state
const query = useUsers()
console.log('Query state:', query)

// Debug store state
const store = useAppStore()
console.log('Store state:', store)
```

## Git Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `test/test-description` - Test additions

### Commit Message Format
```
type(scope): description

Examples:
feat(components): add UserCard component
fix(api): handle network errors properly
refactor(stores): simplify state management
test(components): add UserList tests
```

### Pre-commit Checklist
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] No ESLint errors
- [ ] Build completes successfully
- [ ] Dark mode works correctly

## Environment Variables

### Development Environment
Create `.env.local` files in client/server directories:

**Client (.env.local):**
```env
VITE_API_URL=http://localhost:3001
```

**Server (.env.local):**
```env
PORT=3001
NODE_ENV=development
```

## Hot Reload & Development Server

### Vite Configuration
- Automatic reloading on file changes
- Fast refresh for React components
- Proxy API calls to backend server

### Server Configuration
- TypeScript compilation with tsx
- Automatic restart on file changes
- CORS enabled for development

## Troubleshooting

### Common Development Issues

1. **Port conflicts:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

2. **Node modules issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

3. **TypeScript cache issues:**
```bash
# Clear TypeScript cache
npx tsc --build --clean
```

### Getting Help

1. Check existing tests for patterns
2. Review TypeScript errors carefully
3. Use browser DevTools for debugging
4. Check React Query DevTools for API issues
5. Refer to official documentation:
   - [React](https://react.dev/)
   - [TanStack Query](https://tanstack.com/query/latest)
   - [Zustand](https://github.com/pmndrs/zustand)
   - [Tailwind CSS](https://tailwindcss.com/)

---

Happy coding! 🚀