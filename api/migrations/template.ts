import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

/**
 * Template for
 * {@link https://salsita.github.io/node-pg-migrate/migrations/ defining migrations}.
 */

/** Change the database schema to meet new functional requirements. */
export async function up(pgm: MigrationBuilder) {}

/**
 * Undo the changes introduced by the `up` function.
 *
 * This allows easy rolling back of the database to a previous state.
 *
 * If rolling back is impossible, replace with:
 *
 * @example
 * export const down = false;
 *
 */
export async function down(pgm: MigrationBuilder) {}

export const shorthands: ColumnDefinitions = {};
