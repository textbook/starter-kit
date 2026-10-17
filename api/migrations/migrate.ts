import { parseArgs } from "node:util";

import { runner } from "node-pg-migrate";

import config from "../utils/config.ts";

const DIRECTIONS = ["down", "redo", "up"] as const;

const {
	positionals: [direction, rawCount],
} = parseArgs({ allowPositionals: true });

const { migrationConfig } = config.init();

const count = rawCount ? Number.parseInt(rawCount, 10) : undefined;

validateDirection(direction);

if (direction === "redo") {
	await runner({ ...migrationConfig, count, direction: "down" });
	await runner({ ...migrationConfig, count: count ?? 1, direction: "up" });
} else {
	await runner({ ...migrationConfig, count, direction });
}

function validateDirection(
	value?: string,
): asserts value is (typeof DIRECTIONS)[number] {
	if (!value || !(DIRECTIONS as readonly string[]).includes(value)) {
		throw new Error("usage: npm run migration <up|down|redo> [count]");
	}
}
