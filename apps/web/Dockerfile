# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo@latest

# Prune the repo to only include necessary files for the web
FROM base AS pruner
WORKDIR /repo
COPY . .
RUN npm install
RUN turbo prune --scope=web --docker

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY --from=pruner /repo/out/json/ ./
RUN npm install

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=pruner /repo/out/full/ ./
RUN npm run build
RUN ls -lha

# Production image
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=pruner /repo/out/full/apps/web/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
