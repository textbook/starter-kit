#!/usr/bin/env sh

set -eu

npm run migration up
node ./api/server.js
