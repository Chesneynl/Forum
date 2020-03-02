
require 'pry'
class Api::V1::PostsController < ApplicationController
  before_action :authorize, only: [:update]
  skip_before_action :verify_authenticity_token

  def index
    if params[:type].present? && !params[:categoryid].present?
      case params[:type]
      when 'new'
        posts = Post.where(active: true).sort_by {|p| p.created_at }
      when 'inactive'
        posts = inactive_pposts
      when 'my-posts'
        posts = user_posts
      else
        posts = Post.where(active: true).sort_by {|p| p.created_at }
      end
    elsif params[:type].present? && params[:categoryid].present?
      posts = Post.where(active: true, posts_categories_id: params[:categoryid]).sort_by {|p| p.created_at }
    end
    
    render json: posts
  end

  def inactive_pposts
    if userIsAdmin? 
      Post.where(active: false)
    end
  end

  def user_posts 
    if logged_in?
      Post.where(active: true, user_id: session[:user_id])
    end
  end

  def post_by_id
    render json: Post.find(params[:id])
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


  private

  def post_params
    params.permit(:name, :image, :description, :posts_categories_id, :active, :attachment ).merge(user_id: logged_in_user.id)
  end

  def like_params
    params.permit(:post_id, :liked, :disliked).merge(user_id: logged_in_user.id)
  end

end
