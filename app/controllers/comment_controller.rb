class CommentController < ApplicationController

  def new
    @comment = Comment.new
    authorize! :new, @comment
  end

  def create
    @comment = Comment.new(comment_params)
    authorize! :new, @comment
    @comment.save
  end

  def edit
    @comment = Comment.find(params[:id])
    authorize! :edit, @comment
  end

  def update
    @comment = Comment.find(params[:id])
    authorize! :update, @comment
    @comment.update(comment_params)
  end

  def destroy
    @comment = Comment.find(params[:id])
    authorize! :destroy, @comment
    @comment.destroy
  end

  private

  def comment_params
    params.require(:subcategory).permit(:topic_id, :user_id, :content)
  end

end
