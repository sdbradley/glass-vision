class QuotationController < ApplicationController
#  auto_complete_for :quotation, :customer_name

  def list
    if @current_user.has_role?('administrator')
      @quotations = Quotation.find(:all, :order => 'updated_at DESC, id DESC')
    else
      @quotations = Quotation.find(:all, :order => "updated_at DESC, id DESC", :conditions => ["user_id = ?", @current_user.id])
    end
  end

  def show
    @quotation = Quotation.find(params[:id])
    if @quotation.user_id != @current_user.id && !@current_user.has_role?('administrator')
      flash[:notice] = "Permission denied"
      redirect_to :action => 'list'
    end
  end

  def add
    @quotation = Quotation.new
    @quotation.discount = @current_user.discount
  end

  def create
    @quotation = Quotation.new(params[:quotation])
    @quotation.user_id = @current_user.id
    @quotation.discount = @current_user.discount
    customer_msg = ""
    if Customer.create_from_quotation_if_new(@quotation)
      customer_msg = trn_geth('LABEL_CUSTOMER') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
    end
    if @quotation.save
      customer_msg += "<br />" unless customer_msg.blank?
      customer_msg +=  trn_geth('LABEL_QUOTATION') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      flash[:notice] = customer_msg
      redirect_to :action => 'show', :id => @quotation
    else
      render :action => 'add'
    end
  end

  def edit
    @quotation = Quotation.find(params[:id])
  end

  def update
    @quotation = Quotation.find(params[:id])
    if @quotation.update_attributes(params[:quotation])
      flash[:notice] = trn_geth('LABEL_QUOTATION') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'show', :id => @quotation
    else
      render :action => 'edit'
    end
  end

  def delete
    Quotation.find(params[:id]).destroy
    flash[:notice] = trn_geth('LABEL_QUOTATION') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :action => 'list'
  end

  def print
    @quotation = Quotation.find(params[:id])
    @company = Company.find(params[:company_id])
    render :layout => 'printer'
  end
end
