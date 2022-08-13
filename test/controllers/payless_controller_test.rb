require 'test_helper'

class PaylessControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get payless_index_url
    assert_response :success
  end

end
