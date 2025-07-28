# Button Component

A versatile and accessible button component with multiple variants, sizes, and states.

## Usage

```tsx
import { Button } from './components'

function MyComponent() {
  return (
    <Button variant="primary" size="md" onClick={handleClick}>
      Click me
    </Button>
  )
}
```

## Props

### ButtonProps

Extends `ButtonHTMLAttributes<HTMLButtonElement>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `children` | `ReactNode` | - | Button content |
| `className` | `string` | `''` | Additional CSS classes |
| `...props` | `ButtonHTMLAttributes` | - | All standard button attributes |

## Variants

### Primary
Default button style with solid background.
```tsx
<Button variant="primary">Primary Button</Button>
```

### Secondary
Alternative solid button style.
```tsx
<Button variant="secondary">Secondary Button</Button>
```

### Outline
Button with border and transparent background.
```tsx
<Button variant="outline">Outline Button</Button>
```

### Ghost
Minimal button with no background or border.
```tsx
<Button variant="ghost">Ghost Button</Button>
```

## Sizes

### Small
Compact button for tight spaces.
```tsx
<Button size="sm">Small Button</Button>
```

### Medium
Default button size for most use cases.
```tsx
<Button size="md">Medium Button</Button>
```

### Large
Prominent button for important actions.
```tsx
<Button size="lg">Large Button</Button>
```

## States

### Default
Normal interactive state.

### Hover
Darker background on mouse hover.

### Focus
Ring outline when focused (keyboard navigation).

### Disabled
Non-interactive state with reduced opacity.
```tsx
<Button disabled>Disabled Button</Button>
```

## Customization

### Custom Styling
Add additional classes via the `className` prop:
```tsx
<Button className="shadow-lg transform hover:scale-105">
  Custom Button
</Button>
```

### Extending Variants
To add new variants, modify the `variants` object in `Button.tsx`:
```tsx
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  // Add new variant
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
}
```

## Accessibility

- Supports keyboard navigation (Enter and Space keys)
- Proper focus management with visible focus indicators
- Screen reader friendly with semantic button element
- Disabled state prevents interaction and updates ARIA attributes
- Supports all ARIA attributes via props spreading

## Examples

### Basic Usage
```tsx
<Button onClick={() => console.log('Clicked!')}>
  Click Me
</Button>
```

### With Loading State
```tsx
function LoadingButton() {
  const [loading, setLoading] = useState(false)
  
  return (
    <Button 
      disabled={loading}
      onClick={() => setLoading(true)}
    >
      {loading ? 'Loading...' : 'Submit'}
    </Button>
  )
}
```

### Icon Button
```tsx
<Button variant="ghost" size="sm">
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 12l-4-4h8l-4 4z"/>
  </svg>
  Dropdown
</Button>
```

### Form Submit
```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary" size="lg">
    Create Account
  </Button>
</form>
```