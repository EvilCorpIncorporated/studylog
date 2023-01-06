# TODO: Remove dev deps from prod build
# BUILDER - Stage 1
FROM cimg/node:19.0 as builder
COPY . .
RUN sudo apt update && sudo apt upgrade && npx turbo prune --scope=@studylog/web --docker

# INSTALLER - Stage 2
FROM cimg/node:19.0 as installer

# First install dependencies (as they change less often)
COPY --from=builder ./.gitignore ./.gitignore
COPY --from=builder ./out/full/turbo.json ./turbo.json
COPY --from=builder ./out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder ./out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm fetch

# Build the project and its dependencies
COPY --from=builder ./out/full/ .
RUN pnpm install -r --offline --ignore-scripts
RUN pnpm turbo run build --filter=web

# # RUNNER - Stage 3
FROM cimg/node:19.0 AS runner

# # Don't run production as root
RUN sudo addgroup --system --gid 1001 app
RUN sudo adduser --system --uid 1001 app
USER app
COPY --from=installer . .

CMD ["node", "apps/web/.output/server/index.mjs"]
