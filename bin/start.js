#!/usr/bin/env node
import { applyMigrations } from "../api/db.ts";
import config from "../api/utils/config.ts";

const { migrationConfig, port } = config.init();

await applyMigrations(migrationConfig);

const { start } = await import("../api/app.ts");

start(port);
