Feature: About page

	Scenario: Check page heading
		Given I am on about page
		Then I see in heading "About"

	Scenario: Check accessibility
		Given I am on about page
		Then it meets accessibility guidelines
