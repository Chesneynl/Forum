class Api::V1::PostsController < ApplicationController
  def index
    post = Post.where(active: true)

    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def create
    post = Post.create!(post_params)

    if post
      render json: post
    else
      render json: post.errors
    end
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

  def react_props
    @react_props = {
      posts: Post.where(active: true).order(created_at: :desc)
    }
  end 

  private

  def post_params
    params.permit(:name, :image, :description, :active, :attachment ).merge(user_id: current_user.id)
  end

  def post
    @post ||= Post.find(params[:id])
  end

end
