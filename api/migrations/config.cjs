const {
	logLevel,
	migrationConfig,
	production,
} = require("../utils/config.cjs");

if (logLevel === "debug" && !production) {
	/* eslint-disable-next-line no-console -- app logger not available here */
	console.debug("migrating with %O", migrationConfig);
}

module.exports = migrationConfig;
