class ProfileController < ApplicationController  
  def index
    render json: {user: @user, session: session[:user_id] }
  end  
end  