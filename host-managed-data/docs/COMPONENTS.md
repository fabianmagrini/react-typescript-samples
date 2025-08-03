# Component Documentation

## Overview

This document provides detailed documentation for all React components in the Host-Managed Data Pattern demo. Each component follows specific patterns for data handling, props interfaces, and styling.

## Component Architecture

```
HostManagedDataDemo (Host Component)
├── UserList (Child Component)
├── UserDetail (Child Component)
├── PostList (Child Component)
├── PostDetail (Child Component)
└── Card (Utility Component)
```

## Core Components

### HostManagedDataDemo

**File:** `src/components/HostManagedDataDemo.tsx`

The main host component that orchestrates all data fetching and state management.

**Responsibilities:**
- Manages all TanStack Query data fetching
- Provides data to child components via props
- Handles theme switching
- Demonstrates the Host-Managed Data Pattern

**Props:** None (root component)

**State Management:**
- Uses TanStack Query for server state
- Uses Zustand store for client state
- No local component state

**Example Usage:**
```typescript
function App() {
  return <HostManagedDataDemo />
}
```

**Key Features:**
- ✅ Data fetching orchestration
- ✅ Theme toggle button
- ✅ Responsive grid layout
- ✅ Pattern explanation section

---

### UserList

**File:** `src/components/UserList.tsx`

Displays a list of users with selection functionality.

**Props Interface:**
```typescript
interface UserListProps {
  users: User[]
  isLoading: boolean
  error: Error | null
}
```

**Props:**
- `users` - Array of user objects to display
- `isLoading` - Shows loading skeleton when true
- `error` - Displays error message when present

**State Dependencies:**
- Reads `selectedUserId` from Zustand store
- Calls `setSelectedUserId` on user selection

**Features:**
- ✅ Loading state with skeleton animation
- ✅ Error state with styled error message
- ✅ User selection with visual feedback
- ✅ User count display
- ✅ Responsive design

**Example Usage:**
```typescript
<UserList
  users={usersQuery.data || []}
  isLoading={usersQuery.isLoading}
  error={usersQuery.error}
/>
```

**Styling:**
- Uses Card component wrapper
- Highlights selected user with blue background
- Hover effects on user items
- Dark mode support

---

### UserDetail

**File:** `src/components/UserDetail.tsx`

Shows detailed information for the selected user.

**Props Interface:**
```typescript
interface UserDetailProps {
  user: User | undefined
  isLoading: boolean
  error: Error | null
}
```

**Props:**
- `user` - User object to display (undefined when none selected)
- `isLoading` - Shows loading skeleton when true
- `error` - Displays error message when present

**States:**
1. **Loading State** - Skeleton placeholder animation
2. **Error State** - Styled error message
3. **Empty State** - "Select a user" message
4. **Data State** - Full user information display

**Features:**
- ✅ Comprehensive user information display
- ✅ Contact information section
- ✅ Company information section
- ✅ Responsive grid layout

**Example Usage:**
```typescript
<UserDetail
  user={selectedUserQuery.data}
  isLoading={selectedUserQuery.isLoading}
  error={selectedUserQuery.error}
/>
```

---

### PostList

**File:** `src/components/PostList.tsx`

Displays posts with optional filtering by selected user.

**Props Interface:**
```typescript
interface PostListProps {
  posts: Post[]
  isLoading: boolean
  error: Error | null
}
```

**Props:**
- `posts` - Array of post objects to display
- `isLoading` - Shows loading skeleton when true
- `error` - Displays error message when present

**State Dependencies:**
- Reads `selectedPostId` from Zustand store
- Reads `selectedUserId` for title customization
- Calls `setSelectedPostId` on post selection

**Features:**
- ✅ Dynamic title based on selected user
- ✅ Post selection with visual feedback
- ✅ Post preview with title and body excerpt
- ✅ Post metadata (ID, user ID)
- ✅ Empty state handling

**Example Usage:**
```typescript
<PostList
  posts={postsQuery.data || []}
  isLoading={postsQuery.isLoading}
  error={postsQuery.error}
/>
```

**Dynamic Behavior:**
- Title shows "All Posts" when no user selected
- Title shows "Posts by User X" when user selected
- Posts automatically filtered by selected user

---

### PostDetail

**File:** `src/components/PostDetail.tsx`

Shows detailed view of the selected post.

**Props Interface:**
```typescript
interface PostDetailProps {
  post: Post | undefined
  isLoading: boolean
  error: Error | null
}
```

**Props:**
- `post` - Post object to display (undefined when none selected)
- `isLoading` - Shows loading skeleton when true
- `error` - Displays error message when present

**States:**
1. **Loading State** - Skeleton placeholder animation
2. **Error State** - Styled error message
3. **Empty State** - "Select a post" message
4. **Data State** - Full post content display

**Features:**
- ✅ Full post title display
- ✅ Complete post content with preserved formatting
- ✅ Post metadata (ID, user ID)
- ✅ Visual separators and layout

**Example Usage:**
```typescript
<PostDetail
  post={selectedPostQuery.data}
  isLoading={selectedPostQuery.isLoading}
  error={selectedPostQuery.error}
/>
```

---

### Card

**File:** `src/components/Card.tsx`

Reusable wrapper component providing consistent styling across the application.

**Props Interface:**
```typescript
interface CardProps {
  children: ReactNode
  className?: string
}
```

**Props:**
- `children` - Content to render inside the card
- `className` - Optional additional CSS classes

**Features:**
- ✅ Consistent styling across components
- ✅ Dark mode support
- ✅ Enhanced shadows and borders
- ✅ Responsive padding
- ✅ Extensible via className prop

**Base Styling:**
- White background with dark mode support
- Rounded corners
- Shadow effects
- Border for definition
- Padding for content spacing

