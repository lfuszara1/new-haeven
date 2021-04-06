class TopicController < ApplicationController

  skip_before_action :authenticate_user!, :only => [:index, :show]

  def index
    if can? :destroy, Topic
      @topics = Topic.where(subcategory_id: params[:subcategory_id]).order('name DESC')
    else
      @topics = Topic.where(subcategory_id: params[:subcategory_id]).where(approved: true).order('name DESC')
    end
    @users = []
    @topics.each do |topic|
      @users << User.find(topic.user_id)
    end
    @topics_with_users = @topics.zip(@users)
    if can? :destroy, Topic
      @can_destroy = true
    else
      @can_destroy = false
    end
    if can? :create, Topic
      @can_create = true
    else
      @can_create = false
    end
    if can? :update, Subcategory
      @can_update = true
    else
      @can_update = false
    end
    authorize! :index, @topics
  end

  def show
    @topic = Topic.find(params[:id])
    @user = User.find(@topic.user_id)
    authorize! :show, @topic
    @comments = Comment.where(topic_id: @topic)
    @users = []
    @comments.each do |comment|
      @users << User.find(comment.user_id)
    end
    @comments_with_users = @comments.zip(@users)
    @comment = Comment.new
    if can? :destroy, Comment
      @can_destroy = true
    else
      @can_destroy = false
    end
    if can? :create, Comment
      @can_create = true
    else
      @can_create = false
    end
    if can? :update, Topic
      @can_update = true
    else
      @can_update = false
    end
    authorize! :show, @topic
  end

  def new
    if can? :new, Topic
      @can_modify = true
    else
      @can_modify = false
    end
    @topic = Topic.new
    authorize! :new, @topic
  end

  def create
    if can? :create, Topic
      @topic = Topic.new(topic_admin_params)
    else
      @topic = Topic.new(topic_params)
    end
    authorize! :new, @topic
    @topic.save
  end

  def edit
    if can? :edit, Topic
      @can_modify = true
    else
      @can_modify = false
    end
    @topic = Topic.find(params[:id])
    authorize! :edit, @topic
  end

  def update
    @topic = Topic.find(params[:id])
    authorize! :update, @topic
    if can? :update, Topic
      @topic.update(topic_admin_params)
    else
      @topic.update(topic_params)
    end
  end

  def destroy
    @topic = Topic.find(destroy_topic_params[:id])
    authorize! :destroy, @topic
    @topic.destroy
  end

  private

  def topic_params
    params.require(:topic).permit(:subcategory_id, :user_id, :name, :content)
  end

  def topic_admin_params
    params.require(:topic).permit(:subcategory_id, :user_id, :name, :content, :approved)
  end

  def destroy_topic_params
    params.require(:topic).permit(:id)
  end

end
