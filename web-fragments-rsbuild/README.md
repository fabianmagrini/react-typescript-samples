# Web Fragments with Rsbuild

A modern React application demonstrating micro-frontend architecture using Web Fragments, built with Rsbuild, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Rsbuild** - High-performance build tool powered by Rspack
- **Tailwind CSS v4** - Utility-first CSS framework
- **Web Fragments** - Micro-frontend architecture
- **Node.js** - Runtime environment

## 🏗️ Architecture

This application showcases the Web Fragments approach to micro-frontends, which enables:

- **No Coupling**: Independent development and deployment of frontend components
- **No Fate-sharing**: Teams can work independently without blocking each other
- **Technology Freedom**: Different fragments can use different tech stacks
- **Gradual Migration**: Incremental modernization of legacy applications

## 📦 Installation

```bash
# Clone or download the project
cd web-fragments-rsbuild

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Development

The application will be available at:
- **Local**: http://localhost:3000/

### Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Application header
│   ├── InfoSection.tsx # Information section
│   ├── FragmentContainer.tsx # Web fragment wrapper
│   └── index.ts        # Component exports
├── fragments.ts         # Web fragments configuration
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── index.css           # Global styles with Tailwind
└── index.html          # HTML template
```

## 🌐 Web Fragments Integration

The application demonstrates Web Fragments integration:

1. **Initialization**: Web Fragments library is initialized in `fragments.ts`
2. **Custom Elements**: `<web-fragment>` custom elements are used to mark fragment locations
3. **Fragment Containers**: Reusable React components wrap fragments with consistent styling

### Adding New Fragments

To add new web fragments:

1. Register the fragment in a server-side gateway (not included in this demo)
2. Use the `FragmentContainer` component with a unique `fragmentId`
3. The fragment will be loaded automatically when the gateway is configured

## 🎨 Styling

This project uses Tailwind CSS v4 with:
- Utility-first approach
- Responsive design patterns
- Modern gradient backgrounds
- Clean component styling

## 🚀 Performance

Built with Rsbuild (Rspack), this application features:
- ⚡ 5-10x faster builds compared to webpack
- 🎯 Built-in optimizations
- 📦 Efficient code splitting
- 🔥 Fast refresh during development

## 🔮 Production Ready

The application is production-ready with:
- TypeScript for type safety
- Optimized builds with Rspack
- Modern React patterns
- Responsive design
- Error boundaries and proper error handling

## 📚 Learn More

- [Web Fragments Documentation](https://web-fragments.dev/)
- [Rsbuild Documentation](https://rsbuild.rs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

This is a demonstration project. For production use, you'll need to:
1. Set up a server-side fragment gateway
2. Configure proper fragment endpoints
3. Implement authentication and security measures
4. Add comprehensive testing