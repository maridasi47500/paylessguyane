require 'test_helper'

class CreateCarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @create_car = create_cars(:one)
  end

  test "should get index" do
    get create_cars_url
    assert_response :success
  end

  test "should get new" do
    get new_create_car_url
    assert_response :success
  end

  test "should create create_car" do
    assert_difference('CreateCar.count') do
      post create_cars_url, params: { create_car: { bagages: @create_car.bagages, categorie: @create_car.categorie, clim: @create_car.clim, essence: @create_car.essence, image: @create_car.image, manuelle: @create_car.manuelle, min_price: @create_car.min_price, name: @create_car.name, places: @create_car.places, portes: @create_car.portes } }
    end

    assert_redirected_to create_car_url(CreateCar.last)
  end

  test "should show create_car" do
    get create_car_url(@create_car)
    assert_response :success
  end

  test "should get edit" do
    get edit_create_car_url(@create_car)
    assert_response :success
  end

  test "should update create_car" do
    patch create_car_url(@create_car), params: { create_car: { bagages: @create_car.bagages, categorie: @create_car.categorie, clim: @create_car.clim, essence: @create_car.essence, image: @create_car.image, manuelle: @create_car.manuelle, min_price: @create_car.min_price, name: @create_car.name, places: @create_car.places, portes: @create_car.portes } }
    assert_redirected_to create_car_url(@create_car)
  end

  test "should destroy create_car" do
    assert_difference('CreateCar.count', -1) do
      delete create_car_url(@create_car)
    end

    assert_redirected_to create_cars_url
  end
end
