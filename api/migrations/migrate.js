import { parseArgs } from "node:util";

import { runner } from "node-pg-migrate";

import config from "../utils/config.js";

const {
	positionals: [direction, rawCount],
} = parseArgs({ allowPositionals: true });

if (!direction || !["down", "redo", "up"].includes(direction)) {
	throw new Error("usage: npm run migration <up|down|redo> [count]");
}

const { migrationConfig } = config.init();

const count = rawCount ? parseInt(rawCount, 10) : undefined;

if (direction === "redo") {
	await runner({ ...migrationConfig, count, direction: "down" });
	await runner({ ...migrationConfig, count: count ?? 1, direction: "up" });
} else {
	await runner({ ...migrationConfig, count, direction });
}
