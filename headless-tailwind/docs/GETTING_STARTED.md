# Getting Started

Welcome to Headless React Components! This guide will help you set up and start using the component library in your project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16 or higher
- **npm** or **yarn**: Package manager
- **React**: Version 18 or higher
- **TypeScript**: Version 4.9 or higher (recommended)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd headless-tailwind
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the component showcase.

## Project Setup

### Adding to Existing Project

If you want to use these components in an existing React project:

1. **Copy the components** from `src/components/` to your project
2. **Install required dependencies**:
   ```bash
   npm install tailwindcss postcss autoprefixer
   ```
3. **Configure Tailwind CSS** (see [Tailwind Setup](#tailwind-setup))

### New Project Setup

To create a new project based on this structure:

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest my-app -- --template react-ts
cd my-app

# Configure as ES module project
npm pkg set type="module"

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Copy component files and configuration
```

## Tailwind Setup

### 1. Configure tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2. Add Tailwind Directives to CSS

Create or update your main CSS file (`src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Import CSS in Your App

```tsx
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Import Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Component Usage

### Basic Import

```tsx
import { Button, Modal, Dropdown } from './components'
```

### Using Components

#### Button Example
```tsx
function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </div>
  )
}
```

#### Modal Example
```tsx
import { useState } from 'react'
import { Button, Modal } from './components'

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is modal content!</p>
        <Button onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  )
}
```

#### Dropdown Example
```tsx
import { Dropdown, Button } from './components'

function DropdownExample() {
  const menuItems = [
    { label: 'Profile', value: 'profile', onClick: () => console.log('Profile') },
    { label: 'Settings', value: 'settings', onClick: () => console.log('Settings') },
    { label: 'Logout', value: 'logout', onClick: () => console.log('Logout') }
  ]

  return (
    <Dropdown
      trigger={<Button variant="outline">Menu</Button>}
      items={menuItems}
    />
  )
}
```

## Development Commands

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run TypeScript type checking
npm run typecheck
```

### Development Workflow

1. **Start the dev server**: `npm run dev`
2. **Make changes** to components in `src/components/`
3. **View changes** in the browser (hot reload enabled)
4. **Run type checking**: `npm run typecheck`
5. **Run linting**: `npm run lint`
6. **Build for production**: `npm run build`

## File Structure

```
headless-tailwind/
├── src/
│   ├── components/
│   │   ├── Button.tsx         # Button component
│   │   ├── Modal.tsx          # Modal component
│   │   ├── Dropdown.tsx       # Dropdown component
│   │   └── index.ts           # Component exports
│   ├── App.tsx                # Main application
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles with Tailwind
├── docs/                     # Comprehensive documentation
│   ├── components/           # Individual component guides
│   ├── API.md                # Complete API reference
│   └── GETTING_STARTED.md    # This file
├── package.json              # Dependencies, scripts & ES module config
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # Node-specific TypeScript config
└── vite.config.ts           # Vite build configuration
```

## Customization

### Styling

#### Method 1: Tailwind Customization
Modify `tailwind.config.js` to add your design tokens:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
}
```

#### Method 2: Component Customization
Modify component styles directly in the component files:

```tsx
// In Button.tsx
const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  // ... other variants
}
```

#### Method 3: CSS Classes
Add custom classes via the `className` prop:

```tsx
<Button className="shadow-lg transform hover:scale-105">
  Custom Button
</Button>
```

### Adding New Components

1. **Create component file** in `src/components/`
2. **Define TypeScript interfaces** for props
3. **Implement component** with accessibility in mind
4. **Export component** from `src/components/index.ts`
5. **Add to showcase** in `src/App.tsx`
6. **Create documentation** in `docs/components/`

### Example: Creating a New Component

```tsx
// src/components/Badge.tsx
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error'
  children: React.ReactNode
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}
```

```tsx
// src/components/index.ts
export { Button } from './Button'
export { Modal } from './Modal'
export { Dropdown } from './Dropdown'
export { Badge } from './Badge'  // Add new component
```

## Troubleshooting

### Common Issues

#### Tailwind Styles Not Applied
- Ensure Tailwind CSS is properly installed and configured
- Check that `@tailwind` directives are in your CSS file
- Verify the `content` paths in `tailwind.config.js`

#### TypeScript Errors
- Run `npm run typecheck` to see detailed errors
- Ensure all required props are provided
- Check import paths are correct

#### Components Not Rendering
- Verify imports are correct
- Check browser console for JavaScript errors
- Ensure all dependencies are installed

#### Styles Look Different
- Check if CSS reset/normalize is conflicting
- Verify Tailwind CSS is loaded after other stylesheets
- Use browser dev tools to inspect applied styles

### Getting Help

1. **Check the documentation** in the `docs/` folder
2. **Review component examples** in `src/App.tsx`
3. **Inspect the source code** in `src/components/`
4. **Use browser dev tools** to debug styling issues

## Next Steps

Once you have the basic setup working:

1. **Explore the showcase app** to see all component variants
2. **Read the component documentation** in `docs/components/`
3. **Check the API reference** in `docs/API.md`
4. **Customize components** to match your design system
5. **Add new components** as needed for your project

## Best Practices

### Component Usage
- Always provide required props
- Use TypeScript for better development experience
- Test components with keyboard navigation
- Consider mobile responsiveness

### Development
- Run type checking before committing
- Use meaningful component and prop names
- Document any custom components you create
- Follow the existing code style and patterns
- Ensure ES module compatibility when adding dependencies

### Accessibility
- Test with keyboard-only navigation
- Verify screen reader compatibility
- Ensure sufficient color contrast
- Provide proper ARIA labels when needed