#! /usr/bin/env bash
set -euo pipefail

if [ $# -gt 0 ]; then
  echo "usage: ./bin/up-to-date.sh"
  exit 1
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

pushd "$ROOT"
  npm ci

  if [ -z "$(npm outdated)" ]; then
    echo 'All up to date'
    exit 0
  fi

  npm update --save
  npm run ship
  git add package{,-lock}.json
  git commit --message 'Apply in-range dependency updates'
  git push
popd
