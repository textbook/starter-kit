const { join } = require("node:path");

const config = require("../utils/config.cjs");

module.exports = {
	"ignore-pattern": "(config|template)\\.cjs$",
	"migrations-dir": __dirname,
	"template-file-name": join(__dirname, "template.cjs"),
	url: config.dbConfig,
};
