import { getErrorMessage } from "./utilities.ts";

describe("getErrorMessage", () => {
	it("returns the message property", () => {
		const message = "hello, world!";
		expect(getErrorMessage({ message })).toEqual(message);
	});

	it.each([
		["null", null],
		["non-object", 123],
		["missing property", {}],
		["non-string property", { message: 123 }],
	] satisfies [string, unknown][])("returns placeholder for %s", (value, _) => {
		expect(getErrorMessage(value)).toEqual("<unknown>");
	});
});
