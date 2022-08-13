require "application_system_test_case"

class PrestationsTest < ApplicationSystemTestCase
  setup do
    @prestation = prestations(:one)
  end

  test "visiting the index" do
    visit prestations_url
    assert_selector "h1", text: "Prestations"
  end

  test "creating a Prestation" do
    visit prestations_url
    click_on "New Prestation"

    fill_in "Name", with: @prestation.name
    click_on "Create Prestation"

    assert_text "Prestation was successfully created"
    click_on "Back"
  end

  test "updating a Prestation" do
    visit prestations_url
    click_on "Edit", match: :first

    fill_in "Name", with: @prestation.name
    click_on "Update Prestation"

    assert_text "Prestation was successfully updated"
    click_on "Back"
  end

  test "destroying a Prestation" do
    visit prestations_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Prestation was successfully destroyed"
  end
end
