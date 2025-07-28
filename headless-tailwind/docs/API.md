# API Reference

Complete API reference for all components in the Headless React Components library.

## Components

- [Button](#button)
- [Modal](#modal)
- [Dropdown](#dropdown)

---

## Button

### Interface

```tsx
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}
```

### Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | No | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Button size |
| `children` | `ReactNode` | - | Yes | Button content |
| `className` | `string` | `''` | No | Additional CSS classes |

### Inherited Props

Inherits all standard HTML button attributes:
- `onClick`: `MouseEventHandler<HTMLButtonElement>`
- `disabled`: `boolean`
- `type`: `'button' \| 'submit' \| 'reset'`
- `form`: `string`
- `formAction`: `string`
- `formEncType`: `string`
- `formMethod`: `string`
- `formNoValidate`: `boolean`
- `formTarget`: `string`
- And all other `ButtonHTMLAttributes`

### CSS Classes

#### Variants
```tsx
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
}
```

#### Sizes
```tsx
const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}
```

---

## Modal

### Interface

```tsx
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}
```

### Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | - | Yes | Controls modal visibility |
| `onClose` | `() => void` | - | Yes | Callback when modal should close |
| `title` | `string` | - | No | Optional modal title |
| `children` | `ReactNode` | - | Yes | Modal content |

### Events

#### onClose Triggers
The `onClose` callback is triggered when:
- ESC key is pressed
- Backdrop (overlay) is clicked
- Close button (X) is clicked

### Side Effects

#### DOM Modifications
- Sets `document.body.style.overflow = 'hidden'` when open
- Restores `document.body.style.overflow = 'unset'` when closed

#### Event Listeners
- Adds/removes `keydown` event listener for ESC key
- Adds/removes `mousedown` event listener for click-outside

### Accessibility Features
- Focus trap within modal
- Focus restoration to trigger element
- ARIA attributes for screen readers
- Semantic HTML structure

---

## Dropdown

### Interfaces

```tsx
interface DropdownItem {
  label: string
  value: string
  onClick?: () => void
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  className?: string
}
```

### Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `trigger` | `ReactNode` | - | Yes | Element that opens the dropdown |
| `items` | `DropdownItem[]` | - | Yes | Array of menu items |
| `className` | `string` | `''` | No | Additional CSS classes for container |

### DropdownItem Properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Display text for the menu item |
| `value` | `string` | Yes | Unique identifier for the item |
| `onClick` | `() => void` | No | Callback when item is selected |

### Events

#### Item Selection
When a dropdown item is clicked:
1. Item's `onClick` callback is executed (if provided)
2. Dropdown automatically closes
3. Focus returns to trigger element

#### Closing Triggers
The dropdown closes when:
- Trigger is clicked again (toggle)
- User clicks outside the dropdown
- ESC key is pressed
- Menu item is selected

### Side Effects

#### Event Listeners
When dropdown is open:
- Adds `mousedown` event listener for click-outside detection
- Adds `keydown` event listener for ESC key

When dropdown closes:
- Removes all event listeners
- Resets internal state

### Positioning
- Default: Right-aligned, below trigger
- Z-index: 10 (above most content)
- Origin: top-right for animations

---

## Type Definitions

### Common Types

```tsx
import { ReactNode, ButtonHTMLAttributes } from 'react'

// Re-exported for convenience
export type { ReactNode, ButtonHTMLAttributes }
```

### Component Export

```tsx
// All components are exported from index
export { Button, Modal, Dropdown } from './components'

// Individual imports also supported
import { Button } from './components/Button'
import { Modal } from './components/Modal'
import { Dropdown } from './components/Dropdown'
```

---

## CSS Dependencies

### Required Imports

```css
/* Required in your main CSS file */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind Classes Used

#### Layout & Positioning
- `fixed`, `absolute`, `relative`, `inset-0`
- `z-10`, `z-50`
- `flex`, `inline-flex`, `items-center`, `justify-center`

#### Spacing
- `px-3`, `px-4`, `px-6`, `py-1.5`, `py-2`, `py-3`
- `p-4`, `m-2`, `mt-2`, `mb-4`
- `space-x-2`, `space-x-3`

#### Typography
- `text-sm`, `text-base`, `text-lg`
- `font-medium`, `font-semibold`
- `text-white`, `text-gray-700`, `text-gray-900`

#### Colors & Backgrounds
- `bg-blue-600`, `bg-gray-600`, `bg-white`
- `hover:bg-blue-700`, `hover:bg-gray-100`
- `border`, `border-gray-300`

#### Effects
- `rounded-md`, `rounded-lg`, `rounded-full`
- `shadow-lg`, `shadow-xl`
- `focus:outline-none`, `focus:ring-2`
- `disabled:opacity-50`, `disabled:cursor-not-allowed`
- `transition-colors`, `transition-opacity`

---

## Browser Support

### Minimum Requirements
- Modern browsers with ES2020 and ES modules support
- CSS Grid and Flexbox support
- `addEventListener`/`removeEventListener`
- `document.body.style` access
- Native ES module support or bundler with ES module handling

### Tested Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills
No polyfills required for supported browsers.