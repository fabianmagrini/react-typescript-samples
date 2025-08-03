# Deployment Guide

## Overview

This guide covers deploying the Host-Managed Data Pattern demo to various hosting platforms. The application consists of two parts:
- **Frontend (Client)** - React application built with Vite
- **Backend (Server)** - Node.js Express API

## Pre-deployment Checklist

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] No ESLint errors
- [ ] Environment variables configured
- [ ] Production build tested locally

### Security
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables properly configured
- [ ] CORS settings appropriate for production
- [ ] Dependencies updated and secure

## Frontend Deployment

### Vercel (Recommended)

**Prerequisites:**
- Vercel account
- GitHub repository

**Steps:**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy from client directory:**
```bash
cd client
vercel
```

4. **Configure build settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
```env
VITE_API_URL=https://your-api-domain.com
```

**vercel.json configuration:**
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Netlify

**Steps:**

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build the project:**
```bash
cd client
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

**netlify.toml configuration:**
```toml
[build]
  publish = "client/dist"
  command = "cd client && npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### AWS S3 + CloudFront

**Steps:**

1. **Build the project:**
```bash
cd client
npm run build
```

2. **Create S3 bucket:**
```bash
aws s3 mb s3://your-app-name
```

3. **Upload files:**
```bash
aws s3 sync dist/ s3://your-app-name --delete
```

4. **Configure bucket for static hosting:**
```bash
aws s3 website s3://your-app-name --index-document index.html --error-document index.html
```

5. **Set up CloudFront distribution** for global CDN

## Backend Deployment

### Railway (Recommended for Node.js)

**Prerequisites:**
- Railway account
- GitHub repository

**Steps:**

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Deploy from server directory:**
```bash
cd server
railway deploy
```

**Environment Variables:**
```env
NODE_ENV=production
PORT=3001
```

### Heroku

**Steps:**

1. **Install Heroku CLI:**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows/Linux - Download from heroku.com
```

2. **Login to Heroku:**
```bash
heroku login
```

3. **Create Heroku app:**
```bash
cd server
heroku create your-app-name
```

4. **Configure buildpack:**
```bash
heroku buildpacks:set heroku/nodejs
```

5. **Deploy:**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Procfile:**
```
web: node dist/index.js
```

**Environment Variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=$PORT
```

### DigitalOcean App Platform

**Steps:**

1. **Create app.yaml:**
```yaml
name: host-managed-data-api
services:
- name: api
  source_dir: /server
  github:
    repo: your-username/your-repo
    branch: main
  build_command: npm run build
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: "production"
```

2. **Deploy via DigitalOcean dashboard** or CLI

### VPS Deployment (Ubuntu)

**Server Setup:**

1. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Install PM2:**
```bash
sudo npm install -g pm2
```

3. **Clone repository:**
```bash
git clone <your-repo-url>
cd host-managed-data/server
npm install
npm run build
```

4. **Start with PM2:**
```bash
pm2 start dist/index.js --name "host-managed-data-api"
pm2 startup
pm2 save
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
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

## Full-Stack Deployment

### Vercel (Frontend) + Railway (Backend)

**Complete Setup:**

1. **Deploy backend to Railway:**
```bash
cd server
railway deploy
# Note the deployment URL
```

2. **Deploy frontend to Vercel:**
```bash
cd client
# Set environment variable
vercel env add VITE_API_URL
# Enter Railway URL: https://your-app.railway.app
vercel --prod
```

### Docker Deployment

**Dockerfile for Frontend:**
```dockerfile
# Client Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile for Backend:**
```dockerfile
# Server Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  frontend:
    build: 
      context: ./client
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://localhost:3001
    depends_on:
      - backend

  backend:
    build:
      context: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
```

**Deploy with Docker:**
```bash
docker-compose up -d
```

## Environment Configuration

### Production Environment Variables

**Frontend (.env.production):**
```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_TITLE=Host-Managed Data Pattern Demo
```

**Backend (.env.production):**
```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
```

### Environment-Specific Builds

**Build for different environments:**
```bash
# Development build
npm run build

# Production build
NODE_ENV=production npm run build

# Staging build
NODE_ENV=staging npm run build
```

## Performance Optimization

### Frontend Optimization

1. **Bundle analysis:**
```bash
cd client
npm run build
npx vite-bundle-analyzer dist
```

2. **Compression (Nginx):**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

3. **Caching headers:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Backend Optimization

1. **Process management:**
```bash
# PM2 cluster mode
pm2 start dist/index.js -i max --name "api-cluster"
```

2. **Memory optimization:**
```bash
# Set Node.js memory limit
node --max-old-space-size=512 dist/index.js
```

## Monitoring & Health Checks

### Health Check Endpoint

The API includes a health check endpoint:
```
GET /health
```

### Monitoring Setup

**Basic monitoring with PM2:**
```bash
pm2 monit
```

**Advanced monitoring (Prometheus):**
```javascript
// Add to server
const promClient = require('prom-client')
const register = new promClient.Registry()

app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(register.metrics())
})
```

## Rollback Strategy

### Quick Rollback Steps

1. **Vercel rollback:**
```bash
vercel rollback
```

2. **Heroku rollback:**
```bash
heroku rollback v123
```

3. **PM2 rollback:**
```bash
# Stop current version
pm2 stop all

# Deploy previous version
git checkout <previous-commit>
npm run build
pm2 start dist/index.js
```

## Troubleshooting

### Common Deployment Issues

1. **Build failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment variable issues:**
   - Verify all required variables are set
   - Check variable naming (VITE_ prefix for frontend)
   - Restart services after variable changes

3. **CORS errors:**
   - Update CORS settings for production domain
   - Verify API URL in frontend environment

4. **404 errors on SPA routes:**
   - Configure server for client-side routing
   - Set up proper redirects to index.html

### Debugging Production Issues

1. **Check application logs:**
```bash
# PM2 logs
pm2 logs

# Heroku logs
heroku logs --tail

# Railway logs
railway logs
```

2. **Monitor resource usage:**
```bash
# PM2 monitoring
pm2 monit

# System resources
htop
```

## Security Considerations

### Production Security

1. **HTTPS enforcement:**
   - Use SSL certificates
   - Redirect HTTP to HTTPS
   - Set secure headers

2. **Environment variables:**
   - Never commit secrets to repository
   - Use platform-specific secret management
   - Rotate keys regularly

3. **Dependencies:**
   - Regularly update dependencies
   - Use `npm audit` to check for vulnerabilities
   - Pin dependency versions

### Security Headers

```javascript
// Add to Express server
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})
```

## Backup & Recovery

### Data Backup
Since this demo uses mock data, no database backup is needed. For production applications:
- Regular database backups
- Environment variable backups
- Application configuration backups

### Disaster Recovery
- Multiple deployment regions
- Health check monitoring
- Automated failover procedures

---

This deployment guide provides multiple options for hosting the Host-Managed Data Pattern demo in production environments. Choose the platform that best fits your needs and requirements.