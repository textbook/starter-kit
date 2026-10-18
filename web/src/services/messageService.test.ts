import { http, HttpResponse } from "msw/http";

import { server } from "../setupTests.ts";

import { getMessage } from "./messageService.ts";

describe("messageService", () => {
	it("throws an error if the request fails", async () => {
		server.use(
			http.get(
				"/api/message",
				() => new HttpResponse("Not Found", { status: 404 }),
			),
		);
		await expect(getMessage()).rejects.toThrow(/^Not Found$/);
	});
});
