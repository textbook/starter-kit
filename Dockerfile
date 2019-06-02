ARG NODE_RELEASE=dubnium

FROM node:${NODE_RELEASE}-alpine AS build

ARG NODE_RELEASE

ENV CYPRESS_INSTALL_BINARY=0

RUN echo "Node $(node -v) / NPM v$(npm -v)"

COPY ./package.json .
COPY ./package-lock.json .

RUN if [ ${NODE_RELEASE} = "boron" ]; \
  then npm install; \
  else npm ci; \
  fi

COPY ./.babelrc .
COPY ./client /client
COPY ./server /server

RUN npm run build

FROM node:${NODE_RELEASE}-alpine

ARG NODE_RELEASE

LABEL maintainer="Jonathan Sharpe"

COPY --from=build ./package.json .
COPY --from=build ./package-lock.json .

RUN if [ ${NODE_RELEASE} = "boron" ]; \
  then npm install --only=prod; \
  else npm ci --only=prod; \
  fi

COPY --from=build ./dist /dist

ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80

ENTRYPOINT [ "npm" ]

CMD [ "start" ]
