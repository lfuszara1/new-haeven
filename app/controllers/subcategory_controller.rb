class SubcategoryController < ApplicationController

  def index
    @subcategories = Subcategory.where(category_id: params[:category_id])
  end

  def new
    @subcategory = Subcategory.new
  end

  def create
    Subcategory.create(subcategory_params)
    redirect_to subcategory_index_path
  end

  def edit
    @subcategory = Subcategory.find(params[:id])
  end

  def update
    @subcategory = Subcategory.find(params[:id])
    @subcategory.update(subcategory_params)
    redirect_to subcategory_path(@subcategory)
  end

  def destroy
    @subcategory = Subcategory.find(params[:id])
    @subcategory.destroy
    redirect_to subcategory_index_path
  end

  private

  def subcategory_params
    params.require(:subcategory).permit(:category_id, :user_id, :name)
  end

end
