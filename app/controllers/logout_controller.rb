class LogoutController < ApplicationController  
  def index
    logout!
    redirect_to '/'
  end  
end  