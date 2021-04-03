class SubcategoryController < ApplicationController

  skip_before_action :authenticate_user!, :only => [:index]

  def index
    @subcategories = Subcategory.where(category_id: params[:category_id])
    authorize! :index, @subcategories
  end

  def new
    @subcategory = Subcategory.new
    authorize! :new, @subcategory
  end

  def create
    @subcategory = Subcategory.new(subcategory_params)
    authorize! :create, @subcategory,
    @subcategory.save
    redirect_to category_subcategory_index_path(@subcategory)
  end

  def edit
    @subcategory = Subcategory.find(params[:id])
    authorize! :edit, @subcategory
  end

  def update
    @subcategory = Subcategory.find(params[:id])
    authorize! :update, @subcategory
    @subcategory.update(subcategory_params)
    redirect_to category_subcategory_index_path(@subcategory)
  end

  def destroy
    @subcategory = Subcategory.find(params[:id])
    authorize! :destroy, @subcategory
    @subcategory.destroy
    redirect_to category_subcategory_index_path(@subcategory)
  end

  private

  def subcategory_params
    params.require(:subcategory).permit(:category_id, :user_id, :name)
  end

end
