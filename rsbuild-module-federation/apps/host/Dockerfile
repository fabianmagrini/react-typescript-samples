# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/host/package*.json ./apps/host/
COPY packages/ ./packages/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY apps/host ./apps/host

# Build the application
WORKDIR /app/apps/host
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/apps/host/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/host/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]