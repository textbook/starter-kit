import { writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import config from "../utils/config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const migrationConfig = {
	"//": "DO NOT EDIT - auto-generated using ./generateConfig.js",
	"ignore-pattern": "(config\\.json|generateConfig\\.js|template\\.cjs)$",
	"migrations-dir": __dirname,
	"template-file-name": join(__dirname, "template.cjs"),
	url: config.dbConfig,
};

await writeFile(
	join(__dirname, "config.json"),
	JSON.stringify(migrationConfig, null, 2),
	"utf8",
);
