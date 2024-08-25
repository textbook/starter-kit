#!/usr/bin/env bash

set -euo pipefail

CHANGES="$(git status --no-untracked-files --porcelain)"

if [ ! -z "$CHANGES" ]; then
  echo 'Please commit all changes before proceeding:'
  echo "$CHANGES"
  exit 1
fi

if [[ $# -lt 1 ]] || [[ $# -gt 2 ]]; then
  echo 'Usage ./bin/cyf.sh <branch> [remote]'
  exit 1
fi

BRANCH="$1"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REMOTE="${2:-}"
ROOT="$HERE/.."

git branch -D "$BRANCH" || echo "No branch $BRANCH"
git checkout -b "$BRANCH"

mv "$HERE/files/PULL_REQUEST_TEMPLATE.md" "$ROOT/.github/"
mv "$HERE/files/README.md" "$ROOT"
mv "$HERE/files/render.yaml" "$ROOT"
mv "$HERE/files/user-story.md" "$ROOT/.github/ISSUE_TEMPLATE/"

rm "$ROOT/.github/workflows/keepalive.yml"
rm "$ROOT/.github/CODE_OF_CONDUCT.md"
rm "$ROOT/.github/CONTRIBUTING.md"
rm "$HERE/cyf.sh"

git add "$ROOT"
git commit --message 'Prepare CYF fork'

if [[ ! -z "$REMOTE" ]]; then
  git push --force "$REMOTE" "$BRANCH:main"
fi
