class SubcategoryController < ApplicationController

  skip_before_action :authenticate_user!, :only => [:index]

  def index
    @subcategories = Subcategory.order('name DESC').where(category_id: params[:category_id])
    @users = []
    @subcategories.each do |subcategory|
      @users << User.find(subcategory.user_id)
    end
    @subcategories_with_users = @subcategories.zip(@users)
    if can? :destroy, Subcategory
      @can_destroy = true
    else
      @can_destroy = false
    end
    if can? :create, Subcategory
      @can_create = true
    else
      @can_create = false
    end
    if can? :update, Category
      @can_update = true
    else
      @can_update = false
    end
    authorize! :index, @subcategories
  end

  def new
    @users = User.all
    @subcategory = Subcategory.new
    authorize! :new, @subcategory
  end

  def create
    @subcategory = Subcategory.new(subcategory_params)
    authorize! :create, @subcategory
    @subcategory.save
  end

  def edit
    @users = User.all
    @subcategory = Subcategory.find(params[:id])
    authorize! :edit, @subcategory
  end

  def update
    @subcategory = Subcategory.find(params[:id])
    authorize! :update, @subcategory
    @subcategory.update(subcategory_params)
  end

  def destroy
    @subcategory = Subcategory.find(destroy_subcategory_params[:id])
    authorize! :destroy, @subcategory
    @subcategory.destroy
  end

  private

  def subcategory_params
    params.require(:subcategory).permit(:category_id, :user_id, :name)
  end

  def destroy_subcategory_params
    params.require(:subcategory).permit(:id)
  end

end
