import React from "react";
import { render } from "@testing-library/react";

import App from "./App";
import { getMessage } from "./service";

jest.mock("./service");

describe("App", () => {
  let deferred;
  let wrapper;

  const message = "Foo bar!";

  beforeEach(() => {
    deferred = defer();
    getMessage.mockReturnValue(deferred.promise);
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
      expect(wrapper.getByTestId("message")).toHaveTextContent(message);
    });
  });
});
