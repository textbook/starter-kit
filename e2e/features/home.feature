Feature: Home page

	Scenario: Check page title
		Given I am on home page
		Then I see in title "Vite + React"

	Scenario: Check accessibility
		Given I am on home page
		Then it meets accessibility guidelines

	Scenario: Check server connection
		Given I am on home page
		Then I see in page "Server says: Hello, world!"

	Scenario: Check Vite link
		Given I am on home page
		When I click the "Vite logo" link
		Then I am taken to "https://vite.dev/"
