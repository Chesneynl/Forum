class Admin::PostsController < ApplicationController
  before_action :authorize

  def index
    react_props
  end

  def react_props
    @react_props = {
      posts: Post.where(active: false).order(created_at: :desc),
      userIsAdmin: userIsAdmin?
    }
  end 

  def update 
    Post.update(params[:id], active: true)
    render json: {succes: true}
  end
end
