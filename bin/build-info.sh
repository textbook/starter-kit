#! /usr/bin/env bash

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$HERE/../dist/static"

mkdir -p "$DIR"

LINES=("Built: $(date)")

GITHUB_ACTIONS=${GITHUB_ACTIONS:-}
if [ ! -z "$GITHUB_ACTIONS" ]; then
  WEB_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
  LINES+=("By: GitHub Actions build $GITHUB_RUN_NUMBER" "URL: $WEB_URL")
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
