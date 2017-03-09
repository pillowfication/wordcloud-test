Then /I should see the lyrics title/ do
	expect(page).to have_content("Boyfriend")
end

Then /the title and artist name should follow the given format/ do
	expect(page).to have_content("Boyfriend by justin bieber")
end

Then /I should see the song lyrics/ do
	expect(page).to have_xpath("//div[@id = 'container4']")
end

Then /I should see the searched word/ do
	expect(page).to have_content("you")
end