import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import App from "./App.jsx";

describe("App component", () => {
	it("shows a link", () => {
		render(<App />);

		expect(screen.getByRole("link", { name: "React logo" }))
			.toHaveAttribute("href", "https://react.dev");
	});

	it("has a click counter", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: /count is 0/i }));

		await expect(screen.findByRole("button", { name: /count is 1/ })).resolves.toBeInTheDocument();
	});
});
