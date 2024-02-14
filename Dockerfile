FROM node:20-alpine as web

USER node
WORKDIR /home/node

COPY package*.json .npmrc ./
COPY --chown=node web/package.json web/
RUN npm --workspace web ci

COPY --chown=node web/ web/
RUN npm --workspace web run build

FROM node:20-alpine

USER node
WORKDIR /home/node

COPY package*.json .npmrc ./
COPY api/package.json api/
RUN npm --workspace api ci --omit dev

COPY --chown=node api/ api/
COPY --from=web /home/node/api/static api/static/

EXPOSE 80
ENV PORT=80

ENTRYPOINT [ "sh" ]
CMD [ "-c", "./api/start.sh" ]
