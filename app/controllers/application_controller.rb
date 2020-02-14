class ApplicationController < ActionController::Base
  helper_method :authorize
  helper_method :logged_in?
  helper_method :isAdmin?
  helper_method :logged_in_user

  def logged_in_user
    @user = User.find_by(id: session[:user_id])
  end

  def authorize
    !current_user.nil?
  end

  def userIsAdmin? 
    logged_in_user.admin
  end
  
  def logged_in?
    !current_user.nil?
  end

  
end
