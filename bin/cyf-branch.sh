#! /usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: ./bin/cyf-branch.sh <branch-name>"
  exit 1
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GIT_BRANCH="$1"

pushd "$HERE/.."
  git branch -D "$GIT_BRANCH" || echo "No branch $GIT_BRANCH"
  git co -b "$GIT_BRANCH"

  echo 'Remove testing dependencies'
  npm uninstall \
    @stryker-mutator/{core,javascript-mutator,jest-runner} \
    @testing-library/{cypress,jest-dom,react} \
    axe-core \
    cypress{,-axe} \
    eslint-plugin-{cypress,jest} \
    jest{,-circus} \
    supertest

  echo 'Remove redundant files'
  rm -rf \
    .stryker-tmp/ \
    __mocks__/ \
    coverage/ \
    e2e/ \
    reports/ \
    .travis.yml \
    cypress.json \
    jest.config.js \
    setupTests.js \
    stryker.conf.json \
    client/src/*.test.js \
    client/src/pages/*.test.js \
    server/*.test.js

  echo 'Remove ESLint testing configuration'
  cat .eslintrc.json | jq 'del(.overrides)' | tee .eslintrc.json

  echo 'Exclude ESLint prop-types validation'
  cat ./client/.eslintrc.json \
    | jq '.rules["react/prop-types"] = "off"' \
    | tee ./client/.eslintrc.json

  echo 'Remove testing scripts'
  PACKAGE=$(cat package.json)
  for SCRIPT in $(jq -r '.scripts | keys[]' package.json); do
    if [[ $SCRIPT =~ e2e|ship|test|postbuild ]]; then
      PACKAGE=$(echo "$PACKAGE" | jq "del(.scripts[\"$SCRIPT\"])")
    fi
  done
  PACKAGE=$(echo "$PACKAGE" | jq '.scripts["build:server"] = "babel server --out-dir dist"')
  echo $PACKAGE | jq '.' 2>&1 | tee package.json

  echo 'Update test ignore files'
  for IGNOREFILE in '.cfignore' '.dockerignore' '.eslintignore' '.gitignore' '.slugignore'; do
    cat "$IGNOREFILE" | sed -E '/(coverage|e2e|stryker|reports|mocks)/d' | tee "$IGNOREFILE"
  done

  echo 'Remove Docker test config'
  cat Dockerfile | sed '/CYPRESS/d' | tee Dockerfile

  echo 'Update README'
  cp -f ./bin/files/README.md ./README.md

  echo 'Install Mongoose'
  npm i --save mongoose

  echo 'Add MongoDB config'
  cp -f ./bin/files/db.js ./server/db.js
  cp -f ./bin/files/server.js ./server/server.js
  cat app.json \
    | jq '.env.MONGODB_URI = {"description": "Connection URI for your database (e.g. on https://www.mongodb.com/cloud/atlas)", "required": true}' \
    | tee app.json

  echo 'Clean up bin'
  rm -rf bin/

  echo 'Commit the results'
  git add .
  git commit -m 'Prepare CYF branch

  - Remove tests and CI
  - Update README
  - Add MongoDB'
popd
