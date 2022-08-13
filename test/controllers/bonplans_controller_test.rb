require 'test_helper'

class BonplansControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bonplan = bonplans(:one)
  end

  test "should get index" do
    get bonplans_url
    assert_response :success
  end

  test "should get new" do
    get new_bonplan_url
    assert_response :success
  end

  test "should create bonplan" do
    assert_difference('Bonplan.count') do
      post bonplans_url, params: { bonplan: { content: @bonplan.content, image: @bonplan.image, title: @bonplan.title } }
    end

    assert_redirected_to bonplan_url(Bonplan.last)
  end

  test "should show bonplan" do
    get bonplan_url(@bonplan)
    assert_response :success
  end

  test "should get edit" do
    get edit_bonplan_url(@bonplan)
    assert_response :success
  end

  test "should update bonplan" do
    patch bonplan_url(@bonplan), params: { bonplan: { content: @bonplan.content, image: @bonplan.image, title: @bonplan.title } }
    assert_redirected_to bonplan_url(@bonplan)
  end

  test "should destroy bonplan" do
    assert_difference('Bonplan.count', -1) do
      delete bonplan_url(@bonplan)
    end

    assert_redirected_to bonplans_url
  end
end
