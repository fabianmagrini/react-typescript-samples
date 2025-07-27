# Development Guide

This guide covers the development workflow, coding standards, and best practices for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Component Development](#component-development)
- [API Development](#api-development)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Performance Guidelines](#performance-guidelines)
- [Debugging](#debugging)
- [Contributing](#contributing)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 18.18 or later
- **npm**: Version 9 or later (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-ssr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Development Environment

### Available Scripts

| Script | Purpose | Command |
|--------|---------|---------|
| `dev` | Start development server with Turbopack | `npm run dev` |
| `build` | Build for production | `npm run build` |
| `start` | Start production server | `npm run start` |
| `lint` | Run ESLint | `npm run lint` |
| `type-check` | Run TypeScript checking | `npm run type-check` |
| `build:analyze` | Analyze bundle size | `npm run build:analyze` |

### Development Server Features

- **Hot Reload**: Automatic page refresh on file changes
- **Fast Refresh**: Preserves React state during edits
- **Error Overlay**: Displays build errors in browser
- **TypeScript Support**: Real-time type checking
- **Turbopack**: Fast bundler for development

### Environment Configuration

Create `.env.local` for local environment variables:

```bash
# .env.local (not committed to git)
NEXT_PUBLIC_APP_NAME=NextApp Development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (if using)
DATABASE_URL=your_local_database_url

# Third-party services (if using)
ANALYTICS_ID=your_analytics_id
```

---

## Project Structure

### Directory Organization

```
nextjs-ssr/
├── docs/                      # Documentation
│   ├── API.md                # API documentation
│   ├── COMPONENTS.md         # Component documentation
│   ├── DEPLOYMENT.md         # Deployment guide
│   └── DEVELOPMENT.md        # This file
├── public/                   # Static assets
│   ├── favicon.ico
│   └── *.svg                # SVG icons
├── src/                     # Source code
│   ├── app/                 # Next.js App Router
│   │   ├── (pages)/         # Page routes
│   │   ├── api/             # API routes
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── ui/              # UI components
│   │   └── *.tsx            # Layout components
│   ├── lib/                 # Utility functions
│   │   └── utils.ts         # Helper utilities
│   └── types/               # TypeScript definitions
│       └── index.ts         # Type definitions
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

### File Naming Conventions

- **Components**: PascalCase (`Button.tsx`, `UserCard.tsx`)
- **Pages**: lowercase with hyphens (`about.tsx`, `contact-us.tsx`)
- **API Routes**: lowercase (`route.ts`, `users.ts`)
- **Utilities**: camelCase (`formatDate.ts`, `apiClient.ts`)
- **Types**: PascalCase (`User.ts`, `ApiResponse.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

---

## Coding Standards

### TypeScript Guidelines

1. **Use Strict Mode**
   ```typescript
   // Always enable strict mode in tsconfig.json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. **Interface vs Type**
   ```typescript
   // Use interfaces for object shapes
   interface User {
     id: string;
     name: string;
     email: string;
   }

   // Use types for unions, primitives, computed types
   type Status = 'loading' | 'success' | 'error';
   type UserWithStatus = User & { status: Status };
   ```

3. **Function Typing**
   ```typescript
   // Explicit return types for exported functions
   export function formatDate(date: Date): string {
     return date.toISOString().split('T')[0];
   }

   // Use const assertions for immutable data
   const API_ENDPOINTS = {
     USERS: '/api/users',
     PRODUCTS: '/api/products'
   } as const;
   ```

### React Guidelines

1. **Component Structure**
   ```typescript
   // 1. Imports
   import React from 'react';
   import { SomeType } from '@/types';

   // 2. Interface/Props definition
   interface ComponentProps {
     title: string;
     isVisible?: boolean;
   }

   // 3. Component implementation
   export default function Component({ title, isVisible = true }: ComponentProps) {
     // 4. Hooks
     const [state, setState] = useState();

     // 5. Functions
     const handleClick = () => {
       // Handle click
     };

     // 6. Early returns
     if (!isVisible) return null;

     // 7. JSX
     return (
       <div>
         <h1>{title}</h1>
       </div>
     );
   }
   ```

2. **Hooks Guidelines**
   ```typescript
   // Use custom hooks for reusable logic
   function useLocalStorage<T>(key: string, initialValue: T) {
     const [storedValue, setStoredValue] = useState<T>(() => {
       try {
         const item = window.localStorage.getItem(key);
         return item ? JSON.parse(item) : initialValue;
       } catch (error) {
         return initialValue;
       }
     });

     const setValue = (value: T | ((val: T) => T)) => {
       try {
         const valueToStore = value instanceof Function ? value(storedValue) : value;
         setStoredValue(valueToStore);
         window.localStorage.setItem(key, JSON.stringify(valueToStore));
       } catch (error) {
         console.error(error);
       }
     };

     return [storedValue, setValue] as const;
   }
   ```

### CSS/Styling Guidelines

1. **Tailwind Utility Classes**
   ```tsx
   // Group related utilities
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
     
   // Use responsive prefixes
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     
   // Extract complex combinations to components
   const cardClasses = "rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow";
   ```

2. **Custom CSS (when necessary)**
   ```css
   /* Use CSS custom properties for dynamic values */
   .component {
     --primary-color: theme('colors.blue.600');
     background-color: var(--primary-color);
   }

   /* Use @apply for component-level styles */
   .btn-primary {
     @apply bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors;
   }
   ```

### API Development Standards

1. **Route Structure**
   ```typescript
   // /api/resource/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   import { ApiResponse } from '@/types';

   export async function GET(request: NextRequest) {
     try {
       // Implementation
       const data = await fetchData();
       
       const response: ApiResponse<DataType> = {
         data,
         success: true,
         message: 'Data fetched successfully'
       };

       return NextResponse.json(response);
     } catch (error) {
       const response: ApiResponse<null> = {
         data: null,
         success: false,
         message: 'Failed to fetch data'
       };

       return NextResponse.json(response, { status: 500 });
     }
   }
   ```

2. **Error Handling**
   ```typescript
   // Consistent error response format
   function handleApiError(error: unknown): NextResponse {
     console.error('API Error:', error);
     
     const response: ApiResponse<null> = {
       data: null,
       success: false,
       message: error instanceof Error ? error.message : 'Internal server error'
     };

     return NextResponse.json(response, { status: 500 });
   }
   ```

---

## Component Development

### Creating New Components

1. **UI Components** (in `src/components/ui/`)
   ```typescript
   // src/components/ui/NewComponent.tsx
   import { HTMLAttributes, forwardRef } from 'react';
   import { cn } from '@/lib/utils';

   interface NewComponentProps extends HTMLAttributes<HTMLDivElement> {
     variant?: 'default' | 'secondary';
     size?: 'sm' | 'md' | 'lg';
   }

   const NewComponent = forwardRef<HTMLDivElement, NewComponentProps>(
     ({ className, variant = 'default', size = 'md', ...props }, ref) => {
       return (
         <div
           ref={ref}
           className={cn(
             'base-styles',
             variants[variant],
             sizes[size],
             className
           )}
           {...props}
         />
       );
     }
   );

   NewComponent.displayName = 'NewComponent';
   export default NewComponent;
   ```

2. **Layout Components** (in `src/components/`)
   ```typescript
   // src/components/NewLayout.tsx
   import { ReactNode } from 'react';

   interface NewLayoutProps {
     children: ReactNode;
     title?: string;
   }

   export default function NewLayout({ children, title }: NewLayoutProps) {
     return (
       <div className="layout-container">
         {title && <h1>{title}</h1>}
         <main>{children}</main>
       </div>
     );
   }
   ```

### Component Testing

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../ui/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## API Development

### Creating API Routes

1. **Basic Route Structure**
   ```typescript
   // src/app/api/example/route.ts
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(request: NextRequest) {
     // Handle GET request
   }

   export async function POST(request: NextRequest) {
     // Handle POST request
   }

   export async function PUT(request: NextRequest) {
     // Handle PUT request
   }

   export async function DELETE(request: NextRequest) {
     // Handle DELETE request
   }
   ```

2. **Dynamic Routes**
   ```typescript
   // src/app/api/users/[id]/route.ts
   export async function GET(
     request: NextRequest,
     { params }: { params: Promise<{ id: string }> }
   ) {
     const { id } = await params;
     // Use id parameter
   }
   ```

3. **Request Validation**
   ```typescript
   // Validate request body
   async function validateRequest(request: NextRequest) {
     try {
       const body = await request.json();
       
       if (!body.email || !body.name) {
         throw new Error('Missing required fields');
       }
       
       return body;
     } catch (error) {
       throw new Error('Invalid request body');
     }
   }
   ```

### Database Integration (Future)

```typescript
// src/lib/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}
```

---

## Testing

### Test Setup

1. **Install Testing Dependencies**
   ```bash
   npm install -D jest @testing-library/react @testing-library/jest-dom
   npm install -D @types/jest jest-environment-jsdom
   ```

2. **Jest Configuration**
   ```javascript
   // jest.config.js
   const nextJest = require('next/jest');

   const createJestConfig = nextJest({
     dir: './',
   });

   const customJestConfig = {
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     moduleNameMapping: {
       '^@/(.*)$': '<rootDir>/src/$1',
     },
     testEnvironment: 'jest-environment-jsdom',
   };

   module.exports = createJestConfig(customJestConfig);
   ```

### Testing Strategies

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **API Tests**: Test API endpoints
4. **E2E Tests**: Test complete user flows (future: Playwright/Cypress)

### Test Examples

```typescript
// Component test
describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    inStock: true
  };

  it('displays product information', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });
});

// API test
describe('/api/products', () => {
  it('returns products list', async () => {
    const req = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});
```

---

## Git Workflow

### Branch Strategy

```bash
# Main branches
main                 # Production-ready code
develop             # Integration branch

# Feature branches
feature/user-auth   # New features
bugfix/form-validation  # Bug fixes
hotfix/security-patch   # Critical fixes
```

### Commit Messages

Follow conventional commit format:

```bash
# Format: type(scope): description
feat(auth): add user authentication
fix(api): handle validation errors
docs(readme): update installation guide
style(components): improve button styling
refactor(utils): simplify date formatting
test(api): add product endpoint tests
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   ```bash
   # Make your changes
   npm run type-check
   npm run lint
   npm run build
   ```

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(component): add new component"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/new-feature
   # Create pull request via GitHub/GitLab
   ```

### Pre-commit Hooks (Future)

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

---

## Performance Guidelines

### Code Optimization

1. **Bundle Size**
   ```typescript
   // Use dynamic imports for large dependencies
   const HeavyComponent = lazy(() => import('./HeavyComponent'));

   // Import only what you need
   import { debounce } from 'lodash/debounce';
   ```

2. **Image Optimization**
   ```tsx
   import Image from 'next/image';

   // Always use Next.js Image component
   <Image
     src="/product.jpg"
     alt="Product"
     width={300}
     height={200}
     priority={isAboveFold}
   />
   ```

3. **React Performance**
   ```typescript
   // Use memo for expensive computations
   const expensiveValue = useMemo(() => {
     return computeExpensiveValue(data);
   }, [data]);

   // Use callback for stable function references
   const handleClick = useCallback(() => {
     onItemClick(item.id);
   }, [item.id, onItemClick]);
   ```

### Monitoring Performance

```bash
# Analyze bundle size
npm run build:analyze

# Performance profiling
npm run dev -- --profile

# Lighthouse audit
npx lighthouse http://localhost:3000
```

---

## Debugging

### Development Tools

1. **React Developer Tools**
   - Install browser extension
   - Inspect component props/state
   - Profile component renders

2. **Next.js Debug Mode**
   ```bash
   DEBUG=* npm run dev
   ```

3. **TypeScript Compiler**
   ```bash
   # Watch mode for type checking
   npx tsc --watch --noEmit
   ```

### Common Debugging Scenarios

1. **Hydration Errors**
   ```typescript
   // Use suppressHydrationWarning for client-only content
   <div suppressHydrationWarning>
     {new Date().toLocaleString()}
   </div>
   ```

2. **API Route Issues**
   ```typescript
   // Add logging to API routes
   export async function GET(request: NextRequest) {
     console.log('API called:', request.url);
     console.log('Headers:', Object.fromEntries(request.headers));
     
     try {
       // Implementation
     } catch (error) {
       console.error('API Error:', error);
       throw error;
     }
   }
   ```

3. **State Management Issues**
   ```typescript
   // Use React DevTools Profiler
   import { Profiler } from 'react';

   function onRenderCallback(id, phase, actualDuration) {
     console.log('Render:', { id, phase, actualDuration });
   }

   <Profiler id="App" onRender={onRenderCallback}>
     <App />
   </Profiler>
   ```

---

## Contributing

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests if applicable**
5. **Update documentation**
6. **Submit pull request**

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Components are tested
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Accessibility considerations
- [ ] Performance implications considered
- [ ] Mobile responsiveness verified

### Development Best Practices

1. **Keep components small and focused**
2. **Use TypeScript strictly**
3. **Write meaningful commit messages**
4. **Add tests for new features**
5. **Update documentation**
6. **Consider accessibility**
7. **Optimize for performance**
8. **Follow security best practices**

---

## Future Enhancements

### Planned Improvements

1. **Testing Infrastructure**
   - Unit tests with Jest
   - Integration tests with React Testing Library
   - E2E tests with Playwright
   - Visual regression testing

2. **Development Tools**
   - Prettier configuration
   - Husky pre-commit hooks
   - Lint-staged for staged files
   - Conventional commits enforcement

3. **Code Quality**
   - SonarQube integration
   - Code coverage reporting
   - Performance budgets
   - Bundle analysis automation

4. **Documentation**
   - Storybook for component documentation
   - API documentation with Swagger
   - Architecture decision records
   - Contribution guidelines

5. **CI/CD Pipeline**
   - GitHub Actions workflows
   - Automated testing
   - Security scanning
   - Deployment automation