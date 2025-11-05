FROM node:24-alpine AS web

USER node
WORKDIR /home/node

COPY package*.json .npmrc ./
COPY --chown=node web/package.json web/
RUN npm \
  --no-fund \
  --include-workspace-root \
  --workspace web \
  ci

COPY --chown=node web/ web/
RUN npm --workspace web run build

FROM node:24-alpine

RUN apk add --no-cache curl tini

USER node
WORKDIR /home/node


COPY package*.json .npmrc ./
COPY api/package.json api/
RUN npm \
  --no-fund \
  --omit dev \
  --include-workspace-root \
  --workspace api \
  ci

COPY --chown=node bin/start.sh .
COPY --chown=node api/ api/
COPY --from=web /home/node/api/static api/static/

EXPOSE 80
ENV PORT=80
HEALTHCHECK --start-period=10s --timeout=5s \
  CMD curl --fail --header 'Container-Healthcheck: true' --show-error --silent "http://localhost:$PORT/healthz" || exit 1

ENTRYPOINT [ "./start.sh" ]
