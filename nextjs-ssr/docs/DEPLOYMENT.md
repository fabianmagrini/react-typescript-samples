# Deployment Guide

This guide covers how to deploy the application to various hosting platforms and environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [AWS](#aws)
  - [Google Cloud Platform](#google-cloud-platform)
  - [DigitalOcean](#digitalocean)
- [Environment Variables](#environment-variables)
- [Production Optimizations](#production-optimizations)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18.18 or later
- Git repository with your code
- Account on your chosen hosting platform
- Domain name (optional, most platforms provide subdomains)

## Build Process

### Local Production Build

Test your production build locally before deploying:

```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Start production server locally
npm run start
```

The build process will:
1. Compile TypeScript to JavaScript
2. Bundle and optimize CSS/JS files
3. Generate static pages where possible
4. Optimize images and assets
5. Create production-ready output in `.next/` directory

### Build Output

```bash
Route (app)                                 Size  First Load JS
┌ ○ /                                      165 B         103 kB
├ ○ /_not-found                            990 B         101 kB
├ ○ /about                                 138 B        99.7 kB
├ ƒ /api/contact                           138 B        99.7 kB
├ ƒ /api/posts                             138 B        99.7 kB
├ ƒ /api/products                          138 B        99.7 kB
├ ƒ /api/products/[id]                     138 B        99.7 kB
├ ○ /blog                                  165 B         103 kB
├ ○ /contact                             2.08 kB         109 kB
└ ○ /products                              138 B        99.7 kB
```

Legend:
- ○ (Static): Pre-rendered at build time
- ƒ (Dynamic): Server-rendered on demand

## Deployment Platforms

### Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications, created by the same team that develops Next.js.

#### Automatic Deployment

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/in with your Git provider
   - Click "New Project"
   - Import your repository

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Deploy to production
vercel --prod
```

#### Custom Domain

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

---

### Netlify

Netlify offers excellent static site hosting with serverless functions.

#### Automatic Deployment

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your Git provider and repository

2. **Build Settings**
   ```
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   Add any required environment variables in Site Settings

#### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Netlify Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### AWS

Deploy to AWS using various services.

#### AWS Amplify

1. **Setup**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize**
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

#### AWS App Runner

1. **Create `apprunner.yaml`**
   ```yaml
   version: 1.0
   runtime: nodejs18
   build:
     commands:
       build:
         - npm ci --production
         - npm run build
   run:
     runtime-version: 18
     command: npm start
     network:
       port: 3000
       env: PORT
     env:
       - name: NODE_ENV
         value: production
   ```

2. **Deploy via AWS Console**
   - Create App Runner service
   - Connect your repository
   - Configure build settings

#### Amazon ECS with Fargate

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production

   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nextjs -u 1001

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json

   USER nextjs

   EXPOSE 3000
   ENV PORT 3000

   CMD ["npm", "start"]
   ```

2. **Deploy with ECS**
   - Build and push Docker image to ECR
   - Create ECS task definition
   - Create ECS service with Fargate

---

### Google Cloud Platform

#### Cloud Run

1. **Create Dockerfile** (same as AWS ECS above)

2. **Deploy**
   ```bash
   # Build and deploy
   gcloud run deploy nextapp \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

#### App Engine

1. **Create `app.yaml`**
   ```yaml
   runtime: nodejs18
   env: standard
   
   env_variables:
     NODE_ENV: production
   
   automatic_scaling:
     min_instances: 0
     max_instances: 10
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

---

### DigitalOcean

#### App Platform

1. **Connect Repository**
   - Go to DigitalOcean App Platform
   - Connect your Git repository

2. **Configure App**
   ```yaml
   name: nextapp
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/nextjs-ssr
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /
   ```

#### Droplet Deployment

1. **Setup Server**
   ```bash
   # On your droplet
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/nextjs-ssr.git
   cd nextjs-ssr
   
   # Install and build
   npm install
   npm run build
   
   # Start with PM2
   pm2 start npm --name "nextapp" -- start
   pm2 startup
   pm2 save
   ```

3. **Setup Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Environment Variables

### Required Variables

```bash
# Production environment
NODE_ENV=production

# Database (if using)
DATABASE_URL=your_database_url

# Authentication (if implemented)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-domain.com

# External APIs (if using)
API_KEY=your_api_key
```

### Platform-Specific Setup

#### Vercel
```bash
# Add via dashboard or CLI
vercel env add NODE_ENV production
vercel env add DATABASE_URL your_database_url
```

#### Netlify
```bash
# Add via dashboard or CLI
netlify env:set NODE_ENV production
netlify env:set DATABASE_URL your_database_url
```

#### AWS/GCP/DO
Set environment variables in platform-specific configuration files or dashboards.

---

## Production Optimizations

### Performance Optimizations

1. **Enable Compression**
   ```javascript
   // next.config.ts
   const nextConfig = {
     compress: true,
     // ... other config
   };
   ```

2. **Optimize Images**
   ```javascript
   // next.config.ts
   const nextConfig = {
     images: {
       formats: ['image/webp', 'image/avif'],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
       imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
     },
   };
   ```

3. **Bundle Analysis**
   ```bash
   npm run build:analyze
   ```

### Security Headers

Already configured in `next.config.ts`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }
  ];
}
```

### Database Considerations

For production, consider:

1. **Database Migration**
   - Replace in-memory storage with persistent database
   - Use PostgreSQL, MongoDB, or Firebase

2. **Connection Pooling**
   - Implement connection pooling for better performance
   - Use tools like Prisma or TypeORM

3. **Caching**
   - Implement Redis for API response caching
   - Use Next.js built-in caching mechanisms

---

## Monitoring and Analytics

### Error Monitoring

1. **Sentry**
   ```bash
   npm install @sentry/nextjs
   ```

2. **LogRocket**
   ```bash
   npm install logrocket
   ```

### Performance Monitoring

1. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```

2. **Google Analytics**
   ```bash
   npm install @next/third-parties
   ```

### Health Checks

Create health check endpoint:

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
}
```

---

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check for TypeScript errors
   npm run type-check
   
   # Check for lint errors
   npm run lint
   
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **API Routes Not Working**
   - Ensure API routes are in `src/app/api/` directory
   - Check function exports (GET, POST, etc.)
   - Verify request/response handling

3. **Static Assets Not Loading**
   - Check `public/` directory structure
   - Verify image paths in components
   - Ensure proper Next.js Image component usage

4. **Environment Variables**
   - Prefix client-side variables with `NEXT_PUBLIC_`
   - Restart development server after adding variables
   - Check platform-specific variable configuration

### Debug Mode

Enable debug logging:

```bash
# Development
DEBUG=* npm run dev

# Production
NODE_OPTIONS='--inspect' npm start
```

### Performance Issues

1. **Check Bundle Size**
   ```bash
   npm run build:analyze
   ```

2. **Monitor Core Web Vitals**
   - Use Lighthouse in Chrome DevTools
   - Check PageSpeed Insights
   - Monitor Vercel Analytics

3. **Database Performance**
   - Add database indexes
   - Implement connection pooling
   - Use caching strategies

---

## Deployment Checklist

### Pre-Deployment

- [ ] Run `npm run type-check`
- [ ] Run `npm run lint`
- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Set up environment variables
- [ ] Configure domain/SSL (if applicable)

### Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test API endpoints
- [ ] Check mobile responsiveness
- [ ] Test contact form functionality
- [ ] Verify SEO meta tags
- [ ] Set up monitoring/analytics
- [ ] Configure error tracking
- [ ] Test performance metrics

### Maintenance

- [ ] Regular dependency updates
- [ ] Security patches
- [ ] Performance monitoring
- [ ] Backup strategies (if using database)
- [ ] SSL certificate renewal
- [ ] CDN cache purging (if applicable)

---

## Cost Optimization

### Free Tier Limits

**Vercel Free:**
- 100GB bandwidth/month
- 6,000 build minutes/month
- Unlimited personal projects

**Netlify Free:**
- 100GB bandwidth/month
- 300 build minutes/month
- 125,000 serverless function invocations

**AWS Free Tier:**
- 12 months free (various services)
- Always free tier for some services

### Optimization Strategies

1. **Optimize Build Times**
   - Use incremental builds
   - Cache dependencies
   - Minimize build scripts

2. **Reduce Bandwidth**
   - Enable compression
   - Optimize images
   - Use CDN for static assets

3. **Monitor Usage**
   - Set up billing alerts
   - Track resource usage
   - Optimize based on metrics