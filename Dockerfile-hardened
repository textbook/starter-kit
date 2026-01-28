FROM dhi.io/node:24-alpine3.23-sfw-dev AS web

USER node
WORKDIR /app

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

FROM dhi.io/node:24-alpine3.23-sfw-dev AS deps

USER node
WORKDIR /app

COPY package*.json .npmrc ./
COPY --chown=node api/package.json api/

RUN --mount=type=cache,target=/root/.npm \
  npm \
  --include-workspace-root \
  --no-fund \
  --omit dev \
  --workspace api \
  ci

FROM dhi.io/node:24-alpine3.23

USER node
WORKDIR /app

COPY package*.json .npmrc ./
COPY api/ api/
# Enable below instruction if required
# COPY --from=deps /app/api/node_modules/ api/node_modules/
COPY --from=web /app/api/static api/static/
COPY bin/healthCheck.js bin/start.js bin/
COPY --from=deps /app/node_modules node_modules/

EXPOSE 80
ENV PORT=80
HEALTHCHECK --start-period=10s --timeout=5s CMD [ "/app/bin/healthCheck.js" ]

CMD [ "/app/bin/start.js" ]
