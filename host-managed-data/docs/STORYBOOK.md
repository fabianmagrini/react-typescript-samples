# Storybook Documentation

## Overview

Storybook is integrated into the Host-Managed Data Pattern demo to provide interactive component development and documentation. It enables component-driven development by allowing developers to build, test, and document UI components in isolation.

## Quick Start

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build static Storybook for deployment
npm run build-storybook
```

**Storybook URLs:**
- Development: [http://localhost:6006](http://localhost:6006)
- Built output: `client/storybook-static/`

## Features

### 🎯 Component Isolation
Develop and test components without the complexity of the full application context.

### 🌓 Dark Mode Support
- Built-in theme toggle in the toolbar
- Automatic theme switching for all components
- Test components in both light and dark modes

### 🎛️ Interactive Controls
- Modify component props in real-time
- Test different data states and configurations
- Validate component behavior with various inputs

### 📚 Auto-Generated Documentation
- TypeScript interface documentation
- Component prop tables
- Usage examples and code snippets

### 🖥️ Responsive Testing
- Multiple viewport sizes
- Mobile-first responsive design testing
- Viewport addon for different device simulations

## Story Organization

### File Structure

```
client/src/components/
├── Card.tsx
├── Card.stories.tsx           # 4 story variants
├── UserList.tsx
├── UserList.stories.tsx       # 5 story variants
├── PostList.tsx
├── PostList.stories.tsx       # 6 story variants
├── PostDetail.tsx
├── PostDetail.stories.tsx     # 7 story variants
└── __tests__/
    ├── Card.test.tsx
    ├── UserList.test.tsx
    └── ...
```

### Story Categories

Stories are organized under the **Components** category:
- `Components/Card`
- `Components/UserList`
- `Components/PostList`
- `Components/PostDetail`

## Component Stories

### Card Component Stories

**File:** `Card.stories.tsx`

**Variants:**
1. **Default** - Basic card with sample content
2. **WithCustomClass** - Card with custom styling
3. **WithList** - Card containing a list of features
4. **MinimalContent** - Card with minimal content

**Use Cases:**
- Test reusable wrapper component
- Verify consistent styling
- Validate dark mode support
- Test custom className application

### UserList Component Stories

**File:** `UserList.stories.tsx`

**Variants:**
1. **Default** - Full user list with 3 users
2. **Loading** - Loading state with skeleton animation
3. **Error** - Error state with error message
4. **SingleUser** - List with only one user
5. **Empty** - Empty state with no users

**Use Cases:**
- Test all possible data states
- Verify loading animations
- Validate error handling
- Test selection behavior

### PostList Component Stories

**File:** `PostList.stories.tsx`

**Variants:**
1. **Default** - Full post list with multiple posts
2. **Loading** - Loading state with skeleton placeholders
3. **Error** - Error state with network error message
4. **SinglePost** - List with single post
5. **Empty** - Empty state with no posts
6. **LongTitle** - Post with extremely long title (edge case)
7. **LongContent** - Post with lengthy content (text truncation)

**Use Cases:**
- Test content truncation and line clamping
- Verify responsive layout with long content
- Test edge cases with lengthy text
- Validate empty and error states

### PostDetail Component Stories

**File:** `PostDetail.stories.tsx`

**Variants:**
1. **Default** - Standard post with normal content
2. **Loading** - Loading state with skeleton animation
3. **Error** - Error state (post not found)
4. **NoSelection** - Empty state (no post selected)
5. **LongContent** - Post with extensive multi-paragraph content
6. **ShortPost** - Minimal post content
7. **NetworkError** - Detailed network error message

**Use Cases:**
- Test content rendering with various lengths
- Verify formatting preservation
- Test all possible component states
- Validate error handling scenarios

## Storybook Configuration

### Main Configuration

**File:** `.storybook/main.ts`

```typescript
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
}
```

### Preview Configuration

**File:** `.storybook/preview.ts`

**Features:**
- Tailwind CSS integration
- Dark mode theme toggle
- Background color switching
- Global decorators for theme application

**Theme Implementation:**
```typescript
globalTypes: {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light' },
        { value: 'dark', icon: 'moon', title: 'Dark' },
      ],
    },
  },
}
```

## Development Workflow

### Component-Driven Development

1. **Design Component Interface**
   ```typescript
   interface ComponentProps {
     data: DataType[]
     isLoading: boolean
     error: Error | null
   }
   ```

2. **Create Component Stories**
   ```typescript
   export const Default: Story = {
     args: {
       data: mockData,
       isLoading: false,
       error: null,
     },
   }
   ```

3. **Develop in Storybook**
   - Use interactive controls to test props
   - Verify all component states
   - Test responsive behavior

4. **Write Unit Tests**
   - Base tests on story scenarios
   - Test the same states covered in stories

5. **Integrate into Application**
   - Use component in main app
   - Ensure real data works as expected

### Story Writing Best Practices

1. **Cover All States**
   ```typescript
   export const Loading: Story = { ... }
   export const Error: Story = { ... }
   export const Empty: Story = { ... }
   export const WithData: Story = { ... }
   ```

2. **Use Meaningful Data**
   ```typescript
   const mockUsers = [
     {
       id: 1,
       name: 'John Doe',
       email: 'john.doe@example.com',
       // ... realistic data
     }
   ]
   ```

3. **Add Context with Decorators**
   ```typescript
   decorators: [
     (Story) => (
       <div style={{ width: '400px', padding: '1rem' }}>
         <Story />
       </div>
     ),
   ],
   ```

4. **Document Component Purpose**
   ```typescript
   parameters: {
     docs: {
       description: {
         component: 'Component description and usage guidelines.',
       },
     },
   },
   ```

## Testing Integration

### Story-Driven Testing

Stories serve as the foundation for unit tests:

```typescript
// Story definition
export const WithError: Story = {
  args: {
    users: [],
    isLoading: false,
    error: new Error('Failed to load users'),
  },
}

