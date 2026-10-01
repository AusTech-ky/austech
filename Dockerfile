# Next.js standalone build for Coolify (or any Docker host).
# No build-time variables are required: everything is read at runtime.
# NEXT_PUBLIC_SITE_URL can optionally be passed as a build arg; it defaults
# to https://austech.ky.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
ARG NEXT_PUBLIC_SITE_URL=https://austech.ky
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
USER app
EXPOSE 3000
# Checks whatever port the app was told to use (Coolify may set PORT from "Ports Exposes").
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s CMD wget -q --spider "http://127.0.0.1:${PORT:-3000}/" || exit 1
CMD ["node", "server.js"]
