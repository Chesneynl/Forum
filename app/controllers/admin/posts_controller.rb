class Admin::PostsController < ApplicationController
  before_action :authorize

  def index
    react_props
  end

  def react_props
    @react_props = {
      posts: Post.where(active: nil).order(created_at: :desc),
      userIsAdmin: userIsAdmin?
    }
  end 

  def update 
    post = Post.find_by_id(params[:id])
    post.active = 1
    post.save
  end
end
