# Dropdown Component

A flexible dropdown menu component with customizable trigger elements, click-outside detection, and keyboard navigation support.

## Usage

```tsx
import { Dropdown } from './components'

function MyComponent() {
  const items = [
    { label: 'Profile', value: 'profile', onClick: () => console.log('Profile') },
    { label: 'Settings', value: 'settings', onClick: () => console.log('Settings') },
    { label: 'Logout', value: 'logout', onClick: () => console.log('Logout') }
  ]
  
  return (
    <Dropdown
      trigger={<button>Menu</button>}
      items={items}
    />
  )
}
```

## Props

### DropdownProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | `ReactNode` | - | Element that opens the dropdown when clicked |
| `items` | `DropdownItem[]` | - | Array of menu items |
| `className` | `string` | `''` | Additional CSS classes for the container |

### DropdownItem

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | ✓ | Display text for the menu item |
| `value` | `string` | ✓ | Unique identifier for the item |
| `onClick` | `() => void` | - | Callback when item is selected |

## Features

### Interaction
- **Click trigger**: Opens/closes dropdown
- **Click outside**: Closes dropdown when clicking elsewhere
- **ESC key**: Closes dropdown
- **Item selection**: Calls onClick and closes dropdown

### Positioning
- **Right-aligned**: Menu appears below and aligned to the right of trigger
- **Auto-positioning**: Adjusts based on available space
- **Z-index layering**: Appears above other content

### Accessibility
- **Keyboard navigation**: ESC key support
- **ARIA roles**: Proper menu and menuitem roles
- **Focus management**: Maintains focus flow

## Behavior

### Opening
When trigger is clicked:
1. Dropdown menu becomes visible
2. Event listeners for outside clicks and ESC key are added
3. Menu appears positioned relative to trigger

### Closing
Dropdown closes when:
- Trigger is clicked again
- User clicks outside the dropdown
- ESC key is pressed
- Menu item is selected

### Item Selection
When a menu item is clicked:
1. Item's `onClick` callback is executed (if provided)
2. Dropdown automatically closes
3. Focus returns to trigger element

## Styling

### Default Appearance
- **Container**: Relative positioned wrapper
- **Menu**: White background with shadow and rounded corners
- **Items**: Hover effects with gray background
- **Positioning**: Right-aligned, top-origin

### Custom Styling
```tsx
<Dropdown
  className="custom-dropdown"
  trigger={<Button>Custom Trigger</Button>}
  items={items}
/>
```

## Examples

### Basic Dropdown
```tsx
const basicItems = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' }
]

<Dropdown
  trigger={<Button variant="outline">Select Option</Button>}
  items={basicItems}
/>
```

### User Menu
```tsx
function UserMenu() {
  const userItems = [
    { 
      label: 'Profile', 
      value: 'profile', 
      onClick: () => navigate('/profile') 
    },
    { 
      label: 'Settings', 
      value: 'settings', 
      onClick: () => navigate('/settings') 
    },
    { 
      label: 'Sign Out', 
      value: 'signout', 
      onClick: () => handleSignOut() 
    }
  ]
  
  return (
    <Dropdown
      trigger={
        <button className="flex items-center space-x-2">
          <img src={userAvatar} className="w-8 h-8 rounded-full" />
          <span>John Doe</span>
        </button>
      }
      items={userItems}
    />
  )
}
```

### Action Menu
```tsx
function ActionMenu({ itemId }: { itemId: string }) {
  const actionItems = [
    { 
      label: 'Edit', 
      value: 'edit', 
      onClick: () => handleEdit(itemId) 
    },
    { 
      label: 'Duplicate', 
      value: 'duplicate', 
      onClick: () => handleDuplicate(itemId) 
    },
    { 
      label: 'Delete', 
      value: 'delete', 
      onClick: () => handleDelete(itemId) 
    }
  ]
  
  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </Button>
      }
      items={actionItems}
    />
  )
}
```

### Navigation Dropdown
```tsx
function NavigationDropdown() {
  const navItems = [
    { label: 'Dashboard', value: 'dashboard', onClick: () => navigate('/dashboard') },
    { label: 'Projects', value: 'projects', onClick: () => navigate('/projects') },
    { label: 'Team', value: 'team', onClick: () => navigate('/team') },
    { label: 'Reports', value: 'reports', onClick: () => navigate('/reports') }
  ]
  
  return (
    <Dropdown
      trigger={
        <Button variant="ghost">
          Navigation
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      }
      items={navItems}
    />
  )
}
```

### Custom Trigger Elements
```tsx
// Image trigger
<Dropdown
  trigger={<img src="avatar.jpg" className="w-10 h-10 rounded-full cursor-pointer" />}
  items={items}
/>

// Icon trigger
<Dropdown
  trigger={
    <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
      <DotsVerticalIcon className="w-5 h-5" />
    </div>
  }
  items={items}
/>

// Text trigger
<Dropdown
  trigger={<span className="text-blue-600 cursor-pointer hover:underline">More options</span>}
  items={items}
/>
```

## Best Practices

### Item Organization
- Group related items together
- Use separators for logical sections (implement as needed)
- Limit items to prevent scrolling when possible

### Trigger Design
- Make triggers clearly clickable
- Use appropriate hover states
- Consider using icons to indicate dropdown behavior

### Accessibility
- Ensure trigger elements are keyboard accessible
- Provide meaningful labels for screen readers
- Test with keyboard-only navigation

## Customization

### Menu Positioning
Modify positioning by updating the dropdown container classes:
```tsx
// Left-aligned menu
<div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg">

// Wider menu
<div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg">
```

### Item Styling
Customize menu item appearance:
```tsx
<button className="block w-full px-4 py-3 text-left text-base text-gray-900 hover:bg-blue-50">
  {item.label}
</button>
```

### Animations
Add entrance/exit animations:
```css
.dropdown-menu {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 100ms ease-out, opacity 100ms ease-out;
}

.dropdown-menu.open {
  transform: scale(1);
  opacity: 1;
}
```