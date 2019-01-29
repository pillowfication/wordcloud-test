Then /the chosen word and the artist should be shown on the page/ do
	expect(page).to have_content("justin bieber")
	expect(page).to have_content("Boyfriend")
end

Then /the entries on the list should have name, parenthesis and frequency/ do
	expect(page).to have_content("(")
	expect(page).to have_content(")")
	expect(page).to have_content("1")
	expect(page).to have_content("Boyfriend")
end

When /I click a song/ do
	page.click_link("Boyfriend(15)")
end

Then /the lyrics should match the song I clicked/ do
	expect(page).to have_content("Boyfriend")
	expect(page).to have_content("you")
end