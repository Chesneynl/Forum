class AccountController < ApplicationController  
  skip_before_action :verify_authenticity_token
  
  def index
    react_props
  end  

  def edit
    react_props
  end  

  def current_user
    render json: logged_in_user
  end

  def update
    user = User.new(register_params)
    
    if user.valid? && user.save
      session[:user_id] = user.id
      render json: user
    else
      render json: {errors: user.errors}
    end
  end

  def logout
    reset_session
    render json: {success: true}
  end  

  def login_user
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        render json: {success: true}
    else
        render json: {errors: {doesnt_exists: 'A user with that email and password doesnt exists.'} }
    end
  end

  def register_user
    user = User.new(register_params)
    
    if user.valid? && user.save
      session[:user_id] = user.id
      render json: {success: true}
    else
      render json: {errors: user.errors.to_h}
    end
  end

  private  

  def login_params  
    params.permit(:email, :password)  
  end

  def register_params  
    params.permit(:email, :username, :password)  
  end
end  