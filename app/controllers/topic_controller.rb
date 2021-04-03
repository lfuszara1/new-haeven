class TopicController < ApplicationController

  def index
    @topics = Topic.all.where(approved: true)
  end

  def show
    @topic = Topic.find(params[:id])
    @comments = Comment.where(topic_id: @topic)
  end

  def new
    @topic = Topic.new
  end

  def create
    Topic.create(topic_params)
    redirect_to topic_index_path
  end

  def edit
    @topic = Topic.find(params[:id])
  end

  def update
    @topic = Topic.find(params[:id])
    @topic.update(topic_params)
    redirect_to topic_path(@topic)
  end

  def destroy
    @topic = Topic.find(params[:id])
    @topic.destroy
    redirect_to topic_index_path
  end

  private

  def topic_params
    params.require(:subcategory).permit(:subcategory_id, :user_id, :name, :content)
  end

end
