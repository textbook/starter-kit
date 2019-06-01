Starter Kit
===========

 - [ ] Full stack ES8+
 - [ ] Node LTS support (currently 10.x)
 - [x] Consistent linting with ESLint
 - [x] Consistent testing with Jest
 - [x] Dev mode
 - [x] Production build
 - [ ] Travis pipeline
 - [ ] Heroku deployment

Scripts
-------

Various scripts are provided in the package file, here are the ones you'll commonly use:

 - `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and the frontend is proxied to it).
 - `e2e`: builds and starts the app in production mode and runs the Cypress tests against it.
 - `e2e:dev`: opens Cypress for local dev, instead of running it in the background. Doesn't start the app.
 - `lint`: runs ESLint against all the JavaScript in the project.
 - `serve`: builds and starts the app in production mode locally.
 - `ship`: runs `lint`, then `test`, then `e2e`; ideal before a `git push`.
 - `test`: runs the Jest unit and integration tests.
 - `test:watch`: runs the unit and integration tests in watch mode.
