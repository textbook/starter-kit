import React from "react";
import { Router } from "react-router-dom";
import { act, fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { Home } from "./Home";
import logo from "./logo.svg";
import { getMessage } from "../service";

jest.mock("../service");

describe("Home", () => {
	let deferred;
	let history;
	let wrapper;

	const message = "Foo bar!";

	beforeEach(() => {
		history = createMemoryHistory();
		deferred = defer();
		getMessage.mockReturnValue(deferred.promise);
		wrapper = render(<Router history={history}><Home /></Router>);
	});

	it("requests the message", () => {
		expect(getMessage).toHaveBeenCalled();
	});

	it("shows a loading state", async () => {
		expect(wrapper.getByTestId("message")).toHaveTextContent("Loading...");
	});

	it("allows the user to navigate to the About page", () => {
		fireEvent.click(wrapper.getByText("About"));
		expect(history.location.pathname).toBe("/about");
	});

	describe("when request resolves", () => {
		beforeEach(async () => {
			deferred.resolve(message);
			await act(tick);
		});

		it("says 'Hello, world!'", async () => {
			let element = wrapper.getByTestId("message");
			expect(element).toHaveTextContent(message);
		});

		it("shows an image", async () => {
			let element = wrapper.getByTestId("logo");
			expect(element).toHaveAttribute("alt", "Just the React logo");
			expect(element).toHaveAttribute("src", logo);
		});
	});
});
