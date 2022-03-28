# Webpack

This starter kit uses [Webpack] to create the React client app.

- `common.config.js`: configuration that's shared between modes, mostly _"loaders"_ for different kinds of file
- `dev.config.js`: enables the dev server for development mode (`npm run dev`)
  - Enables fallback for client-side routing
  - Configures proxy to the Express backend
- `prod.config.js`: creates the actual build output for production mode (`npm run build`)
  - Externalises React/-DOM to a CDN to reduce vendor bundle size

[Webpack]: https://webpack.js.org/
