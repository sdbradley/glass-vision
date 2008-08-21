class StandardSizeController < ApplicationController

  def add
    @standard_product = StandardSize.new
    @standard_product.standard_product_id = params[:standard_product_id]
  end

  def create
    @standard_product = StandardSize.new(params[:sheet])
    if @standard_product.save
      flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @standard_product.standard_product_id
    else
      render :action => 'add'
    end
  end

  def edit
    @standard_product = StandardSize.find(params[:id])
  end

  def update
    @standard_product = StandardSize.find(params[:id])
    if @standard_product.update_attributes(params[:sheet])
      flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @standard_product.standard_product_id
    else
      render :action => 'edit'
    end
  end

  def delete
    product = StandardSize.find(params[:id])
    product.destroy
    flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :controller => "serie", :action => 'show', :id => @standard_product.standard_product_id
  end
end
