require "test_helper"

class TopicControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get topic_index_url
    assert_response :success
  end

  test "should get show" do
    get topic_show_url
    assert_response :success
  end

  test "should get new" do
    get topic_new_url
    assert_response :success
  end

  test "should get create" do
    get topic_create_url
    assert_response :success
  end

  test "should get edit" do
    get topic_edit_url
    assert_response :success
  end

  test "should get update" do
    get topic_update_url
    assert_response :success
  end

  test "should get destroy" do
    get topic_destroy_url
    assert_response :success
  end
end
