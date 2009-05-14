class CustomerController < ApplicationController
  def index
    list
    render :action => 'list'
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
  verify :method => :post, :only => [ :destroy, :create, :update ],
         :redirect_to => { :action => :list }

  def list
    if (@current_user.has_role?('administrator'))
      @customer_pages, @customers = paginate :customers, :per_page => 10
    else
      @customer_pages, @customers = paginate :customers, :per_page => 10, :conditions => ["user_id = ?", @current_user.id]
    end
  end

  def show
    @customer = Customer.find(params[:id])
    if @customer.user_id != @current_user.id && !@current_user.has_role?('administrator')
      flash[:notice] = "Permission denied"
      redirect_to :action => 'list'
    end
  end

  def new
    @customer = Customer.new
  end

  def create
    @customer = Customer.new(params[:customer])
    if @customer.save
      flash[:notice] = 'Customer was successfully created.'
      redirect_to :action => 'list'
    else
      render :action => 'new'
    end
  end

  def edit
    @customer = Customer.find(params[:id])
  end

  def update
    @customer = Customer.find(params[:id])
    if @customer.update_attributes(params[:customer])
      flash[:notice] = 'Customer was successfully updated.'
      redirect_to :action => 'show', :id => @customer
    else
      render :action => 'edit'
    end
  end

  def destroy
    Customer.find(params[:id]).destroy
    redirect_to :action => 'list'
  end
end
