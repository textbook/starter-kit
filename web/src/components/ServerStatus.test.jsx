import { http, HttpResponse } from "msw";

import { describe, expect, it } from "../testFixtures.js";

import ServerStatus from "./ServerStatus";

describe("ServerStatus component", () => {
	it("fetches the right thing", async ({ page, render, worker }) => {
		worker.use(http.get("/api/message", () => HttpResponse.text("hi!")));

		await render(<ServerStatus />);

		await expect
			.element(page.getByText(/server says: hi!/i))
			.toBeInTheDocument();
	});

	it("shows message if server errors", async ({ page, render, worker }) => {
		worker.use(http.get("/api/message", () => HttpResponse.error()));

		await render(<ServerStatus />);

		await expect
			.element(page.getByText(/server says: unknown/i))
			.toBeInTheDocument();
	});
});
