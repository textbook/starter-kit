#! /usr/bin/env bash

set -euo pipefail

ACTUAL="$(node -v)"
EXPECTED="v$(cat .nvmrc)"

echo "Node: $ACTUAL"
echo "NPM: v$(npm -v)"

if [[ "$ACTUAL" == "$EXPECTED" ]];
then echo 'Node version OK';
else echo 'Node version mismatch' && exit 1;
fi
