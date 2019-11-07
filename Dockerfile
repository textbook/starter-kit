ARG NODE_RELEASE=12.13.0

FROM node:${NODE_RELEASE}-alpine AS build

ARG NODE_RELEASE

ENV CYPRESS_INSTALL_BINARY=0

RUN echo "Node $(node -v) / NPM v$(npm -v)"

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY ./.babelrc .
COPY ./client /client
COPY ./server /server

RUN npm run build

FROM node:${NODE_RELEASE}-alpine

ARG NODE_RELEASE

LABEL maintainer="Jonathan Sharpe"

COPY --from=build ./package.json .
COPY --from=build ./package-lock.json .

ENV NODE_ENV=production
ENV PORT=80

RUN npm ci

COPY --from=build ./dist /dist

EXPOSE 80

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
