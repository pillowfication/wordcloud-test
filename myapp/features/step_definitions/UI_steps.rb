Given /I am on the (.*)/ do |page|
	visit PAGES[page]
end

Then /I should see the artist title/ do
	expect(page).to have_content("justin bieber")
end

Then /I should see the song title/ do
	expect(page).to have_content("Boyfriend")
end

Then /I should see the search bar/ do
	expect(page).to have_xpath("//input[@id='searchBar' or @id='searchBar2']")
end

Then /I should see the (.*) button/ do |button|
	expect(page).to have_content(button)
end 

Then /I should see the Facebook Share/ do
	expect(page).to have_xpath("//div[@class='fb-share-button fb_iframe_widget']")
end

Then /I should see the word cloud/ do
	expect(page).to have_xpath("//canvas[@id='canvas']")
end

Then /the word cloud title should be the same as html title/ do
	expect(current_url).to include("justin")
	expect(current_url).to include("bieber")
end

Then /the song list title should be the same as html title/ do
	expect(current_url).to include("you")
end

Then /the song title should be the same as html title/ do
	expect(current_url).to include("Boyfriend")
end

Then /I should see the word as title/ do
	expect(page).to have_content("you")
end

Then /I should see the song list/ do
	expect(page).to have_xpath("//ol[@id='songList']")
end

