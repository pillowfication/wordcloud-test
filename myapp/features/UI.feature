Feature: REQ 3.1.1 User interfaces
	In order to use the WordCloud18 application
	As a user
	I need to see the user interface

Scenario: req 3.1.1.1 Search Page UI
	Given I am on the search page
	Then I should see the search bar
	And I should see the Search button

Scenario: req 3.1.1.2 Word Cloud Page UI
	Given I am on the word cloud page
	Then I should see the artist title
	And I should see the search bar
	And I should see the Search button
	And I should see the Add to Cloud button
	And I should see the Facebook Share
	And I should see the word cloud
	And the word cloud title should be the same as html title

Scenario: req 3.1.1.3 Song List Page UI
	Given I am on the song list page
	Then I should see the word as title
	And the song list title should be the same as html title
	And I should see the Back to Cloud button
	And I should see the song list

Scenario: req 3.1.1.4 Lyrics Page UI
	Given I am on the lyrics page
	Then I should see the song title
	And the song title should be the same as html title
	And I should see the Back to Cloud button
	And I should see the Back to List button