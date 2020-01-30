class PostController < ApplicationController  
  def index
    react_props
  end  

  def create
    
  end

  def show 

  end

  def react_props
    @react_props = {
      post: Post.find(params[:id])
    }
  end 
end  