class Api::V1::PostsController < ApplicationController
  before_action :authorize, only: [:update, :create_category]

  def index
    posts = Post.where(active: true)

    render json: posts
  end

  def inactive_pposts
    if userIsAdmin? 
      posts = Post.where(active: false)

      render json: posts
    else 
      render json: 'You dont have permission' 
    end
  end

  def categories 
    categories = PostsCategory.all
    render json: categories
  end

  def posts_by_category
    posts = Post.where(posts_categories_id: params[:id])
    render json: posts
  end

  def create
    post = Post.create!(post_params)

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

  def get_likes
    likes = UserLikesDislikes.where(user_id: session[:user_id])

    render json: likes
  end

  def like_dislike
    existing_like_dislike = UserLikesDislikes.where(like_params.slice(:post_id, :user_id))

    if !existing_like_dislike.exists?
      like_dislike = UserLikesDislikes.create(like_params)
      render json: {success: 'created'}
    else
      like_dislike = existing_like_dislike.update(like_params)
      render json: {success: 'updated'}
    end
  end

  # admin  
  def update 
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

  def post_params
    params.permit(:name, :image, :description, :active, :attachment ).merge(user_id: current_user.id)
  end

  def post
    @post ||= Post.find(params[:id])
  end

  def like_params
    params.permit(:post_id, :liked, :disliked).merge(user_id: current_user.id)
  end

  def category_params
    params.permit(:name, :image, :description )
  end

end
