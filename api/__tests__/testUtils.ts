import type { Agent } from "supertest";
import request from "supertest";

export async function createRequest(): Promise<Agent> {
	const { default: app } = await import("../app.ts");
	return request(app);
}
