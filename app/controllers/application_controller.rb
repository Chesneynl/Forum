class ApplicationController < ActionController::Base
    helper_method :current_user
    helper_method :authorize
    helper_method :logged_in?
    helper_method :react_config_props
    helper_method :isAdmin?
    
    def current_user
      @user = User.find_by(id: session[:user_id])
    end

    def authorize
      if !userIsAdmin? 
        redirect_to '/'
      end
    end
    
    def logged_in?
      !current_user.nil?
    end

    def userIsAdmin?
      current_user&.roles_id == 22
    end

    def logout! 
      reset_session
      @user = nil
    end

    def react_config_props
      @react_config_props = {
        path: request.original_fullpath,
        user: current_user,
        userIsAdmin: userIsAdmin?
      }
    end
end
