import db from "../db.ts";

export async function getAll(): Promise<{ content: string }[]> {
	const { rows } = await db.query<{ content: string }>(
		"SELECT * FROM message;",
	);
	return rows;
}
