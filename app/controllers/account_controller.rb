class AccountController < ApplicationController  
    def index
      react_props
    end  

    def edit
      react_props
    end  
  
    def react_props
      @react_props = {
          posts: current_user.posts,
          user: current_user
      }
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

  end  