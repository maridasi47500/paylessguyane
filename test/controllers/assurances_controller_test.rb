require 'test_helper'

class AssurancesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @assurance = assurances(:one)
  end

  test "should get index" do
    get assurances_url
    assert_response :success
  end

  test "should get new" do
    get new_assurance_url
    assert_response :success
  end

  test "should create assurance" do
    assert_difference('Assurance.count') do
      post assurances_url, params: { assurance: { name: @assurance.name, price: @assurance.price } }
    end

    assert_redirected_to assurance_url(Assurance.last)
  end

  test "should show assurance" do
    get assurance_url(@assurance)
    assert_response :success
  end

  test "should get edit" do
    get edit_assurance_url(@assurance)
    assert_response :success
  end

  test "should update assurance" do
    patch assurance_url(@assurance), params: { assurance: { name: @assurance.name, price: @assurance.price } }
    assert_redirected_to assurance_url(@assurance)
  end

  test "should destroy assurance" do
    assert_difference('Assurance.count', -1) do
      delete assurance_url(@assurance)
    end

    assert_redirected_to assurances_url
  end
end
