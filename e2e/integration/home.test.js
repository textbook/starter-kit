it("displays the site", () => {
  cy.visit("/");
  cy.get("[data-qa=\"message\"]").should("contain.text", "Hello, world!");
});
