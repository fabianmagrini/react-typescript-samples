# Storybook Documentation

Complete guide to using Storybook for component development and documentation.

## 🚀 Quick Start

### Start Storybook
```bash
npm run storybook
```

Browse to [http://localhost:6006](http://localhost:6006) to view the component library.

### Build Static Storybook
```bash
npm run build-storybook
```

Generates a static site in `storybook-static/` for deployment.

## 📚 Overview

Storybook provides an isolated environment for developing and testing React components. It enables:

- **Component Isolation**: Develop components without running the full application
- **Interactive Development**: Modify props and see changes in real-time
- **Documentation**: Auto-generated docs from TypeScript types
- **Visual Testing**: Compare component states side-by-side
- **Accessibility Testing**: Built-in a11y validation

## 🏗️ Configuration

### Main Configuration
**Location:** `.storybook/main.ts`

```typescript
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  }
}
```

**Key Features:**
- React-Vite framework for fast builds
- Auto-discovery of story files
- Documentation addon for auto-generated docs
- Simplified configuration for Storybook 9.1+

### Preview Configuration
**Location:** `.storybook/preview.ts`

```typescript
const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
}
```

**Global Settings:**
- Centered layout for component stories
- Simplified configuration without theme switching
- Compatible with Tailwind dark mode classes

## 📖 Story Structure

### Story File Format
```typescript
// Component.stories.ts
import type { Meta, StoryObj } from '@storybook/react'
import { Component } from './Component'

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Component props
  },
}
```

### Story Naming Convention
- `Default` - Basic component with standard props
- `Loading` - Component in loading state
- `Error` - Component displaying error state
- `Empty` - Component with no data
- `[Variant]` - Specific use cases or configurations

## 🧩 Component Stories

### Card Component
**File:** `Card.stories.ts`

Stories demonstrate the reusable card wrapper:
- **Default**: Basic card with text content
- **WithChildren**: Card containing other components
- **LongContent**: Card with extended content for overflow testing
- **Minimal**: Card with minimal styling

### UserList Component
**File:** `UserList.stories.ts`

Uses `UserListDemo` for state isolation:
- **Default**: List with sample users and selection
- **Loading**: Skeleton loading animation
- **Error**: Error state with user-friendly message
- **SingleUser**: List containing only one user
- **Empty**: Empty state when no users available

### PostList Component
**File:** `PostList.stories.ts`

Uses `PostListDemo` for state isolation:
- **Default**: List with sample posts
- **FilteredByUser**: Posts filtered by specific user
- **Loading**: Skeleton loading animation
- **Error**: Network error state
- **Empty**: No posts available
- **LongContent**: Posts with long titles testing truncation

### PostDetail Component
**File:** `PostDetail.stories.ts`

Comprehensive post detail scenarios:
- **Default**: Standard post with typical content
- **LongContent**: Post with extensive text content
- **Loading**: Loading state display
- **Error**: Post not found error
- **NoSelection**: No post selected state
- **ShortPost**: Minimal content post

## 🎨 Design System Features

### Dark Mode Support
Components automatically support dark mode through Tailwind CSS classes:
```css
/* Light mode */
bg-white text-gray-900

/* Dark mode */
dark:bg-gray-800 dark:text-white
```

Stories work with browser's dark mode preference or manual toggling.

### Responsive Design
All components are tested across different viewport sizes:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

### Interactive Controls
Storybook automatically generates controls for component props:
- Text inputs for strings
- Number inputs for numbers
- Checkboxes for booleans
- Select dropdowns for enums

## 🧪 Testing with Storybook

### Visual Testing
Each story serves as a visual test case:
- Compare component states side-by-side
- Verify consistent styling across variants
- Test responsive behavior
- Validate dark mode appearance

### Accessibility Testing
Built-in accessibility validation:
- Color contrast checking
- ARIA label validation
- Keyboard navigation testing
- Screen reader compatibility

### Manual Testing
Interactive environment for manual testing:
- User interaction flows
- Edge case scenarios
- Cross-browser compatibility
- Performance under load

## 🔧 Development Workflow

### Creating New Stories

1. **Create the component:**
```typescript
// src/components/NewComponent.tsx
export interface NewComponentProps {
  title: string
  isLoading?: boolean
  error?: Error | null
}

export function NewComponent({ title, isLoading, error }: NewComponentProps) {
  // Component implementation
}
```

2. **Create demo component (if needed):**
```typescript
// src/components/NewComponentDemo.tsx
// For components with external dependencies
export function NewComponentDemo(props: NewComponentProps) {
  // Isolated implementation with local state
}
```

3. **Write stories:**
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
    title: 'Sample Title',
    isLoading: false,
    error: null,
  },
}

