#! /usr/bin/env bash
set -euo pipefail

if [ $# -gt 0 ]; then
  echo "usage: ./bin/up-to-date.sh"
  exit 1
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."

useNpm() {
  npm --prefix="$ROOT" "$@"
}

if [ -z "$(useNpm outdated)" ]; then
  echo 'All up to date'
  exit 0
fi

useNpm update --save

if [ -z "$(git status --porcelain)" ]; then
  echo 'No compatible changes'
  exit 0
fi

useNpm run ship
git add "$ROOT"/package{,-lock}.json "$ROOT"/*/package.json
git commit --message 'Apply in-range dependency updates'
git push
