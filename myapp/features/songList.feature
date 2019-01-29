Feature: REQ 3.2.8 Song List
	In order to inspect the songs that contain a chosen word
	As a user
	I need to be able to see and interact with the song list

Scenario: req 3.2.8.3 Song List and Title
	Given I am on the song list page
	Then I should see the song list
	And the chosen word and the artist should be shown on the page

Scenario: req 3.2.8.3 Song Name, parenthesis and fequency
	Given I am on the song list page
	Then the entries on the list should have name, parenthesis and frequency

Scenario: req 3.2.8.3 Navigating to Lyrics Page
	Given I am on the song list page
	When I click a song
	Then I should be on the lyrics page

Scenario: req 3.2.8.3 Correctness of Navigation
	Given I am on the song list page
	When I click a song
	Then I should be on the lyrics page
	And the lyrics should match the song I clicked
	