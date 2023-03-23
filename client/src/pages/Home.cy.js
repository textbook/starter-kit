import Home from "./Home";

describe("Home", () => {
	it("shows a loading state", () => {
		cy.mount(<Home />);
		cy.findByTestId("message").should("have.text", "Loading...");
	});

	it("allows the user to navigate to the About page", () => {
		cy.mount(<Home />);
		cy.findByText("About").should("have.attr", "href", "/about/this/site");
	});

	it("shows an image", () => {
		cy.mount(<Home />);
		cy.findByTestId("logo").should("have.attr", "alt", "Just the React logo");
	});

	it("shows the message when request resolves", () => {
		const message = "Hi!";
		cy.intercept("/api", { body: { message } }).as("request");
		cy.mount(<Home />);
		cy.wait("@request");
		cy.findByText(message).should("exist");
	});
});
