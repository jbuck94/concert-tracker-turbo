# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN npm i -g turbo@2.0.9
RUN turbo prune api --docker

COPY package.json package-lock.json ./
RUN npm install

# Build the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run the application
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 4000

CMD ["node", "dist/index.js"]
