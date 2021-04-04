class TopicController < ApplicationController

  skip_before_action :authenticate_user!, :only => [:index, :show]

  def index
    if can? :destroy, Topic
      @topics = Topic.where(subcategory_id: params[:subcategory_id])
      @can_modify = true
    else
      @topics = Topic.where(subcategory_id: params[:subcategory_id]).where(approved: true)
      @can_modify = false
    end
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
  end

  def edit
    @topic = Topic.find(params[:id])
    authorize! :edit, @topic
  end

  def update
    @topic = Topic.find(params[:id])
    authorize! :update, @topic
    @topic.update(topic_params)
  end

  def destroy
    @topic = Topic.find(params[:id])
    authorize! :destroy, @topic
    @topic.destroy
  end

  private

  def topic_params
    params.require(:topic).permit(:subcategory_id, :user_id, :name, :content)
  end

end
