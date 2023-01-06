# TODO: Remove dev deps from prod build
# BUILDER - Stage 1
FROM cimg/node:19.0 as builder
WORKDIR /app
COPY . .
RUN pwd
RUN ls -la
RUN npx turbo prune --scope=web --docker

# INSTALLER - Stage 2
FROM cimg/node:19.0 as installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/full/.gitignore ./.gitignore
COPY --from=builder /app/out/full/turbo.json ./turbo.json
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm fetch

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm install -r --offline --ignore-scripts
RUN pnpm turbo run build --filter=web

# # RUNNER - Stage 3
FROM cimg/node:19.0 AS runner
WORKDIR /app

# # Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app
COPY --from=installer /app .

CMD ["node", "apps/web/.output/server/index.mjs"]
