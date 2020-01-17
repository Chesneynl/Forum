class LikeController < ApplicationController  
  before_action :authorize
  skip_before_action :verify_authenticity_token

  def get_user_likes
    likes = UserLikesDislikes.where(user_id: session[:user_id])

    render json: like
  end

  def like
    like = UserLikesDislikes.find_or_create_by(like_params)


    format.json { render json: {success: true} }

    # if like
    #   render json: {success: true}
    # else 
    #   render json: {success: false}
    # end
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
    params.permit(:post_id, :liked).merge(user_id: current_user.id)
  end

end  