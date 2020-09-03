import React from "react";
import { Router } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { Home } from "./Home";
import logo from "./logo.svg";
import { getMessage } from "../service";

jest.mock("../service");

const renderWithHistory = () => {
	const deferred = defer();
	const history = createMemoryHistory();
	getMessage.mockReturnValue(deferred.promise);
	const wrapper = render(<Router history={history}><Home /></Router>);
	return { ...wrapper, deferred, history };
};

describe("Home", () => {
	it("requests the message", () => {
		renderWithHistory();
		expect(getMessage).toHaveBeenCalledWith();
	});

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
		const message = "Foo bar!";
		const { deferred, getByTestId } = renderWithHistory();
		deferred.resolve(message);
		await act(tick);
		expect(getByTestId("message")).toHaveTextContent(message);
	});
});
