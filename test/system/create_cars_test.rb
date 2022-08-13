require "application_system_test_case"

class CreateCarsTest < ApplicationSystemTestCase
  setup do
    @create_car = create_cars(:one)
  end

  test "visiting the index" do
    visit create_cars_url
    assert_selector "h1", text: "Create Cars"
  end

  test "creating a Create car" do
    visit create_cars_url
    click_on "New Create Car"

    fill_in "Bagages", with: @create_car.bagages
    fill_in "Categorie", with: @create_car.categorie
    fill_in "Clim", with: @create_car.clim
    fill_in "Essence", with: @create_car.essence
    fill_in "Image", with: @create_car.image
    fill_in "Manuelle", with: @create_car.manuelle
    fill_in "Min price", with: @create_car.min_price
    fill_in "Name", with: @create_car.name
    fill_in "Places", with: @create_car.places
    fill_in "Portes", with: @create_car.portes
    click_on "Create Create car"

    assert_text "Create car was successfully created"
    click_on "Back"
  end

  test "updating a Create car" do
    visit create_cars_url
    click_on "Edit", match: :first

    fill_in "Bagages", with: @create_car.bagages
    fill_in "Categorie", with: @create_car.categorie
    fill_in "Clim", with: @create_car.clim
    fill_in "Essence", with: @create_car.essence
    fill_in "Image", with: @create_car.image
    fill_in "Manuelle", with: @create_car.manuelle
    fill_in "Min price", with: @create_car.min_price
    fill_in "Name", with: @create_car.name
    fill_in "Places", with: @create_car.places
    fill_in "Portes", with: @create_car.portes
    click_on "Update Create car"

    assert_text "Create car was successfully updated"
    click_on "Back"
  end

  test "destroying a Create car" do
    visit create_cars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Create car was successfully destroyed"
  end
end
