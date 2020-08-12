beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.findByTestId("message").should("contain.text", "Hello, world!");
});

it("meets basic accessibility guidelines", () => {
	cy.injectAxe();
	cy.checkA11y();
});
