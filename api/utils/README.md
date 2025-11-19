# Utilities

`api/utils/` contains various utility modules. In practice, you'll probably:

- Import from and maybe add new options to `config.js`;
- Import from `logger.js`; and
- Ignore `middleware.js` entirely (all predefined middleware is already used in `app.js`).

## `config.js`

Creates and exposes an object representing the app's configuration. This centralises access to the environment and definition of default values.

[Dotenv] is used to load any configuration required from a `.env` file in the root of the repository.

To check if this is being used correctly, if you search your codebase, _all_ uses of `process.env` in `api/` should be in this file.

If you need some configuration at the module level, to avoid accessing this when the module loads, you can defer its access using the `withConfig` function:

```js
import { SESClient } from "@aws-sdk/client-ses";

import { withConfig } from "path/to/config.js";

const client = withConfig((config) => new SESClient(/* use config */));

// ...
```

Now the configuration will only be read the first time a property on `client` is actually used.

## `logger.js`

Creates, configures and exports a [Winston] logger, which you can then import and use elsewhere:

```js
import logger from "./utils/logger";

// ...

router.get("/welcome", (_, res) => {
	const message = "Hello, world!";
	// basic information shown by default
	logger.info("sending a welcome message");
	// extra details only seen if LOG_LEVEL=debug
	logger.debug("message reads: %s", message);
	res.json({ message });
});
```

**Notes**:

- The default [log level] is `"info"`
- The log level can be overridden by setting the `LOG_LEVEL` environment variable
- Timestamps can be added by setting the `TIMESTAMP` environment variable to `true` and/or setting the `TIMESTAMP_FORMAT` environment variable to a [`fecha` string format][fecha-format]
- The log level is automatically set to `"debug"` in development mode (`npm run dev`)
- ESLint's `"no-console"` rule is activated in `api/`, to remind you to use the logger instead

## `middleware.js`

Defines default middleware used in `api/app.js`:

- `clientRouter`: brings the React client into the Express server for production mode
  - serves React app build outputs (CSS, HTML, JS, etc.) from `api/static/` directory
  - provides the client app `index.html` to any GET request that isn't to an API endpoint, allowing client-side pages using e.g. [React Router]
- `configuredHelmet`: provides a configured version of the [Helmet] middleware to set the right [Content Security Policy]
- `configuredMorgan`: provides a configured version of the [Morgan] middleware to log using Winston
- `httpsOnly`: redirects the user to `https://your.site/path` if they try to access `http://your.site/path`, to make sure they have a secure connection (only used if `NODE_ENV` is `"production"`, so you can use HTTP for local development)
- `logErrors`: if there's an unhandled error, this logs it to the server console and responds 500 Internal Server Error to the request
  - **Note**: for guidance on `async` handlers see https://expressjs.com/en/guide/error-handling.html#catching-errors

  [Content Security Policy]: https://github.com/textbook/starter-kit/wiki/Content-Security-Policy
  [Dotenv]: https://github.com/textbook/starter-kit/wiki/Dotenv
  [fecha-format]: https://www.npmjs.com/package/fecha#formatting
  [Helmet]: https://helmetjs.github.io/
  [log level]: https://www.npmjs.com/package/winston#logging-levels
  [Morgan]: https://github.com/expressjs/morgan
  [React Router]: https://reactrouter.com/web
  [Winston]: https://github.com/winstonjs/winston
