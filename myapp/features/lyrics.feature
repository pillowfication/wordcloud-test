Feature: REQ 3.2.9 and REQ 3.2.10 Lyrics
	In order to inspect the word usage of an artist in detail
	As a user
	I need to see the full lyric of any song of my choice

Scenario: req 3.2.9.2 Lyrics Title
	Given I am on the lyrics page
	Then I should see the lyrics title

Scenario: req 3.2.9.3 Format of artist name and title
	Given I am on the lyrics page
	Then the title and artist name should follow the given format

Scenario: req 3.2.10.2 Title and Word
	Given I am on the lyrics page
	Then I should see the lyrics title
	And I should see the searched word

Scenario: req 3.2.10.3 Lyrics
	Given I am on the lyrics page
	Then I should see the song lyrics


