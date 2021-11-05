import { Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { Home } from "./Home";
import logo from "./logo.svg";

const renderWithHistory = () => {
	const history = createMemoryHistory();
	const wrapper = render(
		<Router location={history.location} navigator={history}>
			<Home />
		</Router>
	);
	return { ...wrapper, history };
};

const message = "Foo bar!";

const server = setupServer(
	rest.get("/api", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json({ message }));
	}),
);

describe("Home", () => {
	beforeAll(() => server.listen());

	afterEach(() => server.resetHandlers());

	afterAll(() => server.close());

	it("shows a loading state", async () => {
		const { getByTestId } = renderWithHistory();
		expect(getByTestId("message")).toHaveTextContent("Loading...");
	});

	it("allows the user to navigate to the About page", () => {
		const { getByText, history } = renderWithHistory();
		fireEvent.click(getByText("About"));
		expect(history.location.pathname).toBe("/about/this/site");
	});

	it("shows an image", async () => {
		const { getByTestId } = renderWithHistory();
		let element = getByTestId("logo");
		expect(element).toHaveAttribute("alt", "Just the React logo");
		expect(element).toHaveAttribute("src", logo);
	});

	it("shows the message when request resolves", async () => {
		const { findByText } = renderWithHistory();

		await expect(findByText(message)).resolves.toBeInTheDocument();
	});
});
