/* eslint-disable no-console */

import { configure } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";

configure({ testIdAttribute: "data-qa" });

global.defer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

global.tick = () => new Promise((resolve) => setTimeout(resolve));

const originalError = console.error;

console.error = (message, ...args) => {
  if (message.startsWith("Warning: An update to %s inside a test was not wrapped in act")) {
    // pending fix to facebook/react#15379
    console.warn(`Downgrading "${message.split("\n")[0]}" until React 16.9`, ...args);
  } else {
    originalError(message, ...args);
  }
};
