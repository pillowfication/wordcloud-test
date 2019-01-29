require 'capybara/cucumber'

Capybara.default_driver = :selenium

PAGES =	{
			"search page" => "localhost:3000",
			"word cloud page" => "http://localhost:3000/wordcloud/justin%20bieber",
			"song list page" => "http://localhost:3000/wordsearch/you/justin%20bieber",
			"lyrics page" => "http://localhost:3000/song/justin%20bieber/Boyfriend/you",
			"second word cloud page" => "http://localhost:3000/wordcloud/michael%20jackson",
			"merge word cloud page" => "http://localhost:3000/merge/justin%20bieber/michael%20jackson",
			"facebook page" => "https://www.facebook.com/sharer/sharer.php?sdk=joey&u=http%3A%2F%2Flocalhost%3A3000%2F&display=popup&ref=plugin&src=share_button"
		}
