require 'test_helper'

class BonsplansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bonsplan = bonsplans(:one)
  end

  test "should get index" do
    get bonsplans_url
    assert_response :success
  end

  test "should get new" do
    get new_bonsplan_url
    assert_response :success
  end

  test "should create bonsplan" do
    assert_difference('Bonsplan.count') do
      post bonsplans_url, params: { bonsplan: { content: @bonsplan.content, image: @bonsplan.image, title: @bonsplan.title } }
    end

    assert_redirected_to bonsplan_url(Bonsplan.last)
  end

  test "should show bonsplan" do
    get bonsplan_url(@bonsplan)
    assert_response :success
  end

  test "should get edit" do
    get edit_bonsplan_url(@bonsplan)
    assert_response :success
  end

  test "should update bonsplan" do
    patch bonsplan_url(@bonsplan), params: { bonsplan: { content: @bonsplan.content, image: @bonsplan.image, title: @bonsplan.title } }
    assert_redirected_to bonsplan_url(@bonsplan)
  end

  test "should destroy bonsplan" do
    assert_difference('Bonsplan.count', -1) do
      delete bonsplan_url(@bonsplan)
    end

    assert_redirected_to bonsplans_url
  end
end
