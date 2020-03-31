# Starter Kit

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

 - [x] Full stack [TypeScript]
 - [x] [Node] LTS support (verified working on 8.x, 10.x and 12.x LTS releases)
 - [x] [Express] server
 - [x] [React] client with [Webpack]
 - [x] Linting with [ESLint]
 - [x] Unit and integration testing with [Jest] (and [SuperTest])
 - [x] E2E testing with [Cypress]
 - [x] Dev mode (watch modes for client and server, proxy to avoid CORS issues)
 - [x] Production build (single deployment artifact, React loaded via CDN)
 - [x] [Travis] pipeline
 - [x] [Heroku] deployment
 - [x] [Cloud Foundry] deployment
 - [x] [Docker] build

## Scripts

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

 - `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and
    the frontend is proxied to it).
 - `dev:test`: checks that the `dev` command can start up correctly, then shuts it down.
 - `e2e`: builds and starts the app in production mode and runs the Cypress tests against it.
 - `e2e:dev`: opens Cypress for local dev, instead of running it in the background. Doesn't start the app.
 - `lint`: runs ESLint against all the JavaScript in the project.
 - `serve`: builds and starts the app in production mode locally.
 - `ship`: runs `lint`, then `test`, then `e2e`; ideal before a `git push`.
 - `test`: runs the Jest unit and integration tests.
 - `test:watch`: runs the unit and integration tests in watch mode.

### Debugging

While running the dev mode using `npm run dev`, you can attach the Node debugger to the server process via port 9229.
If you're using VS Code, a debugging configuration is provided for this.

There is also a VS Code debugging configuration for the Chrome debugger, which requires the recommended Chrome
extension, for debugging the client application.

### Troubleshooting

See the guidance in the [wiki].

## Rationale

Partly I wrote this to explore what things like Create React App ([CRA]) are doing under the hood with [Babel] and
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
    each dev dependency is for
 - Cypress only runs in Electron/Chrome (for a more cross-browser alternative, see [Codecept])


  [Babel]: https://babeljs.io/
  [Cloud Foundry]: https://www.cloudfoundry.org/
  [Codecept]: https://codecept.io/
  [CRA]: https://facebook.github.io/create-react-app/
  [Cypress]: https://www.cypress.io/
  [Docker]: https://www.docker.com
  [ESLint]: https://eslint.org/
  [Express]: https://expressjs.com/
  [Express router]: https://expressjs.com/en/guide/routing.html#express-router
  [Heroku]: https://www.heroku.com/
  [Jest]: https://jestjs.io/
  [manual mocks]: https://jestjs.io/docs/en/manual-mocks#mocking-user-modules
  [Node]: https://nodejs.org/en/
  [React]: https://reactjs.org/
  [starter kit]: https://github.com/textbook/cyf-app-starter
  [SuperTest]: https://github.com/visionmedia/supertest
  [Travis]: https://travis-ci.org/
  [TypeScript]: https://www.typescriptlang.org
  [Webpack]: https://webpack.js.org/
  [wiki]: https://github.com/textbook/starter-kit/wiki
