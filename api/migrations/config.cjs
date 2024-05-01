const { join } = require("node:path");

const config = require("../utils/config.cjs");

const migrationConfig = {
	"ignore-pattern": "(config|template)\\.cjs$",
	"migrations-dir": __dirname,
	"template-file-name": join(__dirname, "template.cjs"),
	url: config.dbConfig,
};

if (
	/* eslint-disable no-restricted-syntax */
	process.env.NODE_ENV?.toLowerCase() !== "production" &&
	process.env.LOG_LEVEL?.toLowerCase() === "debug"
	/* eslint-enable no-restricted-syntax */
) {
	/* eslint-disable-next-line no-console */
	console.debug("migrating with %O", migrationConfig);
}

module.exports = migrationConfig;
