#! /usr/bin/env bash

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIR="$HERE/../dist/static"

if [ -z "$(git status --porcelain)" ] && [ -d "$DIR" ]; then echo "Built: $(date)
From: $(git show -s --format='%h %s')" > "$DIR/build-info.txt"; fi
