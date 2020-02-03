class StaticController < ApplicationController  
  def index
    react_config_props
  end  
  
  def page_not_found 
    
  end

  def react_config_props
    @react_config_props = {
      path: request.original_fullpath,
      user: current_user,
      userIsAdmin: userIsAdmin?
    }
  end
end