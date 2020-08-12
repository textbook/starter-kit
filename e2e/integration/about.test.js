it("can be reached from the homepage", () => {
	cy.visit("/");
	cy.findByText("About").click();
	cy.findByText(/wiki/).should("exist");
});

it("can be reached directly", () => {
	cy.visit("/about");
	cy.findByText(/wiki/).should("exist");
});

it("meets basic accessibility guidelines", () => {
	cy.visit("/about");
	cy.injectAxe();
	cy.checkA11y();
});
