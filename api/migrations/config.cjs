const { join } = require("node:path");

const { dbConfig, logLevel, production } = require("../utils/config.cjs");

const migrationConfig = {
	"ignore-pattern": "(config|template)\\.cjs$",
	"migrations-dir": __dirname,
	"template-file-name": join(__dirname, "template.cjs"),
	url: dbConfig,
};

if (logLevel === "debug" && !production) {
	/* eslint-disable-next-line no-console -- app logger not available here */
	console.debug("migrating with %O", migrationConfig);
}

module.exports = migrationConfig;
