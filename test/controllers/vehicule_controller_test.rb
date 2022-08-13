require 'test_helper'

class VehiculeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get vehicule_index_url
    assert_response :success
  end

end
