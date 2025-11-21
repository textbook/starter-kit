import { http, HttpResponse } from "msw";

import { beforeEach, describe, expect, it } from "../testFixtures.js";

import Home from "./Home.jsx";

describe("Home component", () => {
	beforeEach(({ worker }) =>
		worker.use(http.get("/api/message", () => HttpResponse.text(""))),
	);

	it("shows a link", async ({ page, render }) => {
		render(<Home />);

		await expect
			.element(page.getByRole("link", { name: "React logo" }))
			.toHaveAttribute("href", "https://react.dev");
	});

	it("has a click counter", async ({ page, render, user }) => {
		render(<Home />);

		await user.click(page.getByRole("button", { name: /count is 0/i }));

		await expect
			.element(page.getByRole("button", { name: /count is 1/ }))
			.toBeInTheDocument();
	});
});
