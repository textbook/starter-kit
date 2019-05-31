import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  it("says 'Hello, world!'", () => {
    expect(wrapper.getByTestId("message")).toHaveTextContent("Hello, world!");
  });
});
