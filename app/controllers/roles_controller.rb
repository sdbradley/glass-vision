class RolesController < ApplicationController
  layout 'application'
  before_action :check_administrator_role

  def index
    @user = User.find(params[:user_id])
    @all_roles = Role.all
  end

  def update
    @user = User.find(params[:user_id])
    @role = Role.find(params[:id])
    @user.roles << @role unless @user.has_role?(@role.rolename)
    redirect_to action: 'index'
  end

  def destroy
    @user = User.find(params[:user_id])
    @role = Role.find(params[:id])
    @user.roles.delete(@role) if @user.has_role?(@role.rolename)
    redirect_to action: 'index'
  end

  # def show
  #   @role = Role.find(params[:id])
  # end
end
