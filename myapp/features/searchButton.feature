Feature: REQ 3.2.2 Search Button
	In order to perform the search
	As a user
	I need to be able to click on the search button and perform correct actions

Scenario: req 3.2.2.1 Normal Search
	Given I am on the search page
	When I fill the searchBar with justin bieber
	And I click Search button
	Then I should be on the word cloud page

Scenario: req 3.2.2.1 Invalid Search
	Given I am on the search page
	When I fill the searchBar with nonsense
	And I click Search button
	Then an error message should be displayed