#! /usr/bin/env bash

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -d "$HERE/../node_modules" ]; then
  npm ci
fi

if [ ! -d "$HERE/../dist" ]; then
  npm run build
fi
