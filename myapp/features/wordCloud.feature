Feature: REQ 3.2.4 Word Cloud
	In order to use the application's main purpose
	As a user
	I need to be able to see and interact with the word cloud

Scenario: req 3.2.4.2 Word Cloud display after search
	Given I am on the search page
	When I fill the searchBar with justin bieber
	And I click Search button
	Then I should be on the word cloud page
	And I should see the word cloud

Scenario: req 3.2.3.2 Search on Word Cloud Page
	Given I am on the search page
	When I fill the searchBar with michael jackson
	And I click Search button
	Then I should be on the second word cloud page
	And I should see the word cloud


