FROM --platform=linux/amd64 node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN npm install -g turbo@2.0.9
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo run build --filter=api...


FROM base AS runner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# COPY --from=datadog/serverless-init:1.2.1-alpine /datadog-init /app/datadog-init
# COPY --from=datadog/dd-lib-js-init:v5.10.0 /operator-build/node_modules /dd_tracer/node/

# Don't run production as root
RUN addgroup --system --gid 1001 api_runner
RUN adduser --system --uid 1001 api_runner
USER api_runner
COPY --from=installer /app .


# The port that api uses
ENV PORT 8080
EXPOSE 8080

ENV NODE_ENV="production"
# Migrate and then deploy
CMD npx turbo run db:deploy && node apps/api/dist/main.js