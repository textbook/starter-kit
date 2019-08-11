import request from "supertest";

import app from "./app";

describe("app", () => {
	it("serves from the (missing) static directory", async () => {
		await request(app).get("/").expect(404);
	});

	it("exposes the message", async () => {
		await request(app).get("/api").expect(200, { message: "Hello, world!" });
	});
});