// Corresponding test
test('displays error message when error occurs', () => {
  render(<UserList {...WithError.args} />)
  expect(screen.getByText(/Failed to load users/)).toBeInTheDocument()
})
```

### Benefits of Story-Test Alignment

- **Consistency** - Tests cover the same scenarios as stories
- **Documentation** - Stories serve as living documentation
- **Regression Prevention** - Visual and functional testing
- **Easier Maintenance** - Single source of truth for component states

## Visual Testing

### Screenshot Testing (Future Enhancement)

Storybook can be integrated with visual regression testing tools:

- **Chromatic** - Automated visual testing
- **Percy** - Visual review and approval
- **Lost Pixel** - Open source visual testing

### Manual Visual Testing

Use Storybook for manual visual testing:

1. **Theme Switching** - Toggle between light/dark modes
2. **Responsive Testing** - Use viewport addon
3. **State Validation** - Verify all component states visually
4. **Cross-browser Testing** - Test in different browsers

## Deployment

### Static Storybook Build

```bash
# Build static Storybook files
npm run build-storybook

# Output directory
client/storybook-static/
```

### Deployment Options

1. **Netlify/Vercel** - Static site hosting
2. **GitHub Pages** - Free hosting for open source
3. **Internal Server** - Host on company infrastructure
4. **CDN** - Distribute globally for team access

### CI/CD Integration

```yaml
# Example GitHub Actions workflow
- name: Build Storybook
  run: npm run build-storybook

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./client/storybook-static
```

## Advanced Features

### Custom Addons

Potential custom addons for the project:

1. **Theme Persistence** - Remember user's theme preference
2. **Data State Simulator** - Simulate different API response states
3. **Performance Monitor** - Measure component render performance
4. **Accessibility Scanner** - Automated a11y testing

### Integration with Design Systems

- **Design Tokens** - Use consistent design values
- **Component Library** - Shared components across projects
- **Documentation Hub** - Central component documentation

## Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Ensure story types match component props
   - Check import paths in story files

2. **Styling Issues**
   - Verify Tailwind CSS is loaded in preview
   - Check dark mode class application

3. **Addon Conflicts**
   - Review addon versions for compatibility
   - Check addon configuration in main.ts

### Debug Mode

Enable debug logging:
```bash
# Debug Storybook startup
npm run storybook -- --debug-webpack

# Verbose logging
npm run storybook -- --loglevel verbose
```

## Future Enhancements

### Planned Improvements

1. **Visual Regression Testing** - Automated screenshot comparison
2. **Accessibility Testing** - Automated a11y checks
3. **Performance Monitoring** - Component render time tracking
4. **Design Token Integration** - Centralized design system
5. **Custom Documentation** - Enhanced MDX documentation pages

### Community Integration

- **Storybook Showcase** - Share stories publicly
- **Component Catalog** - Searchable component library
- **Team Collaboration** - Review and feedback workflows

---

**Storybook Version:** 9.1.0  
**Framework:** React + Vite  
**Documentation:** Auto-generated from TypeScript  
**Theme Support:** Light/Dark mode with Tailwind CSS