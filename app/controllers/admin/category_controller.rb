class Admin::CategoryController < ApplicationController
    def index
      react_props
    end

    def create
      category = PostsCategory.create!(category_params)
  
      if category
        render json: category
      else
        render json: category.errors
      end
    end

    def react_props
      @react_props = {
        categories: PostsCategory.all
      }
    end 

    private 

    def category_params
      params.permit(:name, :image, :description )
    end

end
