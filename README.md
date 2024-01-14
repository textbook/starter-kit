# Starter Kit v2

- [x] [Node] LTS support (verified working on 20.x LTS release)
- [x] [Express] server
- [x] Logging with [Winston] and [Morgan]
- [x] [React] client with [Vite]
- [x] Client-side routing with [React Router]
- [x] Linting with [ESLint] and [Prettier]
- [x] Unit and integration testing with [Vitest] and [Jest] (with [SuperTest])
- [x] E2E testing with [Playwright]
- [x] Dev mode (watch modes for client and server, proxy to avoid CORS issues)
- [x] Production build (single deployment artifact)
- [x] [GitHub Actions] pipeline
- [x] [Heroku] or [Render] deployment
- [x] [Docker] build

## Scripts

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

- `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and the frontend is proxied to it).
- `e2e`: builds and starts the app in production mode and runs the Playwright tests against it.
  - `e2e:dev`: builds and starts the app in dev mode and runs the Playwright tests against it.
- `lint`: runs ESLint and Prettier against all the relevant files in the project.
- `serve`: builds and starts the app in production mode locally.
- `ship`: runs `lint`, then `test`, then `e2e`; ideal before a `git push`.
- `test`: runs the unit and integration tests.
  - `test:cover`: runs the tests and outputs coverage data.

[Docker]: https://www.docker.com
[ESLint]: https://eslint.org/
[Express]: https://expressjs.com/
[GitHub Actions]: https://github.com/features/actions
[Heroku]: https://www.heroku.com/
[Jest]: https://jestjs.io/
[Morgan]: https://github.com/expressjs/morgan
[Node]: https://nodejs.org/en/
[node-test]: https://nodejs.org/api/test.html
[Playwright]: https://playwright.dev/
[Prettier]: https://prettier.io/
[React]: https://reactjs.org/
[React Router]: https://reactrouter.com/en/main
[Render]: https://render.com/
[SuperTest]: https://github.com/visionmedia/supertest
[Vite]: https://vitejs.dev/
[Vitest]: https://vitest.dev/
[wiki]: https://github.com/textbook/starter-kit/wiki
[Winston]: https://github.com/winstonjs/winston
