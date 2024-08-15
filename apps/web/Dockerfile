# Stage 1: Prune the monorepo to only include relevant packages
FROM node:18-alpine AS pruner
WORKDIR /app

# Copy the entire repository
COPY . .

# Prune the monorepo, include the lockfile in the pruned output
RUN npx turbo prune --scope=web --docker

# Stage 2: Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app

# Copy the pruned files
COPY --from=pruner /app/out/full/ .

# Ensure the lockfile is present before running npm ci
COPY ./package-lock.json ./

# Install dependencies using npm ci
RUN npm ci

# Stage 3: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the pruned repo and build the app
COPY --from=deps /app .
RUN npx turbo run build --filter=web...

# Stage 4: Prepare the production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built application files
COPY --from=builder /app/apps/web/.next ./.next

# Ensure dependencies are copied over
COPY --from=deps /app/node_modules ./node_modules

# Copy package.json to keep consistency
COPY --from=builder /app/apps/web/package.json ./package.json

EXPOSE 3000

# Set the environment variable and run the Next.js app
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
