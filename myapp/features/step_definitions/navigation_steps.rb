When /I click (.*) button/ do |button|
	page.click_button(button)
end

Then /I should be on the (.*)/ do |backPage|
	expect(current_url).to eq(PAGES[backPage])
end