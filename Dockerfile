FROM node:24-alpine AS web

USER node
WORKDIR /home/node

COPY package*.json .npmrc ./
COPY --chown=node web/package.json web/
RUN --mount=type=cache,target=/root/.npm \
  npm \
  --include-workspace-root \
  --no-fund \
  --workspace web \
  ci

COPY --chown=node web/ web/
RUN npm --workspace web run build

FROM node:24-alpine AS deps

USER node
WORKDIR /home/node

COPY package*.json .npmrc ./
COPY --chown=node api/package.json api/

RUN --mount=type=cache,target=/root/.npm \
  npm \
  --include-workspace-root \
  --no-fund \
  --omit dev \
  --workspace api \
  ci

FROM node:24-alpine

RUN apk add --no-cache curl tini

USER node
WORKDIR /home/node

COPY package*.json .npmrc ./
COPY api/ api/
COPY --from=deps /home/node/api/node_modules api/node_modules/
COPY --from=web /home/node/api/static api/static/
COPY bin/start.sh bin/
COPY --from=deps /home/node/node_modules node_modules/

EXPOSE 80
ENV PORT=80
HEALTHCHECK --start-period=10s --timeout=5s \
  CMD curl --fail --header 'Container-Healthcheck: true' --show-error --silent "http://localhost:$PORT/healthz" || exit 1

ENTRYPOINT [ "/home/node/bin/start.sh" ]
