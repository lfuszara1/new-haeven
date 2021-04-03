class CategoryController < ApplicationController

  skip_before_action :authenticate_user!, :only => [:index]

  def index
    @categories = Category.all
    authorize! :index, @categories
  end

  def new
    @category = Category.new
    authorize! :new, @category
  end

  def create
    @category = Category.new(category_params)
    authorize! :create, @category
    @category.save
    redirect_to category_index_path
  end

  def edit
    @category = Category.find(params[:id])
    authorize! :edit, @category
  end

  def update
    @category = Category.find(params[:id])
    authorize! :update, @category
    @category.update(category_params)
    redirect_to category_path(@category)
  end

  def destroy
    @category = Category.find(params[:id])
    authorize! :destroy, @category
    @category.destroy
    redirect_to category_index_path
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

end
