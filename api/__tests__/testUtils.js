import request from "supertest";

/**
 * @returns {Promise<import("supertest").Agent>}
 */
export async function createRequest() {
	const { default: app } = await import("../app.ts");
	return request(app);
}
