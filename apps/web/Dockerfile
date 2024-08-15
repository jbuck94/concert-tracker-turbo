# Stage 1: Prune the monorepo to only include relevant packages
FROM node:18-alpine AS pruner
WORKDIR /app

# Copy the entire repository
COPY . .

# Prune the monorepo
RUN npx turbo prune --scope=web --docker

# Stage 2: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy the pruned files
COPY --from=pruner /app/out/full/ .

# Install dependencies
RUN npm install

# Stage 3: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the pruned repo and build the app
COPY --from=deps /app .
RUN npx turbo run build --filter=apps/web...

# Stage 4: Prepare the production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built application files
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./package.json

EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "start"]
