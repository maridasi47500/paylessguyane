require 'test_helper'

class GuyaneControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get guyane_index_url
    assert_response :success
  end

end
