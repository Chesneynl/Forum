class LoginController < ApplicationController  
  def index
    
  end

  def login 
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        render json: {success: true}
    else
        render json: {errors: {doesnt_exists: 'A user with that email and password doesnt exists.'} }
    end
  end

  private  
  def login_params  
    params.permit(:email, :password)  
  end
end  