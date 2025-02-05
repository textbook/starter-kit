import { createRequest } from "./testUtils.js";

describe("/api", () => {
	describe("GET /message", () => {
		it("returns a message", async () => {
			const request = await createRequest();
			await request.get("/api/message").expect(200, "Hello, world!");
		});
	});
});