export const Loading: Story = {
  args: {
    title: 'Loading Title',
    isLoading: true,
    error: null,
  },
}

export const Error: Story = {
  args: {
    title: 'Error Title',
    isLoading: false,
    error: { name: 'Error', message: 'Something went wrong' } as Error,
  },
}
```

### Story Best Practices

1. **Cover All States**: Include loading, error, empty, and success states
2. **Use Realistic Data**: Provide meaningful mock data
3. **Test Edge Cases**: Long content, special characters, edge values
4. **Document Usage**: Add JSDoc comments for complex props
5. **Accessibility**: Ensure proper ARIA labels and semantic HTML

### Debugging Stories

**Common Issues:**
- **Missing Dependencies**: Check imports and exports
- **Type Errors**: Verify prop interfaces match
- **Build Errors**: Check Storybook configuration
- **State Dependencies**: Use demo components for isolation

**Solutions:**
- Use browser DevTools for debugging
- Check Storybook console for errors
- Verify component isolation
- Test individual stories

## 📦 Mock Data

### Realistic Test Data
Stories use realistic mock data to provide meaningful examples:

```typescript
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    website: 'john-doe.com',
    company: {
      name: 'Doe Enterprises',
      catchPhrase: 'Innovation at its finest',
      bs: 'transform global solutions'
    },
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' }
    }
  },
  // More users...
]
```

### Data Generation
For components requiring large datasets:
- Use factories for generating consistent data
- Vary content length and complexity
- Include edge cases (empty strings, long text)
- Test with different data types

## 🚀 Deployment

### Static Build
```bash
npm run build-storybook
```

Generates optimized static files in `storybook-static/`:
- HTML, CSS, and JavaScript files
- Component documentation
- Interactive component explorer
- Search functionality

### Hosting Options
- **Netlify**: Drag and drop `storybook-static` folder
- **Vercel**: Connect Git repository for automatic deploys
- **GitHub Pages**: Use GitHub Actions for deployment
- **AWS S3**: Upload static files to S3 bucket

### CI/CD Integration
```yaml
# .github/workflows/storybook.yml
name: Build and Deploy Storybook
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build Storybook
        run: npm run build-storybook
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

## 📊 Advanced Features

### Addon Integration
Current addons provide:
- **Docs**: Auto-generated documentation
- **Controls**: Interactive prop editing
- **Viewport**: Responsive design testing
- **Actions**: Event handler logging

### Custom Decorators
For reusable story enhancements:
```typescript
const withTheme = (Story: any) => (
  <div className="min-h-screen bg-white dark:bg-gray-900">
    <Story />
  </div>
)

export const decorators = [withTheme]
```

### Performance Monitoring
- Bundle size analysis
- Render performance profiling
- Memory usage tracking
- Load time optimization

## 🔍 Troubleshooting

### Build Issues
- **Addon Compatibility**: Use Storybook 9.1+ compatible addons
- **TypeScript Errors**: Check story type definitions
- **Missing Dependencies**: Verify all imports are available

### Runtime Issues
- **Component Not Loading**: Check for external dependencies
- **Stories Not Appearing**: Verify story file naming convention
- **Controls Not Working**: Check prop interface definitions

### Performance Issues
- **Slow Loading**: Optimize mock data size
- **Memory Leaks**: Check for cleanup in useEffect hooks
- **Bundle Size**: Use code splitting for large components

## 📚 Resources

### Documentation
- [Storybook Documentation](https://storybook.js.org/docs)
- [Storybook React Guide](https://storybook.js.org/docs/react/get-started/introduction)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)

### Community
- [Storybook Discord](https://discord.gg/UUt2PJb)
- [GitHub Discussions](https://github.com/storybookjs/storybook/discussions)
- [Community Examples](https://storybook.js.org/showcase)

### Tools
- [Chromatic](https://www.chromatic.com/) - Visual testing service
- [Storybook Test Runner](https://github.com/storybookjs/test-runner)
- [Design Tokens](https://storybook.js.org/addons/@storybook/addon-design-tokens)