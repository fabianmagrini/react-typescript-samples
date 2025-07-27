# Component Documentation

This document provides detailed information about the reusable components available in the application.

## Table of Contents

- [UI Components](#ui-components)
  - [Button](#button)
  - [Card](#card)
- [Layout Components](#layout-components)
  - [Navigation](#navigation)
  - [Layout](#layout)
- [Usage Guidelines](#usage-guidelines)
- [Styling Conventions](#styling-conventions)

## UI Components

### Button

**Location:** `src/components/ui/Button.tsx`

A versatile button component with multiple variants, sizes, and states.

#### Props

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}
```

#### Variants

- **primary** (default): Blue background with white text
- **secondary**: Gray background with dark text
- **outline**: Transparent background with border
- **ghost**: Transparent background, no border

#### Sizes

- **sm**: Small button (height: 32px)
- **md** (default): Medium button (height: 40px)
- **lg**: Large button (height: 48px)

#### States

- **isLoading**: Shows spinner and disables interaction
- **disabled**: Grays out button and prevents clicks

#### Examples

```jsx
import Button from '@/components/ui/Button';

// Basic usage
<Button>Click me</Button>

// Primary button (default)
<Button variant="primary">Save</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Outline button
<Button variant="outline">Learn More</Button>

// Ghost button
<Button variant="ghost">Close</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button isLoading>Saving...</Button>

// Disabled state
<Button disabled>Unavailable</Button>

// Custom styling
<Button className="w-full">Full Width</Button>

// With onClick handler
<Button onClick={() => console.log('Clicked!')}>
  Click Handler
</Button>
```

#### Accessibility Features

- Proper focus management with visible focus ring
- Screen reader support for loading states
- Keyboard navigation support
- ARIA attributes for disabled states

---

### Card

**Location:** `src/components/ui/Card.tsx`

A flexible card component system for displaying content in containers.

#### Components

The Card system consists of multiple sub-components:

- **Card**: Main container
- **CardHeader**: Header section
- **CardTitle**: Title within header
- **CardDescription**: Description text
- **CardContent**: Main content area
- **CardFooter**: Footer section

#### Props

All card components extend standard HTML div attributes and accept:

```typescript
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
```

#### Examples

```jsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/Card';

// Basic card
<Card>
  <CardContent>
    Simple card content
  </CardContent>
</Card>

// Full card with all sections
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      This is a description of the card content
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Card with custom styling
<Card className="max-w-md">
  <CardHeader>
    <CardTitle className="text-center">Centered Title</CardTitle>
  </CardHeader>
  <CardContent>
    <img src="/image.jpg" alt="Description" />
    <p>Content with image</p>
  </CardContent>
</Card>

// Product card example
<Card>
  <CardHeader>
    <div className="flex justify-between">
      <CardTitle>Product Name</CardTitle>
      <span className="text-2xl font-bold">$99.99</span>
    </div>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Additional product details</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Add to Cart</Button>
  </CardFooter>
</Card>
```

#### Styling

Cards include default styling for:
- Rounded corners
- Subtle shadow
- White background
- Responsive padding
- Proper spacing between sections

---

## Layout Components

### Navigation

**Location:** `src/components/Navigation.tsx`

A responsive navigation bar with active route highlighting.

#### Features

- **Active Route Detection**: Highlights current page
- **Responsive Design**: Adapts to different screen sizes
- **Brand Logo**: Displays application name/logo
- **Navigation Links**: Predefined navigation items

#### Navigation Items

The navigation includes these default items:
- Home (`/`)
- About (`/about`)
- Products (`/products`)
- Blog (`/blog`)
- Contact (`/contact`)

#### Examples

```jsx
import Navigation from '@/components/Navigation';

// Basic usage (typically in layout)
<Navigation />
```

#### Customization

To modify navigation items, edit the `navItems` array in the component:

```typescript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];
```

#### Styling Features

- Active link styling with blue border
- Hover effects on inactive links
- Clean, minimal design
- Consistent spacing and typography

---

### Layout

**Location:** `src/components/Layout.tsx`

A main layout wrapper that provides consistent page structure.

#### Props

```typescript
interface LayoutProps {
  children: ReactNode;
}
```

#### Features

- **Navigation Integration**: Includes the Navigation component
- **Main Content Area**: Properly spaced content container
- **Footer**: Application footer with copyright
- **Responsive Design**: Adapts to all screen sizes
- **Consistent Spacing**: Standardized margins and padding

#### Examples

```jsx
import Layout from '@/components/Layout';

// Wrap page content
<Layout>
  <div className="space-y-8">
    <h1>Page Title</h1>
    <p>Page content...</p>
  </div>
</Layout>

// Used in root layout (app/layout.tsx)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
```

#### Structure

The Layout component provides:
1. **Header**: Navigation bar
2. **Main**: Content area with max-width container
3. **Footer**: Simple copyright footer

---

## Usage Guidelines

### Import Patterns

```typescript
// UI Components
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

// Layout Components
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
```

### Component Composition

Components are designed to work together:

```jsx
// Typical page structure
<Layout>
  <div className="space-y-8">
    <div className="text-center">
      <h1 className="text-4xl font-bold">Page Title</h1>
      <p className="text-xl text-gray-600">Page description</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature 1</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content details</p>
          <Button variant="outline">Learn More</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feature 2</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content details</p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  </div>
</Layout>
```

### Responsive Design

All components are built with mobile-first responsive design:

```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>

// Responsive button sizing
<Button size="sm" className="md:size-md lg:size-lg">
  Responsive Button
</Button>
```

---

## Styling Conventions

### Tailwind CSS Classes

Components use Tailwind CSS for styling with these conventions:

#### Color Palette
- **Primary**: Blue (`blue-600`, `blue-700`)
- **Secondary**: Gray (`gray-100`, `gray-200`)
- **Text**: Gray scale (`gray-600`, `gray-900`)
- **Borders**: Light gray (`gray-300`)

#### Spacing
- **Padding**: Consistent use of `p-4`, `p-6`, `px-3`, `py-2`
- **Margins**: Use `space-y-*` and `space-x-*` for consistent spacing
- **Gaps**: Grid/flex gaps using `gap-4`, `gap-6`, `gap-8`

#### Typography
- **Headings**: `text-xl`, `text-2xl`, `text-4xl` with `font-bold`
- **Body**: Default text with `text-gray-600` for secondary text
- **Small Text**: `text-sm` for labels and descriptions

#### Interactive States
- **Hover**: `hover:bg-*`, `hover:text-*`, `hover:border-*`
- **Focus**: `focus:outline-none`, `focus:ring-2`, `focus:ring-*`
- **Active**: `active:*` for button press states
- **Disabled**: `disabled:opacity-50`, `disabled:pointer-events-none`

### Custom CSS Classes

Minimal custom CSS is used. Most styling is achieved through Tailwind utilities:

```css
/* Only when Tailwind utilities are insufficient */
.custom-component {
  /* Custom styles here */
}
```

### Component Variants

Use consistent variant patterns:

```typescript
// Button variants
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 hover:bg-gray-50',
  ghost: 'hover:bg-gray-100'
};

// Size variants
const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg'
};
```

---

## Best Practices

### Component Development

1. **Single Responsibility**: Each component has one clear purpose
2. **Prop Validation**: Use TypeScript interfaces for prop types
3. **Accessibility**: Include ARIA attributes and keyboard support
4. **Performance**: Use `forwardRef` for proper ref forwarding
5. **Flexibility**: Accept `className` prop for custom styling

### Usage Patterns

1. **Consistent Imports**: Use absolute imports with `@/` prefix
2. **Component Composition**: Build complex UIs by combining simple components
3. **Responsive Design**: Consider mobile-first approach
4. **State Management**: Keep component state minimal and focused
5. **Error Boundaries**: Wrap components in error boundaries for production

### Styling Guidelines

1. **Tailwind First**: Use Tailwind utilities before custom CSS
2. **Consistent Spacing**: Use spacing scale consistently
3. **Color System**: Stick to defined color palette
4. **Typography Scale**: Use consistent text sizes and weights
5. **Interactive States**: Always provide hover and focus states

---

## Future Enhancements

Planned component improvements:

### New Components
- **Input**: Form input with validation
- **Select**: Dropdown selection component
- **Modal**: Overlay dialog component
- **Toast**: Notification component
- **Skeleton**: Loading placeholder component

### Enhanced Features
- **Dark Mode**: Theme support for all components
- **Animation**: Smooth transitions and micro-interactions
- **Form Components**: Complete form component library
- **Data Display**: Table, list, and grid components
- **Navigation**: Breadcrumb, sidebar, and tab components

### Development Tools
- **Storybook**: Component documentation and testing
- **Unit Tests**: Jest and React Testing Library
- **Visual Testing**: Chromatic for visual regression testing
- **Performance**: Bundle size optimization
- **Accessibility**: Enhanced a11y testing and compliance