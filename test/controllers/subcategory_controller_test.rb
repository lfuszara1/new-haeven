require "test_helper"

class SubcategoryControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get subcategory_index_url
    assert_response :success
  end

  test "should get show" do
    get subcategory_show_url
    assert_response :success
  end

  test "should get new" do
    get subcategory_new_url
    assert_response :success
  end

  test "should get create" do
    get subcategory_create_url
    assert_response :success
  end

  test "should get edit" do
    get subcategory_edit_url
    assert_response :success
  end

  test "should get update" do
    get subcategory_update_url
    assert_response :success
  end

  test "should get destroy" do
    get subcategory_destroy_url
    assert_response :success
  end
end
