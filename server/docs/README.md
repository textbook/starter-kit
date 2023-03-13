# Documentation

`server/docs/` contains configurations for generating [Swagger] documentation, which is hosted at `/docs`.

In practice you'll probably:

- Create new `[endpoint].yml` files for the API endpoints you're creating.
- Ignore `index.js` completely (unless you want to automatically pick up docs from elsewhere in the repo).
- Add [reusable schemas] (e.g. descriptions of objects or common responses) into `schema.yml`.

## `api.yml`

Defines the `GET /api` endpoint. Any other `*.yml` files in this directory will be picked up automatically.

## `index.js`

Configures the router for the `/docs` endpoint.

## `schema.yml`

Defines reusable components (like the object `{ message: string }`) for use in the other API docs.

[reusable schemas]: https://swagger.io/docs/specification/using-ref/
[Swagger]: https://swagger.io/
