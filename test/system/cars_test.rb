require "application_system_test_case"

class CarsTest < ApplicationSystemTestCase
  setup do
    @car = cars(:one)
  end

  test "visiting the index" do
    visit cars_url
    assert_selector "h1", text: "Cars"
  end

  test "creating a Car" do
    visit cars_url
    click_on "New Car"

    fill_in "Bagages", with: @car.bagages
    fill_in "Categorie", with: @car.categorie
    fill_in "Clim", with: @car.clim
    fill_in "Essence", with: @car.essence
    fill_in "Image", with: @car.image
    fill_in "Manuelle", with: @car.manuelle
    fill_in "Min price", with: @car.min_price
    fill_in "Name", with: @car.name
    fill_in "Places", with: @car.places
    fill_in "Portes", with: @car.portes
    click_on "Create Car"

    assert_text "Car was successfully created"
    click_on "Back"
  end

  test "updating a Car" do
    visit cars_url
    click_on "Edit", match: :first

    fill_in "Bagages", with: @car.bagages
    fill_in "Categorie", with: @car.categorie
    fill_in "Clim", with: @car.clim
    fill_in "Essence", with: @car.essence
    fill_in "Image", with: @car.image
    fill_in "Manuelle", with: @car.manuelle
    fill_in "Min price", with: @car.min_price
    fill_in "Name", with: @car.name
    fill_in "Places", with: @car.places
    fill_in "Portes", with: @car.portes
    click_on "Update Car"

    assert_text "Car was successfully updated"
    click_on "Back"
  end

  test "destroying a Car" do
    visit cars_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Car was successfully destroyed"
  end
end
