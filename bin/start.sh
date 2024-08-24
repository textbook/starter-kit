#!/usr/bin/env sh

set -eu

npm run migration up
exec /sbin/tini -- node ./api/server.js
