# Modal Component

An accessible modal dialog component with keyboard navigation, focus management, and backdrop interaction.

## Usage

```tsx
import { Modal } from './components'
import { useState } from 'react'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  )
}
```

## Props

### ModalProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Callback when modal should close |
| `title` | `string` | - | Optional modal title |
| `children` | `ReactNode` | - | Modal content |

## Features

### Keyboard Navigation
- **ESC key**: Closes the modal
- **Focus trap**: Keeps focus within modal when open
- **Focus restoration**: Returns focus to trigger element when closed

### Click Interactions
- **Backdrop click**: Closes modal when clicking outside content area
- **Close button**: X button in top-right corner

### Accessibility
- **ARIA attributes**: Proper labeling for screen readers
- **Focus management**: Automatically focuses first interactive element
- **Body scroll lock**: Prevents background scrolling when modal is open
- **Semantic markup**: Uses proper dialog structure

## Behavior

### Opening
When `isOpen` becomes `true`:
1. Modal renders and becomes visible
2. Background scroll is disabled
3. Focus moves to first interactive element in modal
4. ESC and backdrop click listeners are added

### Closing
Modal closes when:
- ESC key is pressed
- Backdrop (overlay) is clicked
- Close button (X) is clicked
- `onClose` callback is called programmatically

When closing:
1. Modal becomes hidden
2. Background scroll is restored
3. Focus returns to original trigger element
4. Event listeners are cleaned up

## Styling

The modal uses a full-screen overlay with centered content:
- **Backdrop**: Semi-transparent gray overlay
- **Container**: Centered white dialog box
- **Close button**: X icon in top-right corner
- **Content area**: Flexible content container

### Custom Styling
Modify styles by editing the component or using CSS classes:

```tsx
// Override backdrop opacity
<div className="fixed inset-0 bg-gray-500 bg-opacity-90" />

// Customize modal size
<div className="sm:w-full sm:max-w-2xl"> {/* Larger modal */}
```

## Examples

### Basic Modal
```tsx
function BasicModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is a basic modal without a title.</p>
      </Modal>
    </>
  )
}
```

### Modal with Title
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  title="Confirm Action"
>
  <p>Are you sure you want to delete this item?</p>
  <div className="flex justify-end space-x-3 mt-4">
    <Button variant="outline" onClick={onClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Delete</Button>
  </div>
</Modal>
```

### Form Modal
```tsx
function FormModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsOpen(false)
  }
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      title="Create New Item"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Name
          </label>
          <input 
            type="text" 
            className="w-full border rounded px-3 py-2"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Modal>
  )
}
```

### Loading Modal
```tsx
function LoadingModal() {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Modal isOpen={isLoading} onClose={() => {}}>
      <div className="text-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Processing...</p>
      </div>
    </Modal>
  )
}
```

## Best Practices

### State Management
- Use boolean state to control `isOpen`
- Always provide an `onClose` callback
- Consider using a custom hook for complex modal logic

### Content Guidelines
- Keep content concise and focused
- Use clear action buttons
- Provide escape routes (close/cancel options)
- Consider mobile viewport constraints

### Accessibility
- Always provide meaningful titles when possible
- Ensure sufficient color contrast
- Test with keyboard-only navigation
- Verify screen reader compatibility

## Customization

### Size Variants
```tsx
// Small modal
<div className="sm:w-full sm:max-w-sm">

// Large modal  
<div className="sm:w-full sm:max-w-4xl">

// Full width on mobile
<div className="mx-4 sm:mx-auto sm:w-full sm:max-w-lg">
```

### Animation
Add custom transitions by modifying the component or using CSS:
```css
.modal-enter {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 200ms, transform 200ms;
}
```