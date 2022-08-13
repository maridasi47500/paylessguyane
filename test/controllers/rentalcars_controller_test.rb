require 'test_helper'

class RentalcarsControllerTest < ActionDispatch::IntegrationTest
  test "should get categorie" do
    get rentalcars_categorie_url
    assert_response :success
  end

end
