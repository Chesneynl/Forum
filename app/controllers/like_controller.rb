
class LikeController < ApplicationController  

  def index
    likes = UserLikesDislikes.where(user_id: session[:user_id])

    render json: likes
  end

  def like
    like = UserLikesDislikes.create(like_params)

    if like
      render json: {success: like}
    else 
      render json: {success: like.errors}
    end
  end

  def dislike
    like = UserLikesDislikes.first_or_create!(like_params)

    if like
      like.update_all(liked: false, disliked: true)
      render json: like
    else
      render json: like.errors
    end
  end

  private 

  def like_params
    params.permit(:post_id, :liked, :disliked).merge(user_id: current_user.id)
  end

end  