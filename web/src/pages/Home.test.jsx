import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import { server } from "../setupTests.js";

import Home from "./Home.jsx";

describe("Home component", () => {
	beforeEach(() =>
		server.use(http.get("/healthz", () => HttpResponse.text("OK"))),
	);

	it("shows a link", () => {
		render(<Home />);

		expect(screen.getByRole("link", { name: "React logo" })).toHaveAttribute(
			"href",
			"https://react.dev",
		);
	});

	it("has a click counter", async () => {
		const user = userEvent.setup();
		render(<Home />);

		await user.click(screen.getByRole("button", { name: /count is 0/i }));

		await expect(
			screen.findByRole("button", { name: /count is 1/ }),
		).resolves.toBeInTheDocument();
	});
});
