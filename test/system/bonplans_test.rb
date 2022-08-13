require "application_system_test_case"

class BonplansTest < ApplicationSystemTestCase
  setup do
    @bonplan = bonplans(:one)
  end

  test "visiting the index" do
    visit bonplans_url
    assert_selector "h1", text: "Bonplans"
  end

  test "creating a Bonplan" do
    visit bonplans_url
    click_on "New Bonplan"

    fill_in "Content", with: @bonplan.content
    fill_in "Image", with: @bonplan.image
    fill_in "Title", with: @bonplan.title
    click_on "Create Bonplan"

    assert_text "Bonplan was successfully created"
    click_on "Back"
  end

  test "updating a Bonplan" do
    visit bonplans_url
    click_on "Edit", match: :first

    fill_in "Content", with: @bonplan.content
    fill_in "Image", with: @bonplan.image
    fill_in "Title", with: @bonplan.title
    click_on "Update Bonplan"

    assert_text "Bonplan was successfully updated"
    click_on "Back"
  end

  test "destroying a Bonplan" do
    visit bonplans_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Bonplan was successfully destroyed"
  end
end
