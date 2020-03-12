beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.getDataQa("message").should("contain.text", "Hello, world!");
});
