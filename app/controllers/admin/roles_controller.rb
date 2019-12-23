class Admin::RolesController < ApplicationController
    before_action :authorize

    def index
      react_props
    end
  
    def react_props
      @react_props = {
        roles: Role.all.order(created_at: :desc)
      }
    end 
  
    def create
      role = Role.new(role_params)
  
      if role.valid? && role.save
        render json: {role: role, success: true, action: 'create'}
      else
        render json:  {errors: role.errors, success: false, action: 'create'}
      end
    end
  
    def destroy
      role&.destroy
      render json: { message: 'Role deleted!', success: true, action: 'destroy' }
    end
  
    private
  
    def role_params
      params.permit(:name)
    end

    def role
      @role ||= Role.find(params[:id])
    end
  
  end
  