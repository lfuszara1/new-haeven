class CommentController < ApplicationController

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
    params.require(:comment).permit(:topic_id, :user_id, :content)
  end

end
