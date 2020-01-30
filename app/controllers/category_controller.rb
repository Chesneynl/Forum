class CategoryController < ApplicationController
    def index
      categories = PostsCategory.all

      render json: categories
    end

    def show
      @react_props = {
        posts: Post.where(posts_categories_id: params[:id])
      }
    end

    def react_props
      @react_props = {
        categories: PostsCategory.all
      }
    end 

    private 

    def category
      @category ||= PostsCategory.find(params[:id])
    end

end
