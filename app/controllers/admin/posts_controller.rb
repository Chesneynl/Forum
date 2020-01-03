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

  def create
    post_params[:user_id] = current_user.id
    post = Post.create!(post_params)

    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def update 
    post = Post.find_by_id(params[:id])
    post.active = 1
    post.save
  end

  def show
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def destroy
    post&.destroy
    render json: { message: 'Post deleted!' }
  end

  private

  def post_params
    params.permit(:name, :image, :description ).merge(user_id: current_user.id)
  end

  def post
    @post ||= Post.find(params[:id])
  end

end
