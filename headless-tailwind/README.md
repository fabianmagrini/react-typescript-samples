# Headless React Components

A modern showcase application demonstrating headless React components built with TypeScript and styled with Tailwind CSS. This project emphasizes the separation of component logic from styling, providing maximum flexibility and reusability.

## 🚀 Features

- **TypeScript**: Fully typed components with comprehensive interface definitions
- **Headless Architecture**: Logic separated from styling for maximum flexibility
- **Accessibility**: Built with WCAG guidelines and keyboard navigation support
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Customizable**: Easy to extend and adapt to different design systems

## 📦 Components

### Button
A versatile button component with multiple variants and sizes:
- **Variants**: Primary, Secondary, Outline, Ghost
- **Sizes**: Small, Medium, Large
- **States**: Default, Hover, Disabled, Focus

### Modal
An accessible modal component with:
- Keyboard navigation (ESC to close)
- Focus management and trap
- Click-outside to close
- Backdrop overlay
- Customizable title and content

### Dropdown
A flexible dropdown menu with:
- Click-outside detection
- Keyboard navigation support
- Customizable trigger element
- Action callbacks for menu items

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety and modern JavaScript features
- **Vite** - Build tool and dev server with ES modules support
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing with modern syntax support
- **ES Modules** - Modern module system for better performance

## 📖 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd headless-tailwind
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🎨 Customization

### Styling
Components are styled with Tailwind CSS classes. To customize:

1. Modify the `tailwind.config.js` file to add your design tokens
2. Update component styles in the respective component files
3. Override styles by passing custom `className` props

### Extending Components
Each component accepts all standard HTML props for its underlying element, making them easy to extend:

```tsx
<Button 
  variant="primary" 
  size="lg"
  onClick={handleClick}
  className="custom-class"
  disabled={loading}
>
  Click me
</Button>
```

## 🏗️ Project Structure

```
headless-tailwind/
├── src/
│   ├── components/
│   │   ├── Button.tsx       # Button component
│   │   ├── Modal.tsx        # Modal component
│   │   ├── Dropdown.tsx     # Dropdown component
│   │   └── index.ts         # Component exports
│   ├── App.tsx              # Main application
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles with Tailwind
├── docs/                    # Comprehensive documentation
│   ├── components/         # Individual component guides
│   ├── API.md              # Complete API reference
│   └── GETTING_STARTED.md  # Setup and usage guide
├── package.json            # Dependencies and ES module config
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS configuration
└── vite.config.ts         # Vite build configuration
```

## 🔧 Development

### Adding New Components
1. Create component file in `src/components/`
2. Define TypeScript interfaces for props
3. Implement component with accessibility in mind
4. Add component to `src/components/index.ts`
5. Update documentation

### Code Style
- Use TypeScript for all components
- Follow React best practices
- Implement proper accessibility features
- Use Tailwind CSS for styling
- Include proper prop types and documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type system