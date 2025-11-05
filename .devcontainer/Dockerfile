FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

RUN apt-get update \
  && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install --assume-yes --no-install-recommends \
    postgresql-client \
    vim
