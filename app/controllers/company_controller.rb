class CompanyController < ApplicationController
  def list
    @companies = Company.find(:all, :order => 'name')
  end

  def show
    @company = Company.find(params[:id])
  end

  def add
    @company = Company.new
  end

  def create
    @company = Company.new(params[:company])
    if @company.save
      flash[:notice] = trn_geth('LABEL_COMPANY') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :action => 'show', :id => @company
    else
      render :action => 'add'
    end
  end

  def edit
    @company = Company.find(params[:id])
  end

  def update
    @company = Company.find(params[:id])
    if @company.update_attributes(params[:company])
      flash[:notice] = trn_geth('LABEL_COMPANY') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'show', :id => @company
    else
      render :action => 'edit'
    end
  end

  def delete
    Company.find(params[:id]).destroy
    flash[:notice] = trn_geth('LABEL_COMPANY') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :action => 'list'
  end
end
