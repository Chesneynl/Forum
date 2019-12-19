class RegisterController < ApplicationController  
  def create
    user = User.new(register_params)
    
    if user.valid? && user.save
      session[:user_id] = user.id
      render json: user
    else
      render json: {errors: user.errors}
    end
  end

  private  
  def register_params  
    params.permit(:email, :username, :password)  
  end
end  