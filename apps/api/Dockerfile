# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies only when needed
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install

# Build the source code only when needed
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run the application
FROM base AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json ./

EXPOSE 4000

CMD ["node", "dist/index.js"]