**Example Usage:**
```typescript
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here...</p>
</Card>

<Card className="custom-spacing">
  <CustomContent />
</Card>
```

## Component Patterns

### Props Pattern

All components follow a consistent props interface pattern:

```typescript
interface ComponentProps {
  // Data props
  data: DataType[]
  item?: DataType
  
  // State props
  isLoading: boolean
  error: Error | null
  
  // Event handler props (optional)
  onAction?: (param: ParamType) => void
}
```

### Loading State Pattern

All data-displaying components implement loading states:

```typescript
if (isLoading) {
  return (
    <Card>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
    </Card>
  )
}
```

### Error State Pattern

All components handle errors consistently:

```typescript
if (error) {
  return (
    <Card>
      <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
        Failed to load data: {error.message}
      </div>
    </Card>
  )
}
```

### Selection State Pattern

Interactive components provide visual feedback for selections:

```typescript
className={`
  w-full text-left p-3 rounded-md transition-all duration-200
  ${isSelected 
    ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-600 border shadow-sm'
    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
  }
`}
```

## Styling Guidelines

### Dark Mode Support

All components include comprehensive dark mode support:

```css
/* Light mode */
bg-white text-gray-900

/* Dark mode */
dark:bg-gray-800 dark:text-white
```

### Color Palette

**Background Colors:**
- Light: `bg-white`, `bg-gray-50`, `bg-gray-100`
- Dark: `dark:bg-gray-900`, `dark:bg-gray-800`, `dark:bg-gray-700`

**Text Colors:**
- Primary: `text-gray-900 dark:text-white`
- Secondary: `text-gray-600 dark:text-gray-300`
- Muted: `text-gray-500 dark:text-gray-400`

**Accent Colors:**
- Selection: `bg-blue-100 dark:bg-blue-900/50`
- Borders: `border-blue-300 dark:border-blue-600`
- Error: `text-red-600 dark:text-red-400`

### Responsive Design

Components use responsive utilities:

```css
/* Mobile first approach */
grid-cols-1 lg:grid-cols-2

/* Responsive text */
text-sm md:text-base

/* Responsive spacing */
p-4 md:p-6
```

## Accessibility

### Semantic HTML

Components use appropriate semantic elements:

```typescript
// Buttons for interactive elements
<button onClick={handleClick}>

// Headings for structure
<h2 className="text-lg font-semibold">

// Lists for grouped content
<div role="list">
```

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Proper tab order maintained
- Focus indicators visible

### Screen Reader Support

- Meaningful text content
- Proper heading hierarchy
- Descriptive button labels

## Testing Strategy

### Component Testing

Each component has corresponding test files:

```
components/
├── Component.tsx
└── __tests__/
    └── Component.test.tsx
```

### Test Patterns

**Rendering Tests:**
```typescript
test('renders component with data', () => {
  render(<Component data={mockData} isLoading={false} error={null} />)
  expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

**Interaction Tests:**
```typescript
test('handles user interaction', () => {
  const mockHandler = vi.fn()
  render(<Component onAction={mockHandler} />)
  
  fireEvent.click(screen.getByRole('button'))
  expect(mockHandler).toHaveBeenCalled()
})
```

**State Tests:**
```typescript
test('shows loading state', () => {
  render(<Component isLoading={true} />)
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})
```

## Performance Considerations

### React.memo Usage

Components are wrapped with React.memo when appropriate:

```typescript
export const UserCard = React.memo(function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>
})
```

### Prop Drilling Avoidance

- Host component manages all data
- Zustand store for shared state
- Minimal prop passing

### Bundle Size

- Components are tree-shakeable
- Minimal external dependencies
- Efficient CSS with Tailwind

## Storybook Integration

### Interactive Component Documentation

Each component has corresponding Storybook stories for development and documentation:

```
components/
├── Component.tsx
├── Component.stories.tsx    # Storybook stories
└── __tests__/
    └── Component.test.tsx
```

### Story Structure

**Available Stories:**
- **Card.stories.tsx** - 4 variants (default, custom styling, with lists, minimal)
- **UserList.stories.tsx** - 5 variants (default, loading, error, single user, empty)
- **PostList.stories.tsx** - 6 variants (including long content scenarios)
- **PostDetail.stories.tsx** - 7 variants (different content lengths and states)

### Story Features

**Component Development:**
```bash
npm run storybook  # Start interactive development environment
```

**Story Benefits:**
- **Component Isolation** - Develop without full app context
- **State Testing** - Test all component states and props
- **Dark Mode Toggle** - Switch between themes
- **Interactive Controls** - Modify props in real-time
- **Documentation** - Auto-generated docs from TypeScript

**Example Story:**
```typescript
export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
    error: null,
  },
}

export const WithError: Story = {
  args: {
    users: [],
    isLoading: false,
    error: new Error('Failed to load users'),
  },
}
```

### Development Workflow with Storybook

1. **Create component** with TypeScript interfaces
2. **Write Storybook stories** for all component states
3. **Develop in isolation** using Storybook
4. **Test different props** with interactive controls
5. **Verify dark mode** using theme toggle
6. **Write unit tests** based on story scenarios
7. **Integrate component** into main application

## Future Enhancements

### Potential Improvements

1. **Virtualization** - For large lists
2. **Suspense** - For better loading UX
3. **Error Boundaries** - Component-level error handling
4. **Animation** - Enhanced transitions and micro-interactions

### Component Extensions

1. **SearchableUserList** - Add search functionality
2. **PaginatedPostList** - Add pagination support
3. **UserForm** - Add user editing capability
4. **PostEditor** - Add post creation/editing

---

This component documentation provides a comprehensive guide to understanding, using, and extending the components in the Host-Managed Data Pattern demo.