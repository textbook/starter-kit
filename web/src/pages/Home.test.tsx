import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw/http";
import { beforeEach, describe, expect, it } from "vitest";

import { server } from "../setupTests.ts";

import Home from "./Home.tsx";

describe("Home component", () => {
	beforeEach(() => {
		server.use(http.get("/api/message", () => HttpResponse.text("")));
	});

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
