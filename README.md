# Starter Kit

[![Node.js CI](https://github.com/textbook/starter-kit/workflows/Node.js%20CI/badge.svg)](https://github.com/textbook/starter-kit/actions)

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

 - [x] Full stack ES8+ with [Babel]
 - [x] [Node] LTS support (verified working on 14.x and 16.x LTS releases)
 - [x] [Express] server
 - [x] Logging with [Winston] and [Morgan]
 - [x] [React] client with [Webpack]
 - [x] Client-side routing with [React Router]
 - [x] Linting with [ESLint]
 - [x] Unit and integration testing with [Jest] (and [SuperTest])
 - [x] E2E testing with [Cypress]
 - [x] Dev mode (watch modes for client and server, proxy to avoid CORS issues)
 - [x] Production build (single deployment artifact, React loaded via CDN)
 - [x] [GitHub Actions] pipeline
 - [x] [Heroku] deployment
 - [x] [Cloud Foundry] deployment
 - [x] [Docker] build

## Scripts

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

 - `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and
    the frontend is proxied to it).
 - `e2e`: builds and starts the app in production mode and runs the Cypress tests against it.
 - `e2e:dev`: builds and starts the app in dev mode and runs the Cypress tests against it.
 - `e2e:local`: opens Cypress on the desktop, instead of running it in the background. Doesn't start the app.
 - `lint`: runs ESLint against all the JavaScript in the project.
 - `serve`: builds and starts the app in production mode locally.
 - `ship`: runs `lint`, then `test`, then `e2e`; ideal before a `git push`.
 - `test`: runs the Jest unit and integration tests.
 - `test:cover`: runs the tests and outputs coverage data.
 - `test:watch`: runs the unit and integration tests in watch mode.

### Debugging

While running the dev mode using `npm run dev`, you can attach the Node debugger to the server process via port 9229.
If you're using VS Code, a debugging configuration is provided for this.

There is also a VS Code debugging configuration for the Chrome debugger, which requires the recommended Chrome
extension, for debugging the client application.

### Troubleshooting

See the guidance in the [wiki].

## Rationale

Partly I wrote this to explore what things like Create React App ([CRA]) are doing under the hood with Babel and
Webpack. Partly it was to simplify a previous [starter kit], so there aren't multiple package entry points complicating
the automation and it's not using `copy` (which caused cross-platform issues on Windows).

**Pros**

 - A single root ESLint configuration keeps the project's code consistent to minimise context switching
 - Having Jest running once for the whole project means you can run `test:watch` and see the tests related to changes
    *anywhere* in the codebase
 - Less hidden "magic" config than when using CRA
 - Simpler orchestration with a single NPM entry point

**Cons**

 - The single `package.json` is getting a bit unwieldy; there are 20+ scripts and it's unclear what part of the app
    each dev dependency is for (if you're using NPM 8 you can see one alternative for this using workspaces in
    [Impasse], which was based on this starter kit)
 - Cypress only runs in Electron/Chrome (for a more cross-browser alternative, see [Codecept])

**To consider**

 - [TypeScript]? See [textbook/starter-kit-ts].

  [Babel]: https://babeljs.io/
  [Cloud Foundry]: https://www.cloudfoundry.org/
  [Codecept]: https://codecept.io/
  [CRA]: https://facebook.github.io/create-react-app/
  [Cypress]: https://www.cypress.io/
  [Docker]: https://www.docker.com
  [ESLint]: https://eslint.org/
  [Express]: https://expressjs.com/
  [GitHub Actions]: https://github.com/features/actions
  [Heroku]: https://www.heroku.com/
  [Impasse]: https://github.com/textbook/impasse
  [Jest]: https://jestjs.io/
  [Morgan]: https://github.com/expressjs/morgan
  [Node]: https://nodejs.org/en/
  [React]: https://reactjs.org/
  [React Router]: https://reactrouter.com/web
  [starter kit]: https://github.com/textbook/cyf-app-starter
  [SuperTest]: https://github.com/visionmedia/supertest
  [textbook/starter-kit-ts]: https://github.com/textbook/starter-kit-ts
  [TypeScript]: https://www.typescriptlang.org/
  [Webpack]: https://webpack.js.org/
  [wiki]: https://github.com/textbook/starter-kit/wiki
  [Winston]: https://github.com/winstonjs/winston
