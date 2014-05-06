class RolesController < ApplicationController
  layout 'application'
  before_filter :check_administrator_role
 
  def index
    @user = User.find(params[:user_id])
    @all_roles = Role.all()
  end
 
  def update
    @user = User.find(params[:user_id])
    @role = Role.find(params[:id])
    unless @user.has_role?(@role.rolename)
      @user.roles << @role
    end
    redirect_to :action => 'index'
  end
  
  def destroy
    @user = User.find(params[:user_id])
    @role = Role.find(params[:id])
    if @user.has_role?(@role.rolename)
      @user.roles.delete(@role)
    end
    redirect_to :action => 'index'
  end
  
 end

# class RolesController < ApplicationController
#   layout 'application'
#   before_filter :check_administrator_role  
#   
#   def index
#     list
#     render :action => 'list'
#   end
# 
#   # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
#   verify :method => :post, :only => [ :destroy, :create, :update ],
#          :redirect_to => { :action => :list }
# 
#   def list
#     @role_pages, @roles = paginate :roles, :per_page => 10
#   end
# 
#   def show
#     @role = Role.find(params[:id])
#   end
# 
#   def new
#     @role = Role.new
#   end
# 
#   def create
#     @role = Role.new(params[:role])
#     if @role.save
#       flash[:notice] = 'Role was successfully created.'
#       redirect_to :action => 'list'
#     else
#       render :action => 'new'
#     end
#   end
# 
#   def edit
#     @role = Role.find(params[:id])
#   end
# 
#   def update
#     @role = Role.find(params[:id])
#     if @role.update_attributes(params[:role])
#       flash[:notice] = 'Role was successfully updated.'
#       redirect_to :action => 'show', :id => @role
#     else
#       render :action => 'edit'
#     end
#   end
# 
#   def destroy
#     Role.find(params[:id]).destroy
#     redirect_to :action => 'list'
#   end
# end
