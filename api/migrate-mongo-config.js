import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import config from "./utils/config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import("migrate-mongo").config.Config} */
export default {
	changelogCollectionName: "changelog",
	migrationFileExtension: ".js",
	migrationsDir: join(__dirname, "migrations"),
	moduleSystem: "esm",
	mongodb: { url: config.dbUrl },
	useFileHash: false,
};
