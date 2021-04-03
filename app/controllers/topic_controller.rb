class TopicController < ApplicationController

  skip_before_action :authenticate_user!, :only => [:index, :show]

  def index
    @topics = Topic.all.where(approved: true)
    authorize! :index, @topics
  end

  def show
    @topic = Topic.find(params[:id])
    authorize! :show, @topic
    @comments = Comment.where(topic_id: @topic)
  end

  def new
    @topic = Topic.new
    authorize! :new, @topic
  end

  def create
    @topic = Topic.new(topic_params)
    authorize! :new, @topic
    @topic.save
    redirect_to category_subcategory_topic_path(@topic)
  end

  def edit
    @topic = Topic.find(params[:id])
    authorize! :edit, @topic
  end

  def update
    @topic = Topic.find(params[:id])
    authorize! :update, @topic
    @topic.update(topic_params)
    redirect_to category_subcategory_topic_index_path(@topic)
  end

  def destroy
    @topic = Topic.find(params[:id])
    authorize! :destroy, @topic
    @topic.destroy
    redirect_to category_subcategory_topic_index_path(@topic)
  end

  private

  def topic_params
    params.require(:subcategory).permit(:subcategory_id, :user_id, :name, :content)
  end

end
