Feature: REQ 3.1.1 Navigation Between Pages
	In order to go back to previous pages as necessary
	As a user
	I need to be able to navigate to previous pages with navigation buttons

Scenario: req 3.1.1.3 Navigation from Song List Page
	Given I am on the song list page
	When I click Back to Cloud button
	Then I should be on the word cloud page

Scenario: req 3.1.1.4 Navigation to Song List Page from Lyrics Page
	Given I am on the lyrics page
	When I click Back to List button
	Then I should be on the song list page

Scenario: req 3.1.1.4 Navigation to Word Cloud Page from Lyrics Page
	Given I am on the lyrics page
	When I click Back to Cloud button
	Then I should be on the word cloud page
	