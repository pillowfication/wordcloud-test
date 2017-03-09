Feature: REQ 3.2.5 Add to Cloud Button
	In order to see the word cloud of more than 1 artists combined
	As a user
	I need to be able to add an artist's lyrics to the current cloud

Scenario: req 3.2.5.3 Adding Artist to existing cloud
	Given I am on the word cloud page
	When I fill the searchBar2 with michael jackson
	And I click mergeButton button
	Then I should be on the merge word cloud page
	And I should see the word cloud
