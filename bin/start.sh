#!/usr/bin/env sh

set -eu

npm run migration up
exec /sbin/tini -s -- node ./api/server.js
