class HomeController < ApplicationController
    def index
      react_props
    end

    def react_props
      @react_props = {
        posts: Post.where.not(active: true).order(created_at: :desc)
      }
    end 
end
