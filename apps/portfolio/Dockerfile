FROM node:24.10.0-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY apps/portfolio/package.json ./apps/portfolio/
COPY apps/portfolio/panda.config.ts ./apps/portfolio/

RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules/
COPY --from=deps /app/apps/portfolio/node_modules ./apps/portfolio/node_modules/

COPY . .

RUN corepack enable pnpm

WORKDIR /app/apps/portfolio

RUN pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

COPY --from=builder --chown=app:nodejs /app/apps/portfolio/.output ./.output
COPY --from=builder --chown=app:nodejs /app/apps/portfolio/dist ./dist

USER app

EXPOSE 3000
ENV PORT=3000

# Start the application
CMD HOSTNAME="0.0.0.0" node ./.output/server/index.mjs
