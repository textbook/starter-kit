#! /usr/bin/env bash

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$HERE/../dist/static"

mkdir -p "$DIR"

LINES=("Built: $(date)")

TRAVIS=${TRAVIS:-}
if [ ! -z "$TRAVIS" ]; then
  LINES+=("By: Travis build $TRAVIS_BUILD_NUMBER" "URL: $TRAVIS_BUILD_WEB_URL")
else
  LINES+=("By: $(whoami)")
fi

if [ -d "$HERE/../.git" ]; then
  LINES+=("From: $(git show -s --format='%h %s')")

  if  [ ! -z "$(git status --porcelain || '')" ]; then
    LINES+=("With changes:" "$(git status --porcelain)")
  fi
else
  LINES+=("From: $SOURCE_VERSION")
fi

printf "%s\n" "${LINES[@]}" > "$DIR/build-info.txt"
