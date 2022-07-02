ARG NODE_RELEASE
ARG ALPINE_RELEASE=3.16

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE} AS build

ENV CYPRESS_INSTALL_BINARY=0

RUN echo "Node $(node -v) / NPM v$(npm -v)"

USER node
WORKDIR /home/node

COPY ./package*.json ./

RUN npm ci

RUN mkdir -p ./dist
COPY ./.babelrc .
COPY ./client ./client
COPY ./server ./server

RUN npm run build

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE}

LABEL maintainer="Jonathan Sharpe"

USER node
WORKDIR /home/node

COPY --from=build /home/node/package*.json ./

RUN npm ci --omit dev

COPY --from=build /home/node/dist ./dist

ENV PORT=80
EXPOSE 80

CMD [ "node", "dist/server.js" ]
