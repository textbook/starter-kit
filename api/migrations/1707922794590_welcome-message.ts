import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export function up(pgm: MigrationBuilder) {
	pgm.createTable("message", {
		content: { notNull: true, type: "string" },
	});
	pgm.sql("INSERT INTO message (content) VALUES ('Hello, world!')");
}

export function down(pgm: MigrationBuilder) {
	pgm.dropTable("message");
}

export const shorthands: ColumnDefinitions = {};
