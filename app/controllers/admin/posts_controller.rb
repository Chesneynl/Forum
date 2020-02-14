class Admin::PostsController < ApplicationController
  before_action :authorize, only: [:update, :create_category]

  def approve_post 
    Post.update(params[:id], active: true)
    render json: {succes: true}
  end

  def create_category
    category = PostsCategory.create!(category_params)

    if category
      render json: category
    else
      render json: category.errors
    end
  end

  private 

  def category_params
    params.permit(:name, :image, :description )
  end
end
