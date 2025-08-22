# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/remote/package*.json ./apps/remote/
COPY packages/ ./packages/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY apps/remote ./apps/remote

# Build the application
WORKDIR /app/apps/remote
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/apps/remote/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/remote/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]