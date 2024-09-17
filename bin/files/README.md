# Starter Kit v2

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

- [x] [Node] LTS support (verified working on 20.x LTS release)
- [x] [Express] server
- [x] [MongoDB] database with [Mongoose]
- [x] Logging with [Winston] and [Morgan]
- [x] [React] client with [Vite]
- [x] Client-side routing with [React Router]
- [x] Linting with [ESLint] and [Prettier]
- [x] Unit and integration testing with [Vitest] and [Jest] (with [SuperTest] and [TestContainers])
- [x] E2E testing with [Playwright]
- [x] Dev mode (watch modes for client and server, proxy to avoid CORS issues)
- [x] Production build (single deployment artifact)
- [x] [GitHub Actions] pipeline
- [x] [Google App Engine], [Heroku], [Render] or [Vercel] deployment
- [x] [Docker] build

## Setup

> **Note** if you have _any problems_ setting up the starter kit, see the [wiki] and, if still not solved, post to
> [`#cyf-full-stack-starter-kit` in Slack][2].

Pick one member of the team to own the repository and pipeline. That person should do the following:

1.  Click the "Use this template" button above (see [GitHub's docs][1]) to create your team repository and name it something appropriate for your project.
    - Your repo should say _"generated from"_, **not** _"forked from"_, _"CodeYourFuture/cyf-final-project-starter-kit"_ at the top
2.  In your repo, click the "Deploy to Render" button at the top of the README and log in using GitHub when prompted.
3.  Fill in a service group name for your application and then click "Apply".
4.  Once it has deployed successfully, click the "managed resources" link to view the application details.

Whenever you commit to main (or e.g. merge a [pull request]) it will get automatically deployed!

You should now make sure all of the project team are [collaborators] on the repository.

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

### Security

If the project handles **any kind of** Personally Identifiable Information (PII) then make sure the following
principles are followed:

- Only collect **strictly necessary** PII;
- Access to PII should be as restricted as possible;
- Access to PII should only be possible after authentication. Authentication **must be done** via GitHub. **Ad hoc
  authentication solutions are not allowed**;
- Admins must be able to control who has access to the platform and at which levels using only GitHub groups;
- There must be an audit mechanism in place. It is required by law to know who accessed what and when;
- Code must be reviewed by senior developers before being pushed to production;
- APIs must be secure. Make sure we are not handling security on the frontend.

[1]: https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template
[2]: https://codeyourfuture.slack.com/archives/C021ATWS9A5
[collaborators]: https://help.github.com/en/articles/inviting-collaborators-to-a-personal-repository
[Docker]: https://www.docker.com
[ESLint]: https://eslint.org/
[Express]: https://expressjs.com/
[GitHub Actions]: https://github.com/features/actions
[Google App Engine]: https://cloud.google.com/appengine/?hl=en
[Heroku]: https://www.heroku.com/
[Jest]: https://jestjs.io/
[MongoDB]: https://www.mongodb.com/
[Mongoose]: https://mongoosejs.com/
[Morgan]: https://github.com/expressjs/morgan
[Node]: https://nodejs.org/en/
[node-test]: https://nodejs.org/api/test.html
[Playwright]: https://playwright.dev/
[Prettier]: https://prettier.io/
[pull request]: https://help.github.com/en/articles/about-pull-requests
[React]: https://reactjs.org/
[React Router]: https://reactrouter.com/en/main
[Render]: https://render.com/
[SuperTest]: https://github.com/visionmedia/supertest
[TestContainers]: https://testcontainers.com/
[Vercel]: https://vercel.com/
[Vite]: https://vitejs.dev/
[Vitest]: https://vitest.dev/
[wiki]: https://github.com/textbook/starter-kit/wiki
[Winston]: https://github.com/winstonjs/winston
