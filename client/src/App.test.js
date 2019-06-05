import React from "react";
import { render } from "@testing-library/react";

import { App } from "./App";
import { getMessage } from "./service";
import fakeFile from "../../__mocks__/fileMock";

jest.mock("./service");

describe("App", () => {
  let deferred;
  let wrapper;

  const message = "Foo bar!";
  const messageClass = "my-cool-message";

  beforeEach(() => {
    deferred = defer();
    getMessage.mockReturnValue(deferred.promise);
    wrapper = render(<App classes={{ message: messageClass }} />);
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
      let element = wrapper.getByTestId("message");
      expect(element).toHaveTextContent(message);
      expect(element).toHaveClass(messageClass);
    });

    it("shows an image", async () => {
      let element = wrapper.getByTestId("logo");
      expect(element).toHaveAttribute("alt", "Just the React logo");
      expect(element).toHaveAttribute("src", fakeFile);
    });
  });
});
