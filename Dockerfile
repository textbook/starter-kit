FROM node:20-alpine as client

USER node
WORKDIR /home/node

COPY package*.json ./
COPY --chown=node client/package.json client/
RUN npm --workspace client ci

COPY client/ client/
RUN npm --workspace client run build

FROM node:20-alpine

USER node
WORKDIR /home/node

COPY package*.json ./
COPY server/package.json server/
RUN npm --workspace server ci

COPY server/ server/
COPY --from=client /home/node/server/static server/static/

EXPOSE 80
ENV PORT=80

ENTRYPOINT [ "node" ]
CMD [ "server/server.js" ]
