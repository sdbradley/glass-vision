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
      @customers = Customer.paginate :page => params[:page], :per_page => 25
    else
      @customers = Customer.paginate :page => params[:page], :per_page => 25,
                                             :conditions => ["user_id = ?", @current_user.id]
    end
  end

  def autocomplete_for_name
    if request.xml_http_request?
      if (@current_user.has_role?('administrator'))
          @customers = Customer.find(:all, :conditions => ['name like ?', "%#{params[:quotation][:customer_name]}%"])
        else
          @customers = Customer.find(:all, :conditions => ['name like ? and user_id = ?', "%#{params[:quotation][:customer_name]}%", @current_user.id])
      end
      render :partial => "list", :layout => false
    else
      render :nothing and return
    end
  end

  def show
    @customer = Customer.find(params[:id])
    if @customer.user_id != @current_user.id && !@current_user.has_role?('administrator')
      flash[:notice] = "Permission denied"
      redirect_to :action => 'list'
    end
  end

  def show_by_name
    if request.xml_http_request?
      @customer = Customer.find(:first, :conditions => ['name = ?', "#{params[:customer_name]}"])
      render :partial => "show_by_name", :layout => false unless @customer.nil?
    else
      render :nothing and return
    end
  end

  def new
    @customer = Customer.new
  end

  def create
    @customer = Customer.new(params[:customer])
    if @customer.save
      flash[:notice] = trn_geth('LABEL_CUSTOMER') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
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
      flash[:notice] = trn_geth('LABEL_CUSTOMER') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'show', :id => @customer
    else
      render :action => 'edit'
    end
  end

  def destroy
    Customer.find(params[:id]).destroy
    flash[:notice] = trn_geth('LABEL_CUSTOMER') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :action => 'list'
  end
end
