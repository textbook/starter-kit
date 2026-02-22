FROM mcr.microsoft.com/devcontainers/javascript-node:24-trixie

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  apt-get update \
  && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install --assume-yes --no-install-recommends \
    postgresql-client \
    vim

USER node
