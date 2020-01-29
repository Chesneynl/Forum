
class LikeController < ApplicationController  
  skip_before_action :verify_authenticity_token

  def index
    likes = UserLikesDislikes.where(user_id: session[:user_id])

    render json: likes
  end

  def like_dislike
    existing_like_dislike = UserLikesDislikes.where(like_params.slice(:post_id, :user_id)).exists?

    if !existing_like_dislike
      like_dislike = UserLikesDislikes.create(like_params)
      render json: {success: 'created'}
    else
      like_dislike = UserLikesDislikes.update(like_params)
      render json: {success: 'updated'}
    end
  end

  private 

  def like_params
    params.permit(:post_id, :liked, :disliked).merge(user_id: current_user.id)
  end

end  