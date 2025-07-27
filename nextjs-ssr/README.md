# A Next.js sample app 

A Next.js application built with TypeScript and Tailwind CSS. This project demonstrates server-side rendering, API routes, reusable UI components, and optimized performance configurations.

## 🚀 Features

- **Next.js 15** with App Router and server-side rendering
- **TypeScript** for type-safe development
- **Tailwind CSS** for utility-first styling
- **Reusable UI Components** with consistent design system
- **API Routes** for backend functionality
- **Optimizations** with security headers and performance tuning
- **Responsive Design** optimized for all device sizes
- **SEO-Friendly** with proper meta tags and SSR

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Utilities**: clsx, tailwind-merge
- **Linting**: ESLint with Next.js configuration
- **Development**: Turbopack for fast development builds

## 📁 Project Structure

```
nextjs-ssr/
├── src/
│   ├── app/                    # App Router pages and layouts
│   │   ├── about/             # About page
│   │   ├── api/               # API routes
│   │   │   ├── contact/       # Contact form endpoint
│   │   │   ├── posts/         # Blog posts API
│   │   │   └── products/      # Products API with CRUD
│   │   ├── blog/              # Blog listing page
│   │   ├── contact/           # Contact form page
│   │   ├── products/          # Products showcase page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── ui/                # UI components
│   │   │   ├── Button.tsx     # Button component with variants
│   │   │   └── Card.tsx       # Card component system
│   │   ├── Layout.tsx         # Page layout wrapper
│   │   └── Navigation.tsx     # Navigation bar
│   ├── lib/                   # Utility functions
│   │   └── utils.ts           # Class name utilities
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # Shared interfaces
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-ssr
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run type-check` | Run TypeScript type checking |
| `npm run build:analyze` | Build with bundle analysis |

## 🎨 Pages Overview

### Home Page (`/`)
- Hero section with application overview
- Feature cards showcasing key technologies
- Call-to-action buttons linking to other sections

### About Page (`/about`)
- Company information and mission statement
- Technical stack details
- Feature highlights and capabilities

### Products Page (`/products`)
- Server-side rendered product catalog
- Product filtering and categorization
- Interactive product cards with pricing

### Blog Page (`/blog`)
- Article listings with author information
- Tag-based filtering
- Newsletter subscription form

### Contact Page (`/contact`)
- Interactive contact form with validation
- Business information and contact details
- Real-time form submission handling

## 🔌 API Routes

### Products API
- `GET /api/products` - Fetch all products with optional filtering
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Fetch specific product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Posts API
- `GET /api/posts` - Fetch blog posts with filtering options
- `POST /api/posts` - Create a new blog post

### Contact API
- `POST /api/contact` - Handle contact form submissions

## 🧩 Components

### UI Components

#### Button
Versatile button component with multiple variants and states:
- **Variants**: primary, secondary, outline, ghost
- **Sizes**: sm, md, lg
- **States**: loading, disabled
- **Features**: Custom styling, accessibility support

#### Card
Flexible card component system:
- **Card**: Base container
- **CardHeader**: Header section with title and description
- **CardContent**: Main content area
- **CardFooter**: Footer with actions
- **Features**: Consistent spacing, responsive design

### Layout Components

#### Navigation
Responsive navigation bar with:
- Active route highlighting
- Mobile-friendly design
- Brand logo and navigation links

#### Layout
Main layout wrapper providing:
- Consistent page structure
- Navigation integration
- Footer information

## 🔧 Configuration

### Next.js Configuration
- **Security Headers**: X-Frame-Options, Content-Type-Options, Referrer-Policy
- **Image Optimization**: Remote image support
- **Package Optimization**: Experimental package imports optimization
- **Performance**: React Strict Mode enabled

### TypeScript Configuration
- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: Absolute imports with `@/` prefix
- **Modern Target**: ES2017 for optimal performance

### Tailwind CSS Configuration
- **Design System**: Consistent spacing, colors, and typography
- **Responsive**: Mobile-first approach
- **Utilities**: Custom utility classes for common patterns

## 🏗️ Development

### Code Quality
- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (can be added)

### Performance
- **Server-Side Rendering**: Automatic for optimal SEO and performance
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Built-in Next.js image optimization
- **Bundle Analysis**: Available via `npm run build:analyze`

### Security
- **Headers**: Security headers configured in Next.js config
- **Validation**: Input validation on API routes
- **CORS**: Proper API route handling

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The application can be deployed to any platform that supports Node.js:
- **Netlify**: Static export or server-side rendering
- **AWS**: Using AWS Amplify or EC2
- **Google Cloud**: App Engine or Cloud Run
- **DigitalOcean**: App Platform

### Build Process
```bash
npm run build
npm run start
```

## 📊 Performance

The application is optimized for:
- **Core Web Vitals**: Excellent scores for LCP, FID, and CLS
- **SEO**: Server-side rendering for search engine optimization
- **Bundle Size**: Optimized bundle splitting and tree shaking
- **Loading Speed**: Fast initial page loads and navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support create an issue in this repository.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Vercel](https://vercel.com/) for the deployment platform