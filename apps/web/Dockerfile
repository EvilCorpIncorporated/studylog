# TODO: Remove dev deps from prod build
# BUILDER - Stage 1
FROM node:19 as builder
WORKDIR /app
RUN apt update -y && apt upgrade -y && npm install -g turbo
COPY . .
RUN turbo prune --scope=@studylog/web --docker

# INSTALLER - Stage 2
FROM node:19 as installer
WORKDIR /app
RUN npm install -g pnpm

# First install dependencies (as they change less often)
COPY --from=builder /app/out/full/.gitignore ./.gitignore
COPY --from=builder /app/out/full/turbo.json ./turbo.json
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm fetch

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm install -r --offline --ignore-scripts
ARG NITRO_PRESET
ARG EDGEDB_CLIENT_TLS_SECURITY
RUN --mount=type=secret,id=EDGEDB_DSN \
    EDGEDB_DSN="$(cat /run/secrets/EDGEDB_DSN)" \
    NITRO_PRESET=${NITRO_PRESET} \
    EDGEDB_CLIENT_TLS_SECURITY=${EDGEDB_CLIENT_TLS_SECURITY} \
    pnpm turbo run build --filter=web

# # RUNNER - Stage 3
FROM node:19 AS runner
WORKDIR /app

# # Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app
COPY --from=installer /app .

CMD ["node", "apps/web/.output/server/index.mjs"]
