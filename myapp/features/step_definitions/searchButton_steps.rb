When /I fill the (.*) with (.*)/ do |textField,content|
	fill_in(textField, :with => content)
end

Then /an error message should be displayed/ do
	expect(page).to (have_content("error") or have_content("Error"))
end