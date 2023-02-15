#! /usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "usage: ./bin/cyf-branch.sh <branch-name>"
  exit 1
fi

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$HERE/.."
GIT_BRANCH="$1"

updateJson() {
  SOURCE="$1"
  RULES="$2"
  TEMP="$ROOT/temp.json"
  rm -f "$TEMP"
  cp "$SOURCE" "$TEMP"
  jq --unbuffered "$RULES" "$TEMP" | tee "$SOURCE"
  rm -f "$TEMP"
}

pushd "$ROOT"
  git branch -D "$GIT_BRANCH" || echo "No branch $GIT_BRANCH"
  git co -b "$GIT_BRANCH"

  echo 'Remove testing dependencies'
  npm uninstall \
    @testing-library/{cypress,jest-dom,react} \
    axe-core \
    cypress{,-axe} \
    eslint-plugin-{cypress,jest} \
    jest{,-circus} \
    msw \
    supertest \
    whatwg-fetch

  echo 'Remove redundant files'
  rm -rf \
    .github/ \
    __mocks__/ \
    coverage/ \
    e2e/ \
    reports/ \
    cypress.config.js \
    jest.config.js \
    client/setupTests.js \
    client/src/*.test.js \
    client/src/pages/*.test.js \
    server/*.test.js \
    server/static/

  echo 'Add templates'
  mkdir -p .github/ISSUE_TEMPLATE/
  cp bin/files/PULL_REQUEST_TEMPLATE.md .github/
  cp bin/files/user-story.md .github/ISSUE_TEMPLATE

  echo 'Update ESLint configuration'
  updateJson "$ROOT/.eslintrc.json" 'del(.overrides) | .rules.indent = "off" | .rules["operator-linebreak"] = "off"'

  echo 'Exclude ESLint prop-types validation'
  updateJson "$ROOT/client/.eslintrc.json" '.rules["react/prop-types"] = "off"'

  echo 'Remove testing scripts'
  PACKAGE=$(cat package.json)
  for SCRIPT in $(jq -r '.scripts | keys[]' package.json); do
    if [[ $SCRIPT =~ e2e|ship|test ]]; then
      PACKAGE=$(echo "$PACKAGE" | jq "del(.scripts[\"$SCRIPT\"])")
    fi
  done
  echo $PACKAGE | jq --unbuffered '.' 2>&1 | tee package.json

  echo 'Remove CSP checking'
  cp -f ./bin/files/middleware.js ./server/utils/middleware.js

  echo 'Update existing scripts'
  npm pkg set 'scripts.build:server=babel server --copy-files --out-dir dist'
  npm pkg set 'scripts.postbuild:server=del-cli ./dist/**/README.md'
  npm pkg set 'scripts.lint=npm run lint:eslint && npm run lint:prettier -- --check'
  npm pkg set 'scripts.lint:eslint=eslint .'
  npm pkg set 'scripts.lint:fix=npm run lint:eslint -- --fix && npm run lint:prettier -- --write'
  npm pkg set 'scripts.lint:prettier=prettier .'

  echo 'Update test ignore files'
  for IGNOREFILE in '.cfignore' '.dockerignore' '.eslintignore' '.gitignore' '.slugignore'; do
    cat "$IGNOREFILE" | sed -E '/(coverage|e2e|reports|mocks)/d' | tee "$IGNOREFILE"
  done

  echo 'Remove Docker test config'
  cat Dockerfile | sed '/CYPRESS/d' | tee Dockerfile

	echo 'Update README'
	cp -f ./bin/files/README.md ./README.md

	echo 'Install Postgres'
	npm install --save pg

	echo 'Add Postgres config'
	cp -f ./bin/files/config.js ./server/utils/config.js
	cp -f ./bin/files/db.js ./server/db.js
	cp -f ./bin/files/server.js ./server/server.js

  echo 'Apply Prettier configuration'
  npm install --save-dev prettier
  cp -f ./bin/files/.prettierignore ./.prettierignore
  cp -f ./bin/files/.prettierrc ./.prettierrc
  npm run lint:fix

	echo 'Add Render configuration'
	cp -f ./bin/files/render.yaml ./render.yaml

  echo 'Clean up bin'
  rm -rf bin/

  echo 'Commit the results'
  git add .
  git commit -m 'Prepare CYF branch'
popd
