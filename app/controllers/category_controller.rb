class CategoryController < ApplicationController
    def index
      react_props
    end

    def react_props
      @react_props = {
        categories: PostsCategories.all
      }
    end 
end
