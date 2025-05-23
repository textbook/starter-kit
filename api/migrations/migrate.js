import { parseArgs } from "node:util";

import { runner } from "node-pg-migrate";

import config from "../utils/config.js";

const {
	positionals: [direction],
} = parseArgs({ allowPositionals: true });

if (!direction || !["up", "down"].includes(direction)) {
	throw new Error("usage: npm run migration <up|down>");
}

const { migrationConfig } = config.init();

await runner({ ...migrationConfig, direction });
