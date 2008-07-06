class QuotationController < ApplicationController
  def list
    @quotations = Quotation.find(:all, :order => "id")
  end

  def show
    @quotation = Quotation.find(params[:id])
  end

  def add
    @quotation = Quotation.new
  end

  def create
    @quotation = Quotation.new(params[:quotation])
    if @quotation.save
      flash[:notice] = trn_geth('LABEL_QUOTATION') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
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
