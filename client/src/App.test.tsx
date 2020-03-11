import React from "react";
import { render, RenderResult } from "@testing-library/react";

import { App } from "./App";
import logo from "./logo.svg";
import { getMessage } from "./service";
import { defer, Deferred, tick } from "../../testHelpers";

jest.mock("./service");

describe("App", () => {
	let deferred: Deferred<string>;
	let wrapper: RenderResult;

	const message = "Foo bar!";

	beforeEach(() => {
		deferred = defer();
		(getMessage as jest.Mock).mockReturnValue(deferred.promise);
		wrapper = render(<App />);
	});

	it("requests the message", () => {
		expect(getMessage).toHaveBeenCalled();
	});

	it("shows a loading state", async () => {
		expect(wrapper.getByTestId("message")).toHaveTextContent("Loading...");
	});

	describe("when request resolves", () => {
		beforeEach(async () => {
			deferred.resolve(message);
			await tick();
		});

		it("says 'Hello, world!'", async () => {
			const element = wrapper.getByTestId("message");
			expect(element).toHaveTextContent(message);
		});

		it("shows an image", async () => {
			const element = wrapper.getByTestId("logo");
			expect(element).toHaveAttribute("alt", "Just the React logo");
			expect(element).toHaveAttribute("src", logo);
		});
	});
});
