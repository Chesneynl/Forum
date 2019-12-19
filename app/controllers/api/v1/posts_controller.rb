class Api::V1::PostsController < ApplicationController
  def index
    post = Post.all.order(created_at: :desc)
    render json: post
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
