import db from "../db.js";

export async function getAll() {
	const { rows } = await db.query("SELECT * FROM message;");
	return rows;
}
