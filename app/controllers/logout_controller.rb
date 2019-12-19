class LogoutController < ApplicationController  
  def index
    logout!
  end  
end  