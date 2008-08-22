class StandardSizeController < ApplicationController

  def add
    @size = StandardSize.new
    @size.standard_product_id = params[:standard_product_id]
  end

  def create
    @size = StandardSize.new(params[:size])
    if @size.save
      flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @size.standard_product_id
    else
      render :action => 'add'
    end
  end

  def edit
    @size = StandardSize.find(params[:id])
  end

  def update
    @size = StandardSize.find(params[:id])
    if @size.update_attributes(params[:size])
      flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @size.standard_product_id
    else
      render :action => 'edit'
    end
  end

  def delete
    @size = StandardSize.find(params[:id])
    standard_product_id = @size.standard_product_id
    @size.destroy
    flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :controller => "serie", :action => 'show', :id => @size.standard_product_id
  end
end
