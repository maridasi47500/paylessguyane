require "application_system_test_case"

class BonsplansTest < ApplicationSystemTestCase
  setup do
    @bonsplan = bonsplans(:one)
  end

  test "visiting the index" do
    visit bonsplans_url
    assert_selector "h1", text: "Bonsplans"
  end

  test "creating a Bonsplan" do
    visit bonsplans_url
    click_on "New Bonsplan"

    fill_in "Content", with: @bonsplan.content
    fill_in "Image", with: @bonsplan.image
    fill_in "Title", with: @bonsplan.title
    click_on "Create Bonsplan"

    assert_text "Bonsplan was successfully created"
    click_on "Back"
  end

  test "updating a Bonsplan" do
    visit bonsplans_url
    click_on "Edit", match: :first

    fill_in "Content", with: @bonsplan.content
    fill_in "Image", with: @bonsplan.image
    fill_in "Title", with: @bonsplan.title
    click_on "Update Bonsplan"

    assert_text "Bonsplan was successfully updated"
    click_on "Back"
  end

  test "destroying a Bonsplan" do
    visit bonsplans_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Bonsplan was successfully destroyed"
  end
end
