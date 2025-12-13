# Stage 1: Build
FROM node:20-alpine AS builder

# Install Python, make, and g++ for node-gyp
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build args for environment variables during build
ARG ADMIN_PASSWORD
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

RUN npm run build
RUN npm prune --production

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/maintenance-config.json ./maintenance-config.json

# Runtime environment variables
ENV NODE_ENV=production
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
