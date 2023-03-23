// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

import { configure } from "@testing-library/cypress";
import { mount } from "cypress/react18";
import { MemoryRouter } from "react-router-dom";

configure({ testIdAttribute: "data-qa" });

Cypress.Commands.add("mount", (component, options = {}) => {
	const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;
	const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>;
	return mount(wrapped, mountOptions);
});
