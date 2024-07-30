# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo@latest

# Prune the repo to only include necessary files for the API
FROM base AS pruner
WORKDIR /repo
COPY . .
RUN npm install
RUN turbo prune --scope=api --docker

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY --from=pruner /repo/out/json/ ./

# Copy Prisma schema for postinstall
COPY --from=pruner /repo/out/full/apps/api/src/prisma/schema.prisma ./src/prisma/schema.prisma

# Install dependencies
RUN npm install

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=pruner /repo/out/full/ ./
RUN npm run db:generate
RUN npm run build --workspace=apps/api

# Production image
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
# COPY --from=builder /app/apps/api/src/prisma/schema.prisma ./src/prisma/schema.prisma
COPY --from=pruner /repo/out/full/apps/api/package.json ./package.json

EXPOSE 4000

CMD ["node", "dist/index.js"]
