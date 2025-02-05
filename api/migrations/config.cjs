const config = require("../utils/config.cjs");

const { logLevel, migrationConfig, production } = config.init();

if (logLevel === "debug" && !production) {
	/* eslint-disable-next-line no-console -- app logger not available here */
	console.debug("migrating with %O", migrationConfig);
}

module.exports = migrationConfig;
