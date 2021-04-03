class CommentController < ApplicationController

  def index
    @comments = Comment.all
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def new
    @comment = Comment.new
  end

  def create
    Comment.create(comment_params)
    redirect_to comment_index_path
  end

  def edit
    @comment = Comment.find(params[:id])
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    redirect_to comment_path(@comment)
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to comment_index_path
  end

  private

  def comment_params
    params.require(:subcategory).permit(:topic_id, :user_id, :content)
  end

end
